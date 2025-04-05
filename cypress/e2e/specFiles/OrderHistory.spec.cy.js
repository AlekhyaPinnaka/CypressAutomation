import OrderHistory from "../pageObjects/OrderHistory";
import Login from "../pageObjects/LoginPage";
import Registration from "../pageObjects/RegistrationPage";

describe('OrderHistory spec', () => {
    const orderHistory = new OrderHistory();
    const login = new Login();
    const reg = new Registration();

    beforeEach(() => {
        cy.visit("https://ecommerce-playground.lambdatest.io/")
    });

    it('Verify title of the Page', () => {
        cy.get('span:contains("Home")').should('be.visible')
    });

    it('Order History', () => {
        login.mouseOverOnMyAccount();
        login.clickOnLogin();
        reg.enterEmail("lambdatest.Cypress@disposable.com");
        reg.enterPassword("Cypress123!!");
        login.clickOnLoginButton();

        cy.url().should('include', '/index.php?route=account/account');
        orderHistory.myOrders();

        Cypress._.times(6, (index) => { 
            cy.get(':nth-child(1) > .card-body')
          .find('div')
          .eq(index)
          .click();
          
          cy.get('#content > div.table-responsive').should('be.visible');
          cy.go('back');
          cy.reload();
          });

        // cy.get('#content > div:nth-child(2) > div > div')
        //     .find('div')
        //      .should('have.length', 6)  
        //     .each(($el, index) => {
        //         debugger;
        //         // cy.wrap($el).then(($el) => {
        //         cy.wrap($el).click();
        //         //    cy.wait(2000);
        //         cy.get('#content > div.table-responsive > table', { timeout: 10000 })
        //             .should('be.visible')
        //             .find('tr')
        //             .each(($row, rowIndex) => {
        //                 cy.wrap($row).find('td').each(($cell, cellIndex) => {
        //                     cy.log(`Row: ${rowIndex + 1}, Cell: ${cellIndex + 1} - ${$cell.text()}`);
        //                 });

        //             })
        //         cy.get('body').should('not.have.class', 'loading');
        //         cy.wait(2000);
        //         cy.go('back');
        //         cy.wait(2000);
        //         cy.reload();
        //         //cy.get('#content', { timeout: 10000 }).should('be.visible');
        //         cy.wait(2000);
        //         cy.get('#content > div:nth-child(2) > div > div').should('be.visible');
        //         // })
        //     })

        //         const divSelectors = [
        //             '#content > div:nth-child(2) > div > div:nth-child(1)', // Replace with your actual div selectors
        //             '#content > div:nth-child(2) > div > div:nth-child(2)',
        //             '#content > div:nth-child(2) > div > div:nth-child(3)',
        //             '#content > div:nth-child(2) > div > div:nth-child(4)',
        //             '#content > div:nth-child(2) > div > div:nth-child(5)',
        //             '#content > div:nth-child(2) > div > div:nth-child(6)',
        //           ];
        //           for (let i = 0; i < divSelectors.length; i++) {
        //             const selector = divSelectors[i];
        //             cy.get('#content', { timeout: 20000 }) // Ensure content is loaded
        //         .should('be.visible')
        //         .find('div:nth-child(2) > div', { timeout: 20000 }) // Find the parent div
        //         .find(selector, { timeout: 20000 }) // Find the specific child div
        //         .should('exist')
        //         .should('be.visible') // Ensure the element is visible before clicking
        //         .click()

        //         // Wait for the page to load after clicking
        //         .get('body', { timeout: 20000 })
        //         .should('not.have.class', 'loading')

        //         // Go back to the previous page
        //         .go('back')

        //         // Wait for the page to reload after going back
        //         .wait(2000)
        //         .then(() => {
        //           if (i === divSelectors.length - 1) {
        //             cy.log('All elements have been clicked.');
        //         }    
        //     })

        // }

        // cy.get(':nth-child(2) > .card-body > .row >')  // Replace #parentDiv with the correct selector for your div
        //     .children()         // Get the child elements inside the div
        //     .each(($el, index, $list) => {    // Iterate over each child element
        //         cy.wrap($el).should('be.visible').click();
        //         cy.wait(3000)
        //         cy.get('.float-right > .btn').click()
        //         // cy.get(':nth-child(2) > .card-header').scrollIntoView();
        //         // cy.get(':nth-child(2) > .card-body > .row > :nth-child(2) > .d-inline-flex').click()
        //         // cy.get('.float-right > .btn').click()
        //         if (index === $list.length - 1) {
        //             cy.go('back')
        //         }

        //     })
    });
});