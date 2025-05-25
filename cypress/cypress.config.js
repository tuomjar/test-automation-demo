const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false, // Estää videotallennuksen
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
})
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: false,
      json: true
    },
  },
})
