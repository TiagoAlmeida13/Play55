export default defineNuxtConfig({
  ssr: false,
  vite: {
    optimizeDeps: {
      include: ['pinia']
    }
  },
  runtimeConfig: {
    public: {
      FB_API_KEY: process.env.NUXT_PUBLIC_FB_API_KEY,
      FB_AUTH_DOMAIN: process.env.NUXT_PUBLIC_FB_AUTH_DOMAIN,
      FB_PROJECT_ID: process.env.NUXT_PUBLIC_FB_PROJECT_ID,
      FB_STORAGE_BUCKET: process.env.NUXT_PUBLIC_FB_STORAGE_BUCKET,
      FB_MESSAGING_SENDER_ID: process.env.NUXT_PUBLIC_FB_MESSAGING_SENDER_ID,
      FB_APP_ID: process.env.NUXT_PUBLIC_FB_APP_ID,
    },
  },
});
