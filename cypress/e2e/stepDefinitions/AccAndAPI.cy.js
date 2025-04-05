import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Login from "../pageObjects/LoginPage";

const username = Cypress.env('USERNAME');
const password = Cypress.env('PASSWORD');
const login = new Login();

before(() => {
    cy.visit("https://ecommerce-playground.lambdatest.io/");
    login.mouseOverOnMyAccount();
    login.clickOnLogin();
    cy.login(username, password);  
});

Given("User is logged into the website", () => {
    cy.url().should('include', 'account/account');  
});

Then("verify the user is logged in successfully", () => {
    login.verifyMyAccountTitle();  
});

And("verify the API response for login is 200", () => {
    cy.request({
        method: 'GET',
        url: 'https://ecommerce-playground.lambdatest.io/index.php?route=account/account',
        failOnStatusCode: false  
    }).as('loginApiResponse');
    
    cy.get('@loginApiResponse').its('status').should('eq', 200);  
});

When("User navigates to the accordion page", () => {
    cy.visit("https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/page&page_id=11");
    cy.wait(2000);  
});

Then("User expands all closed accordions", () => {
    cy.get("[id^='mz-accordion-label-'] > .ml-auto")
        .should("exist")
        .should("be.visible")
        .each(($el) => {
            cy.wrap($el)
                .scrollIntoView()
                .click({ force: true });  
            cy.wrap($el)
                .parent()
                .next()
                .should("not.have.class", "collapse");  
        });
});

And("verify the API response for accordion page is 200", () => {
    cy.request({
        method: 'GET',
        url: 'https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/page&page_id=11',
        failOnStatusCode: false
    }).as('accordionApiResponse');

    cy.get('@accordionApiResponse').its('status').should('eq', 200);  
});

When("User checks the API for account page response", () => {
    cy.request({
        method: 'GET',
        url: 'https://ecommerce-playground.lambdatest.io/index.php?route=account/account',
        failOnStatusCode: false 
    }).as('accountPageApiResponse');
});

Then("verify the API response status is 200", () => {
    cy.get('@accountPageApiResponse').its('status').should('eq', 200);
});