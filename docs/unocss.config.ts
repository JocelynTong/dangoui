import { defineConfig, presetUno, presetTypography, presetIcons } from 'unocss'

export default defineConfig({
  // 文字样式快捷方式（与生产环境一致）
  shortcuts: {
    'text-h1': 'text-24px font-500 leading-30px',
    'text-h2': 'text-20px font-500 leading-26px',
    'text-h3': 'text-18px font-500 leading-25px',
    'text-h4': 'text-16px font-500 leading-24px',
    'text-h5': 'text-14px font-500 leading-22px',
    'text-h6': 'text-12px font-500 leading-18px',
    'text-h7': 'text-11px font-500 leading-13px',
    'text-h8': 'text-10px font-500 leading-11px',

    'text-b1': 'text-24px font-400 leading-30px',
    'text-b2': 'text-20px font-400 leading-26px',
    'text-b3': 'text-18px font-400 leading-25px',
    'text-b4': 'text-16px font-400 leading-24px',
    'text-b5': 'text-14px font-400 leading-22px',
    'text-b6': 'text-12px font-400 leading-18px',
    'text-b7': 'text-11px font-400 leading-13px',
    'text-b8': 'text-10px font-400 leading-11px',

    'text-n1': 'text-24px font-num font-500 leading-30px',
    'text-n2': 'text-20px font-num font-500 leading-26px',
    'text-n3': 'text-18px font-num font-500 leading-25px',
    'text-n4': 'text-16px font-num font-500 leading-24px',
    'text-n5': 'text-14px font-num font-500 leading-22px',
    'text-n6': 'text-12px font-num font-500 leading-18px',
    'text-n7': 'text-11px font-num font-500 leading-13px',
    'text-n8': 'text-10px font-num font-500 leading-11px',

    // 颜色 token（映射到 design-tokens.css 变量）
    'c-text-1': 'text-[var(--text-1)]',
    'c-text-2': 'text-[var(--text-2)]',
    'c-text-3': 'text-[var(--text-3)]',
    'c-text-disabled': 'text-[var(--text-disabled)]',
    'bg-page': 'bg-[var(--bg-2)]',
    'bg-1': 'bg-[var(--bg-1)]',
    'bg-2': 'bg-[var(--bg-2)]',
    'bg-3': 'bg-[var(--bg-3)]',
    'bg-4': 'bg-[var(--bg-4)]',
  },
  rules: [
    ['font-num', { 'font-family': 'Roboto' }],
    // 动态颜色规则
    [/^c-text-(\d)$/, ([, d]) => ({ color: `var(--text-${d})` })],
    [/^bg-(\d)$/, ([, d]) => ({ 'background-color': `var(--bg-${d})` })],
  ],
  presets: [
    presetUno(),
    presetIcons(),
    presetTypography({
      cssExtend: {
        pre: {
          border: '1px solid rgba(0, 0, 0, 0.08)',
          'border-radius': '4px',
        },
        'code:before': {
          content: 'none',
        },
        'code:after': {
          content: 'none',
        },
        'h1 a, h2 a': {
          'text-decoration': 'none',
          position: 'relative',
        },
        'h1 a:before, h2 a:before': {
          content: '"#"',
          position: 'absolute',
          left: '-20px',
          opacity: '0',
          transition: 'opacity 0.1s ease',
          color: '#7c66ff',
        },
        'h1 a:hover:before, h2 a:hover:before': {
          opacity: '1',
        },
      },
    }),
  ],
  theme: {
    colors: {
      qdPurple: {
        100: '#f2f0ff',
        200: '#d9d2ff',
        300: '#c7b8ff',
        400: '#958dff',
        500: '#7c66ff',
        600: '#5c4cd9',
        700: '#4036b3',
        800: '#28238c',
        900: '#1a1866',
        DEFAULT: '#7c66ff',
      },
      qhOrange: {
        100: '#fff7ed',
        200: '#ffedd5',
        300: '#fed7aa',
        400: '#fdba74',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
        DEFAULT: '#f97316',
      },
      'border-primary': 'rgba(0, 0, 0, 0.12)',
      'border-2': 'rgba(0, 0, 0, 0.08)',
      'border-3': 'rgba(0, 0, 0, 0.04)',
      'bg-primary': '#f2f0ff',
      'bg-2': '#f7f7f9',
      'bg-3': '#fff',
      'bg-4': 'var(--du-c-bg-4)',
    },
  },
  separators: [':', '-'],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|ts|mdx?|astro|elm|php|phtml|html)($|\?)/,
      ],
    },
  },
})
