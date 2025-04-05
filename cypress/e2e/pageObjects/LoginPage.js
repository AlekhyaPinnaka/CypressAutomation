class Login{

    mouseOverOnMyAccount(){
        return cy.get('#widget-navbar-217834 > .navbar-nav > :nth-child(6) > .nav-link > .info > .title')
                 .should('be.visible').trigger('mouseover');
        cy.wait(5000);
    }

    clickOnLogin(){
        return cy.get('#widget-navbar-217834 > ul > li:nth-child(6) > ul > li:nth-child(1) > a > div > span')
                 .click();
    }

    verifyAlertWarningMessage(){
        return cy.get('#account-login > div.alert.alert-danger')
    }

    clickOnLoginButton(){
        return cy.get('[value="Login"]')
                 .should('be.visible')
                 .should('have.class', 'btn btn-primary')
                 .click();
    }

    verifyMyAccountTitle(){
        return cy.get(':nth-child(1) > .card-header')
                 .should('contains.text','My Account')
    }

    clickOnLogout(){
        return cy.get('#widget-navbar-217834 > ul > li:nth-child(6) > ul > li:nth-child(6) > a > div > span')
                    .should('contains.text','Logout')
                    .click({force: true});
    }

}
export default Login;