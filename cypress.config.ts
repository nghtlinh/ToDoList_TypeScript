import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://comp491-todolist.netlify.app',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // setup node events code
    },
  },
})
