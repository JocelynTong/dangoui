import type { CodeGenerator, ComponentNode } from './types'
import type { ParsedStyles, ParsedPadding, ParsedBorderRadius } from './style-parser'
import { parseStyles } from './style-parser'

export interface FlutterGeneratorOptions {
  /** 当前项目里找到的参考 .md 文件相对路径（CLAUDE.md / .claude/figma-context*.md 等） */
  projectReferenceFiles?: string[]
}

export class FlutterGenerator implements CodeGenerator {
  private readonly options: FlutterGeneratorOptions

  constructor(options: FlutterGeneratorOptions = {}) {
    this.options = options
  }

  generate(
    componentTree: ComponentNode,
    styles: Record<string, string>,
    tokens?: Record<string, { kind: string; value: string | Record<string, string> }>
  ): string {
    const docLinks = new Set<string>()
    this.collectDocLinks(componentTree, docLinks)
    const { imports, unknownDocs } = this.inferImports(docLinks)
    const unmappedTags = new Set<string>()
    this.collectUnmappedInstanceTags(componentTree, unmappedTags)

    const header: string[] = ['// Figma skeleton']
    if (imports.length > 0) {
      header.push('', ...imports)
    }
    if (unknownDocs.length > 0) {
      header.push('', '// 以下组件未在公共库 kuril_components，需手动确认 import 或查文档：')
      for (const d of unknownDocs) header.push(`//   ${d}`)
    }
    if (unmappedTags.size > 0) {
      header.push(
        '',
        '// ─── 未映射组件（annotation_config 未登记） ───',
        '// 下列 tag 是从 Figma 节点名降级得来，不保证项目里存在对应 Dart 类：',
      )
      for (const tag of [...unmappedTags].sort()) header.push(`//   ${tag}`)
      const refs = this.options.projectReferenceFiles ?? []
      if (refs.length > 0) {
        header.push('// IDE AI 翻译时请先 Read 项目里的参考文档确认命名/用法：')
        for (const r of refs) header.push(`//   ${r}`)
      } else {
        header.push('// 未在项目根扫到 CLAUDE.md / AGENTS.md，请补齐约定文档或手动确认组件命名。')
      }
      header.push('// 行内出现 "⚠ 未映射" 的 INSTANCE 即属此列。')
    }
    if (docLinks.size > 0) {
      header.push(
        '',
        '// ─── 翻译指南 ───',
        '// 骨架中的 EchoXxx()/KurilXxx() 是空构造占位，IDE AI 翻译时请按以下步骤补齐：',
        '//   1. Read 每个 INSTANCE 上方注释里的 "doc: <path>" 指向的源文件，拿到构造函数签名',
        '//   2. 按 {Key: Value} 变体注释映射构造参数（典型：Type: Input → type: FormItemType.input；',
        '//      Size: Mini(24) → size: ButtonSize.mini；Disable: False 可省略）',
        '//   3. Figma 里的文字节点（Text(...)）通常对应组件的 text/label/title 等字符串参数',
        '//   4. 优先复用项目已有的同类封装；空构造严禁直接保留',
      )
    }

    const widgetCode = this.generateWidget(componentTree, 0)
    return `${header.join('\n')}\n${widgetCode}`
  }

  private collectUnmappedInstanceTags(node: ComponentNode, out: Set<string>): void {
    if (node.isUnmappedInstance && node.tag) out.add(node.tag)
    if (node.children) {
      for (const c of node.children) this.collectUnmappedInstanceTags(c, out)
    }
  }

  private collectDocLinks(node: ComponentNode, out: Set<string>): void {
    if (node.componentDocLink) out.add(node.componentDocLink)
    if (node.children) {
      for (const c of node.children) this.collectDocLinks(c, out)
    }
  }

  /**
   * 按 docLink 推断 Dart package import。
   * - kuril_components 公共库（包路径含 "kuril_components/"）→ 聚合为一条 import
   * - 其他（kuril-flutter 应用内、飞书 wiki 等）无法推断 → 以注释保留原链接
   */
  private inferImports(docLinks: Set<string>): { imports: string[]; unknownDocs: string[] } {
    const imports = new Set<string>()
    const unknownDocs: string[] = []
    for (const link of docLinks) {
      if (link.includes('kuril_components/')) {
        imports.add(`import 'package:kuril_components/kuril_components.dart';`)
      } else {
        unknownDocs.push(link)
      }
    }
    return { imports: [...imports].sort(), unknownDocs: unknownDocs.sort() }
  }

  private generateWidget(node: ComponentNode, depth: number, parentScrollAxis?: 'horizontal' | 'vertical'): string {
    const indent = '  '.repeat(depth)
    // 优先使用 tree-builder 直接从 Figma 节点提取的结构化数据，
    // 降级到从 CSS className/style 重解析（兼容独立使用 Generator 的场景）
    const parsed = node.parsedStyles ?? parseStyles(node)

    // 生成内部 Widget
    const innerWidget = this.generateWidgetInner(node, parsed, indent, depth, parentScrollAxis)

    // isExpanded → 包裹 Expanded（注释抬到外层）
    if (node.isExpanded) {
      const { leading, body } = this.peelLeadingComments(innerWidget)
      return `${leading}${indent}Expanded(\n${indent}  child: ${body.trimStart()},\n${indent})`
    }

    return innerWidget
  }

  /** 剥离代码块开头的连续 `//` 行注释，便于外层 wrapper（Expanded/Positioned/Container）把注释抬到包装前 */
  private peelLeadingComments(code: string): { leading: string; body: string } {
    const lines = code.split('\n')
    const leading: string[] = []
    let i = 0
    while (i < lines.length && /^\s*\/\//.test(lines[i])) {
      leading.push(lines[i])
      i++
    }
    if (leading.length === 0) return { leading: '', body: code }
    return {
      leading: leading.join('\n') + '\n',
      body: lines.slice(i).join('\n')
    }
  }

  private generateWidgetInner(node: ComponentNode, parsed: ParsedStyles, indent: string, depth: number, parentScrollAxis?: 'horizontal' | 'vertical'): string {
    // 语义名注释前缀（未折叠的 INSTANCE/COMPONENT）
    const semanticPrefix = node.semanticName && node.children && node.children.length > 0
      ? `${indent}// ${node.semanticName}\n`
      : ''

    // TEXT 节点 → Text()
    if (node.text !== undefined) {
      return this.generateText(node, parsed, indent)
    }

    // INSTANCE 节点（无子节点）→ 组件名()
    if (node.componentId && (!node.children || node.children.length === 0)) {
      return this.generateInstance(node, parsed, indent)
    }

    // 无子节点的空容器
    if (!node.children || node.children.length === 0) {
      // 矢量图标容器 → Icon widget
      if (node.isVectorIcon && node.iconName) {
        const size = parsed.width ?? parsed.height ?? 16
        // iconName: kebab-case → camelCase
        const iconNameCamel = node.iconName.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        return `${indent}Icon(IconName.${iconNameCamel}, size: ${size})`
      }
      return this.generateLeafContainer(node, parsed, indent)
    }

    // 检查是否有 absolute 定位的子节点 → Stack
    const hasAbsoluteChildren = node.children.some(child => {
      const childParsed = parseStyles(child)
      return childParsed.position === 'absolute'
    })

    if (hasAbsoluteChildren) {
      return semanticPrefix + this.generateStack(node, parsed, indent, depth, parentScrollAxis)
    }

    // 滚动容器 → SingleChildScrollView / ListView / GridView / PageView
    if (node.isScrollContainer && parsed.layout && node.children.length >= 2) {
      return semanticPrefix + this.generateScrollContainer(node, parsed, indent, depth, parentScrollAxis)
    }

    // flex 布局 → Row/Column
    if (parsed.layout) {
      return semanticPrefix + this.generateFlex(node, parsed, indent, depth, parentScrollAxis)
    }

    // 默认：有装饰属性用 Container 包裹，否则直接输出子节点
    if (this.hasDecoration(parsed)) {
      return semanticPrefix + this.generateContainer(node, parsed, indent, depth, parentScrollAxis)
    }

    // 单子节点直接返回
    if (node.children.length === 1) {
      return semanticPrefix + this.generateWidget(node.children[0], depth, parentScrollAxis)
    }

    // 多子节点无布局，默认 Column
    return semanticPrefix + this.generateColumnDefault(node, parsed, indent, depth, parentScrollAxis)
  }

  // ─── Text ────────────────────────────────────────────────────────────────

  private generateText(node: ComponentNode, parsed: ParsedStyles, indent: string): string {
    const textContent = node.i18nKey
      ? `KurilLocalizationsManager.current(context).${this.toEchoI18nIdent(node.i18nKey)}`
      : `'${this.escapeString(node.text ?? '')}'`

    const textStyle = this.buildTextStyle(parsed)
    if (textStyle) {
      return `${indent}Text(${textContent},\n${indent}  style: ${textStyle},\n${indent})`
    }
    return `${indent}Text(${textContent})`
  }

  /**
   * echo_theme ARB key 命名规则：
   * - 按 '.' 切段，每段剥离非字母数字（空格/标点/括号等）
   * - 首段首字母小写，其余段保持原样
   * - 拼接
   * 示例："LoginIn.Apple signin" → "loginInApplesignin"
   *       "LoginIn.Can't use the phone number?" → "loginInCantusethephonenumber"
   */
  private toEchoI18nIdent(key: string): string {
    const parts = key.split('.').map(p => p.replace(/[^a-zA-Z0-9]/g, ''))
    if (parts.length === 0 || !parts[0]) return key
    parts[0] = parts[0][0].toLowerCase() + parts[0].slice(1)
    return parts.join('')
  }

  private buildTextStyle(parsed: ParsedStyles): string | null {
    const t = parsed.text
    if (!t) return null

    const props: string[] = []
    if (t.color) props.push(`color: ${this.convertColor(t.color)}`)
    if (t.fontSize) props.push(`fontSize: ${t.fontSize}`)
    if (t.fontWeight) props.push(`fontWeight: FontWeight.w${t.fontWeight}`)
    if (t.lineHeight && t.fontSize) {
      const heightRatio = (t.lineHeight / t.fontSize).toFixed(2)
      props.push(`height: ${heightRatio}`)
    }
    if (t.letterSpacing && t.letterSpacing !== 0) props.push(`letterSpacing: ${t.letterSpacing}`)
    if (t.fontFamily) props.push(`fontFamily: '${t.fontFamily}'`)
    if (t.fontStyle === 'italic') props.push(`fontStyle: FontStyle.italic`)
    if (t.textDecoration === 'underline') props.push(`decoration: TextDecoration.underline`)
    if (t.textDecoration === 'line-through') props.push(`decoration: TextDecoration.lineThrough`)

    if (props.length === 0) return null
    return `TextStyle(${props.join(', ')})`
  }

  // ─── INSTANCE ────────────────────────────────────────────────────────────

  private generateInstance(node: ComponentNode, parsed: ParsedStyles, indent: string): string {
    const sizeProps = this.buildSizeProps(parsed)
    const propsComment = this.buildComponentPropsComment(node)
    const textsComment = this.buildInstanceTextsComment(node)

    // 注释放到调用上方，避免作为行尾注释吞掉 children 列表的逗号分隔符
    const parts: string[] = []
    if (node.isUnmappedInstance) parts.push('⚠ 未映射')
    if (node.semanticName) parts.push(node.semanticName)
    if (node.componentId) parts.push(`INSTANCE figma-node: ${node.componentId}`)
    if (propsComment) parts.push(propsComment)
    if (textsComment) parts.push(textsComment)
    if (node.componentDocLink) parts.push(`doc: ${node.componentDocLink}`)
    const commentLine = parts.length > 0 ? `${indent}// ${parts.join('  |  ')}\n` : ''

    if (sizeProps.length > 0) {
      return `${commentLine}${indent}SizedBox(${sizeProps.join(', ')},\n${indent}  child: ${node.tag}(),\n${indent})`
    }
    return `${commentLine}${indent}${node.tag}()`
  }

  /**
   * 把折叠前抓到的 TEXT 覆盖渲染成单行注释。
   * 与 componentProps.TEXT 里同值的文本去重，避免重复。
   * 例：texts: "实际标题" / "实际内容"
   */
  private buildInstanceTextsComment(node: ComponentNode): string {
    if (!node.instanceTextOverrides || node.instanceTextOverrides.length === 0) return ''
    const propTextValues = new Set<string>()
    if (node.componentProps) {
      for (const prop of Object.values(node.componentProps)) {
        if (prop.type === 'TEXT' && typeof prop.value === 'string') {
          propTextValues.add(prop.value)
        }
      }
    }
    const seen = new Set<string>()
    const items: string[] = []
    for (const o of node.instanceTextOverrides) {
      if (propTextValues.has(o.text)) continue
      if (seen.has(o.text)) continue
      seen.add(o.text)
      items.push(`"${o.text.replace(/"/g, '\\"')}"`)
    }
    if (items.length === 0) return ''
    return `texts: ${items.join(' / ')}`
  }

  /** 将 componentProps 格式化为注释，如 // {text: "商品规格", color: Primary, type: Text} */
  private buildComponentPropsComment(node: ComponentNode): string {
    if (!node.componentProps || Object.keys(node.componentProps).length === 0) return ''

    const parts: string[] = []
    for (const [key, prop] of Object.entries(node.componentProps)) {
      if (prop.type === 'TEXT') {
        parts.push(`${key}: "${prop.value}"`)
      } else if (prop.type === 'VARIANT') {
        parts.push(`${key}: ${prop.value}`)
      } else if (prop.type === 'BOOLEAN') {
        parts.push(key)
      }
    }

    return parts.length > 0 ? `{${parts.join(', ')}}` : ''
  }

  // ─── Leaf Container ──────────────────────────────────────────────────────

  private generateLeafContainer(node: ComponentNode, parsed: ParsedStyles, indent: string): string {
    const props = this.buildContainerProps(parsed, indent)
    if (props.length === 0) {
      const sizeProps = this.buildSizeProps(parsed)
      if (sizeProps.length > 0) {
        return `${indent}SizedBox(${sizeProps.join(', ')})`
      }
      return `${indent}SizedBox.shrink()`
    }
    return `${indent}Container(\n${props.join(',\n')},\n${indent})`
  }

  // ─── Stack (absolute 定位) ───────────────────────────────────────────────

  private generateStack(node: ComponentNode, parsed: ParsedStyles, indent: string, depth: number, parentScrollAxis?: 'horizontal' | 'vertical'): string {
    const children = (node.children ?? []).map(child => {
      const childParsed = parseStyles(child)
      if (childParsed.position === 'absolute' && childParsed.positionOffsets) {
        const posProps = this.buildPositionedProps(childParsed)
        const childWidget = this.generateWidget(child, depth + 2, parentScrollAxis)
        const { leading, body } = this.peelLeadingComments(childWidget)
        return `${leading}${indent}  Positioned(\n${posProps.map(p => `${indent}    ${p}`).join(',\n')},\n${indent}    child: ${body.trimStart()},\n${indent}  })`
      }
      return this.generateWidget(child, depth + 1, parentScrollAxis)
    })

    const containerProps = this.buildContainerProps(parsed, indent)
    const stackCode = `${indent}Stack(\n${indent}  children: [\n${children.join(',\n')},\n${indent}  ],\n${indent})`

    if (containerProps.length > 0) {
      return `${indent}Container(\n${containerProps.join(',\n')},\n${indent}  child: ${stackCode.trimStart()},\n${indent})`
    }
    return stackCode
  }

  // ─── Flex (Row / Column) ─────────────────────────────────────────────────

  private generateFlex(node: ComponentNode, parsed: ParsedStyles, indent: string, depth: number, parentScrollAxis?: 'horizontal' | 'vertical'): string {
    const layout = parsed.layout!
    const widgetName = layout.direction === 'column' ? 'Column' : 'Row'
    const flexProps: string[] = []

    if (layout.gap) flexProps.push(`spacing: ${layout.gap}`)
    if (layout.justify && layout.justify !== 'start') {
      flexProps.push(`mainAxisAlignment: ${this.convertMainAxisAlignment(layout.justify)}`)
    }
    if (layout.align && layout.align !== 'start') {
      flexProps.push(`crossAxisAlignment: ${this.convertCrossAxisAlignment(layout.align)}`)
    }

    const children = (node.children ?? []).map(child => this.generateWidget(child, depth + 2, parentScrollAxis))
    const childrenCode = children.length > 0
      ? `\n${indent}  children: [\n${children.join(',\n')},\n${indent}  ],`
      : ''

    const flexPropsStr = flexProps.length > 0
      ? `\n${flexProps.map(p => `${indent}  ${p}`).join(',\n')},`
      : ''

    const flexCode = `${widgetName}(${flexPropsStr}${childrenCode}\n${indent})`

    // 需要 Container 包裹（有装饰/尺寸/padding）
    if (this.hasDecoration(parsed) || this.hasSizing(parsed)) {
      const containerProps = this.buildContainerProps(parsed, indent)
      return `${indent}Container(\n${containerProps.join(',\n')},\n${indent}  child: ${flexCode},\n${indent})`
    }

    // 只有 padding，用 Padding 包裹
    if (parsed.padding && this.hasPadding(parsed.padding)) {
      return `${indent}Padding(\n${indent}  padding: ${this.convertEdgeInsets(parsed.padding)},\n${indent}  child: ${flexCode},\n${indent})`
    }

    return `${indent}${flexCode}`
  }

  // ─── Container ───────────────────────────────────────────────────────────

  private generateContainer(node: ComponentNode, parsed: ParsedStyles, indent: string, depth: number, parentScrollAxis?: 'horizontal' | 'vertical'): string {
    const containerProps = this.buildContainerProps(parsed, indent)
    const children = (node.children ?? []).map(child => this.generateWidget(child, depth + 2, parentScrollAxis))

    if (children.length === 1) {
      const { leading, body } = this.peelLeadingComments(children[0])
      return `${leading}${indent}Container(\n${containerProps.join(',\n')},\n${indent}  child: ${body.trimStart()},\n${indent})`
    }

    // 多子节点用 Column 包裹
    const columnCode = `Column(\n${indent}    children: [\n${children.join(',\n')},\n${indent}    ],\n${indent}  )`
    return `${indent}Container(\n${containerProps.join(',\n')},\n${indent}  child: ${columnCode},\n${indent})`
  }

  private generateColumnDefault(node: ComponentNode, parsed: ParsedStyles, indent: string, depth: number, parentScrollAxis?: 'horizontal' | 'vertical'): string {
    const children = (node.children ?? []).map(child => this.generateWidget(child, depth + 2, parentScrollAxis))
    return `${indent}Column(\n${indent}  children: [\n${children.join(',\n')},\n${indent}  ],\n${indent})`
  }

  // ─── 属性构建工具 ────────────────────────────────────────────────────────

  private buildContainerProps(parsed: ParsedStyles, indent: string): string[] {
    const props: string[] = []

    if (parsed.width !== undefined && typeof parsed.width === 'number') {
      props.push(`${indent}  width: ${parsed.width}`)
    }
    if (parsed.height !== undefined && typeof parsed.height === 'number') {
      props.push(`${indent}  height: ${parsed.height}`)
    }

    if (parsed.padding && this.hasPadding(parsed.padding)) {
      props.push(`${indent}  padding: ${this.convertEdgeInsets(parsed.padding)}`)
    }

    // 有 borderRadius 或 border 时用 decoration
    if (parsed.borderRadius || parsed.border) {
      const decoProps: string[] = []
      if (parsed.backgroundColor) {
        decoProps.push(`color: ${this.convertColor(parsed.backgroundColor)}`)
      }
      if (parsed.borderRadius) {
        decoProps.push(`borderRadius: ${this.convertBorderRadius(parsed.borderRadius)}`)
      }
      if (parsed.border) {
        decoProps.push(`border: Border.all(width: ${parsed.border.width}, color: ${this.convertColor(parsed.border.color)})`)
      }
      props.push(`${indent}  decoration: BoxDecoration(${decoProps.join(', ')})`)
    } else if (parsed.backgroundColor) {
      props.push(`${indent}  color: ${this.convertColor(parsed.backgroundColor)}`)
    }

    return props
  }

  private buildSizeProps(parsed: ParsedStyles): string[] {
    const props: string[] = []
    if (parsed.width !== undefined && typeof parsed.width === 'number') props.push(`width: ${parsed.width}`)
    if (parsed.height !== undefined && typeof parsed.height === 'number') props.push(`height: ${parsed.height}`)
    return props
  }

  private buildPositionedProps(parsed: ParsedStyles): string[] {
    const props: string[] = []
    const offsets = parsed.positionOffsets
    if (offsets?.top) props.push(`top: ${parseInt(offsets.top, 10)}`)
    if (offsets?.right) props.push(`right: ${parseInt(offsets.right, 10)}`)
    if (offsets?.bottom) props.push(`bottom: ${parseInt(offsets.bottom, 10)}`)
    if (offsets?.left) props.push(`left: ${parseInt(offsets.left, 10)}`)
    return props
  }

  // ─── 类型转换工具 ────────────────────────────────────────────────────────

  private convertColor(color: string): string {
    // rgba(r, g, b, a) 或 rgba(r,g,b,a)
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
    if (rgbaMatch) {
      const r = parseInt(rgbaMatch[1], 10)
      const g = parseInt(rgbaMatch[2], 10)
      const b = parseInt(rgbaMatch[3], 10)
      const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1
      const alpha = Math.round(a * 255)
      return `Color(0x${alpha.toString(16).padStart(2, '0').toUpperCase()}${r.toString(16).padStart(2, '0').toUpperCase()}${g.toString(16).padStart(2, '0').toUpperCase()}${b.toString(16).padStart(2, '0').toUpperCase()})`
    }

    // #hex
    const hexMatch = color.match(/^#([0-9a-fA-F]+)$/)
    if (hexMatch) {
      let hex = hexMatch[1]
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      }
      if (hex.length === 6) {
        return `Color(0xFF${hex.toUpperCase()})`
      }
      if (hex.length === 8) {
        return `Color(0x${hex.toUpperCase()})`
      }
    }

    // var(--name, fallback) → 提取 fallback
    const varMatch = color.match(/var\([^,]+,\s*(.+)\)/)
    if (varMatch) {
      return this.convertColor(varMatch[1].trim())
    }

    // linear-gradient → 保留注释
    if (color.includes('gradient') || color.includes('linear-gradient')) {
      return `Color(0x00000000) /* gradient: ${color} */`
    }

    // 无法解析，直接注释
    return `Color(0xFF000000) /* ${color} */`
  }

  private convertEdgeInsets(padding: ParsedPadding): string {
    const { top, right, bottom, left } = padding
    if (top === right && right === bottom && bottom === left) {
      return `EdgeInsets.all(${top})`
    }
    if (top === bottom && left === right) {
      return `EdgeInsets.symmetric(horizontal: ${left}, vertical: ${top})`
    }
    return `EdgeInsets.fromLTRB(${left}, ${top}, ${right}, ${bottom})`
  }

  private convertBorderRadius(br: ParsedBorderRadius): string {
    const { topLeft, topRight, bottomRight, bottomLeft } = br
    if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
      return `BorderRadius.circular(${topLeft})`
    }
    const parts: string[] = []
    if (topLeft > 0) parts.push(`topLeft: Radius.circular(${topLeft})`)
    if (topRight > 0) parts.push(`topRight: Radius.circular(${topRight})`)
    if (bottomRight > 0) parts.push(`bottomRight: Radius.circular(${bottomRight})`)
    if (bottomLeft > 0) parts.push(`bottomLeft: Radius.circular(${bottomLeft})`)
    return `BorderRadius.only(${parts.join(', ')})`
  }

  private convertMainAxisAlignment(justify: string): string {
    const map: Record<string, string> = {
      'start': 'MainAxisAlignment.start',
      'center': 'MainAxisAlignment.center',
      'end': 'MainAxisAlignment.end',
      'space-between': 'MainAxisAlignment.spaceBetween',
    }
    return map[justify] ?? 'MainAxisAlignment.start'
  }

  private convertCrossAxisAlignment(align: string): string {
    const map: Record<string, string> = {
      'start': 'CrossAxisAlignment.start',
      'center': 'CrossAxisAlignment.center',
      'end': 'CrossAxisAlignment.end',
      'baseline': 'CrossAxisAlignment.baseline',
      'stretch': 'CrossAxisAlignment.stretch',
    }
    return map[align] ?? 'CrossAxisAlignment.start'
  }

  // ─── 判断工具 ────────────────────────────────────────────────────────────

  private hasDecoration(parsed: ParsedStyles): boolean {
    return !!(parsed.backgroundColor || parsed.borderRadius || parsed.border)
  }

  private hasSizing(parsed: ParsedStyles): boolean {
    return parsed.width !== undefined || parsed.height !== undefined
  }

  private hasPadding(padding: ParsedPadding): boolean {
    return padding.top > 0 || padding.right > 0 || padding.bottom > 0 || padding.left > 0
  }

  private isUniformChildren(children: ComponentNode[]): boolean {
    if (children.length < 2) return true
    const first = children[0]
    if (children.every(c => c.tag === first.tag)) return true
    const firstW = first.parsedStyles?.width
    if (typeof firstW !== 'number') return false
    return children.every(c => {
      const w = c.parsedStyles?.width
      return typeof w === 'number' && Math.abs(w - firstW) / firstW <= 0.1
    })
  }

  // ─── Scroll Container ───────────────────────────────────────────────────

  private generateScrollContainer(
    node: ComponentNode,
    parsed: ParsedStyles,
    indent: string,
    depth: number,
    parentScrollAxis?: 'horizontal' | 'vertical'
  ): string {
    const axis = node.scrollAxis ?? 'horizontal'
    const axisDart = axis === 'horizontal' ? 'Axis.horizontal' : 'Axis.vertical'
    const nestedSameAxis = parentScrollAxis === axis
    const children = node.children ?? []
    const gap = parsed.layout?.gap ?? 0
    const kind = this.pickScrollWidget(node, children, parsed)
    // 横向 ListView/GridView/PageView 必须有限高度
    const containerHeight = typeof parsed.height === 'number'
      ? parsed.height
      : children.reduce((m, c) => {
          const h = c.parsedStyles?.height
          return typeof h === 'number' && h > m ? h : m
        }, 0)

    const childWidgets = children.map(c => this.generateWidget(c, depth + 2, axis))

    if (kind === 'scrollRow') {
      const rowProps: string[] = []
      if (gap) rowProps.push(`${indent}    spacing: ${gap}`)
      const rowPropsStr = rowProps.length ? `${rowProps.join(',\n')},\n` : ''
      const rowInner = `${indent}  Row(\n${rowPropsStr}${indent}    children: [\n${childWidgets.join(',\n')},\n${indent}    ],\n${indent}  )`
      return `${indent}SingleChildScrollView(\n${indent}  scrollDirection: ${axisDart},\n${indent}  child: ${rowInner.trimStart()},\n${indent})`
    }

    const shrinkLines = nestedSameAxis
      ? `${indent}    shrinkWrap: true,\n${indent}    physics: NeverScrollableScrollPhysics(),\n`
      : ''

    if (kind === 'listBuilder') {
      const templateChild = childWidgets[0]?.trimStart().replace(/,?\s*$/, '') ?? 'SizedBox.shrink()'
      const inner = `ListView.builder(\n${indent}    scrollDirection: ${axisDart},\n${shrinkLines}${indent}    itemCount: ${children.length}, // TODO: 替换为数据源长度\n${indent}    itemBuilder: (context, index) {\n${indent}      // TODO: 根据首子节点模板化\n${indent}      return ${templateChild};\n${indent}    },\n${indent}  )`
      return this.wrapScrollInSizedBox(indent, containerHeight, inner, axis)
    }

    if (kind === 'listSep') {
      const sepSize = axis === 'horizontal' ? `width: ${gap}` : `height: ${gap}`
      const templateChild = childWidgets[0]?.trimStart().replace(/,?\s*$/, '') ?? 'SizedBox.shrink()'
      const inner = `ListView.separated(\n${indent}    scrollDirection: ${axisDart},\n${shrinkLines}${indent}    itemCount: ${children.length},\n${indent}    separatorBuilder: (_, __) => SizedBox(${sepSize}),\n${indent}    itemBuilder: (context, index) => ${templateChild},\n${indent}  )`
      return this.wrapScrollInSizedBox(indent, containerHeight, inner, axis)
    }

    if (kind === 'list') {
      const listChildren = childWidgets
        .map(c => `${indent}    ${c.trimStart()}`)
        .join(',\n')
      const inner = `ListView(\n${indent}    scrollDirection: ${axisDart},\n${shrinkLines}${indent}    children: [\n${listChildren},\n${indent}    ],\n${indent}  )`
      return this.wrapScrollInSizedBox(indent, containerHeight, inner, axis)
    }

    if (kind === 'page') {
      const pageChildren = childWidgets
        .map(c => `${indent}    ${c.trimStart()}`)
        .join(',\n')
      const inner = `PageView(\n${indent}    controller: PageController(), // TODO: 上移到 State\n${indent}    scrollDirection: ${axisDart},\n${shrinkLines}${indent}    children: [\n${pageChildren},\n${indent}    ],\n${indent}  )`
      return this.wrapScrollInSizedBox(indent, containerHeight, inner, axis)
    }

    // GridView
    const crossAxisCount = this.computeCrossAxisCount(parsed, children, gap, axis)
    const gridChildren = childWidgets
      .map(c => `${indent}    ${c.trimStart()}`)
      .join(',\n')
    const gridInner = `GridView.count(\n${indent}    scrollDirection: ${axisDart},\n${shrinkLines}${indent}    crossAxisCount: ${crossAxisCount},\n${indent}    mainAxisSpacing: ${gap},\n${indent}    crossAxisSpacing: ${gap},\n${indent}    children: [\n${gridChildren},\n${indent}    ],\n${indent}  )`
    return this.wrapScrollInSizedBox(indent, containerHeight, gridInner, axis)
  }

  private wrapScrollInSizedBox(indent: string, size: number, inner: string, axis: 'horizontal' | 'vertical'): string {
    if (!size || size <= 0) {
      return `${indent}${inner}`
    }
    const dim = axis === 'horizontal' ? `height: ${size}` : `width: ${size}`
    return `${indent}SizedBox(\n${indent}  ${dim},\n${indent}  child: ${inner},\n${indent})`
  }

  private pickScrollWidget(
    node: ComponentNode,
    children: ComponentNode[],
    parsed: ParsedStyles
  ): 'grid' | 'page' | 'scrollRow' | 'listBuilder' | 'listSep' | 'list' {
    if (node.layoutWrap === 'WRAP') return 'grid'
    const containerW = typeof parsed.width === 'number' ? parsed.width : 0
    if (containerW > 0) {
      const paged = children.every(c => {
        const cw = c.parsedStyles?.width
        return typeof cw === 'number' && Math.abs(cw - containerW) / containerW <= 0.05
      })
      if (paged) return 'page'
    }
    const uniform = this.isUniformChildren(children)
    if (!uniform || children.length < 5) return 'scrollRow'
    return 'listBuilder'
  }

  private computeCrossAxisCount(
    parsed: ParsedStyles,
    children: ComponentNode[],
    gap: number,
    axis: 'horizontal' | 'vertical'
  ): number {
    const crossSize = axis === 'horizontal'
      ? (typeof parsed.height === 'number' ? parsed.height : 0)
      : (typeof parsed.width === 'number' ? parsed.width : 0)
    const firstCross = axis === 'horizontal'
      ? children[0]?.parsedStyles?.height
      : children[0]?.parsedStyles?.width
    if (crossSize > 0 && typeof firstCross === 'number' && firstCross > 0) {
      const n = Math.floor(crossSize / (firstCross + gap))
      if (n >= 1) return n
    }
    return 2
  }

  private escapeString(str: string): string {
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  }
}
