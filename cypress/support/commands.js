// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {

    cy.get('#input-email')
        .should('exist')
        .should('be.visible')
        .type(username)
        .should('have.value', username);

    cy.get('#input-password')
        .should('exist')
        .should('be.visible')
        .type(password)
        .should('have.value', password);
      
    cy.get('[value="Login"]')
        .should('be.visible')
        .should('have.class', 'btn btn-primary')
        .click();
});