const { defineConfig } = require("cypress")
const fs = require('fs-extra')
const path = require('path')

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 80000,
  pageLoadTimeout: 80000,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      const file = config.env.configFile || "production"
      const pathToConfigFile = path.resolve('cypress/config', `${file}.json`)
      return fs.readJson(pathToConfigFile)
    }
  }
})