const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    embeddedScreenshots: true,
    html: true,
    json: true,
  },
  e2e: {
    defaultCommandTimeout:10000,
    pageLoadTimeout:10000,
    testIsolation:false,
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
      require('cypress-mochawesome-reporter/plugin')(on, config);
      return config;
    },
    specPattern: [
      'cypress/e2e/**/*.spec.cy.js',
      'cypress/e2e/**/*.feature'
    ],
    env: {
      "USERNAME": "lambdatest.Cypress@disposable.com",
      "PASSWORD": "Cypress123!!"
    },
    video: true,                       
    videoCompression: 32,
    videosFolder: "cypress/videos",
  },
});
