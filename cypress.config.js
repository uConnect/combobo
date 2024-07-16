const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    index: './demo/index.html',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
