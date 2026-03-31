// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Ellis Studio & Co.',
      meta: [
        { name: 'description', content: 'Ellis Studio & Co. é uma agência de design e desenvolvimento que cria experiências únicas e impactantes para seus clientes.' },
        { name: 'keywords', content: 'Ellis Studio & Co., design, desenvolvimento, experiência, impacto, clientes, branding, design gráfico, design de identidade visual, design de logotipo, design de website, design de aplicativo, design de marketing, design de publicidade, design de propaganda, design de identidade visual, design de logotipo, design de website, design de aplicativo, design de marketing, design de publicidade, design de propaganda' },
      ],
      link: [
        { rel: 'stylesheet', href: '/fontawesome/all.min.css' },
        { rel: 'stylesheet', href: '/fontawesome/sharp-regular.min.css' }
      ],
      script: [
        { src: '/fontawesome/all.min.js', defer: true },
        { src: '/fontawesome/sharp-regular.min.js', defer: true }
      ],
    },
  },

  typescript: {
    strict: true,
  },

  srcDir: 'src/',

  css: [
    '@/assets/styles/main.scss',
    'bootstrap/dist/css/bootstrap.min.css'
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
  ], 'nuxt-swiper'],
  devServer: {
    host: '0.0.0.0' // Garante que o servidor escute em todas as interfaces
  }
})