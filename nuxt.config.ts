// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  $development: {
    devtools: { enabled: true },
  },

  app: {
    head: {
      title: 'Ellis Studio & Co.',
      meta: [
        { name: 'description', content: 'Ellis Studio & Co. é uma agência de design e desenvolvimento que cria experiências únicas e impactantes para seus clientes.' },
        { name: 'keywords', content: 'Ellis Studio & Co., design, desenvolvimento, experiência, impacto, clientes, branding, design gráfico, design de identidade visual, design de logotipo, design de website, design de aplicativo, design de marketing, design de publicidade, design de propaganda, design de identidade visual, design de logotipo, design de website, design de aplicativo, design de marketing, design de publicidade, design de propaganda' },
      ],
      link: [
        { rel: 'stylesheet', href: '/fontawesome/icons-subset.css' },
      ],
    },
  },

  typescript: {
    strict: true,
  },

  srcDir: 'src/',

  css: [
    '@/assets/styles/main.scss',
    'bootstrap/dist/css/bootstrap-grid.min.css',
    'bootstrap/dist/css/bootstrap-utilities.min.css',
  ],

  vite: {
    plugins: [svgLoader()]
  },

  modules: [[
    '@nuxtjs/google-fonts', 
    {
      families: {
        Sora: '300..600'
      },
      display: 'swap'
    }
  ]],

  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/webfonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/fontawesome/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },
  devServer: {
    host: '0.0.0.0' // Garante que o servidor escute em todas as interfaces
  }
})