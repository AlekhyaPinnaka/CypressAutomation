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
    });
});