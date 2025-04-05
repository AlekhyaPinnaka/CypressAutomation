import { generateRandomEmail } from '../../support/randomUtil';

class Registration{
    
    clickOnAccountPage(){
        return cy.get('#widget-navbar-217834 > .navbar-nav > :nth-child(6) > .nav-link > .info > .title')
                 .should('contains.text','My account').click();
    }
    clickOnContinueButton(){
        return cy.get('.card-body > .btn')
                 .should('have.class','btn btn-primary').click();  
    }
    verifyTitleofRegisterAccountPage(){
        return cy.get('.page-title')
                 .should('contains.text','Register Account'); 
    }
    enterFirstName(firstName){
       return cy.get('#input-firstname').type(firstName)
                .should('have.value',firstName);
    }
    enterLastName(lastName){
        return cy.get('#input-lastname') .type(lastName)
                 .should('have.value',lastName);
    }
    enterEmail(email= generateRandomEmail()){  
        return cy.get('#input-email').type(email)
                 .should('exist').should('have.value',email);
    }
    enterMobileNumber(mobileNumber){
        return cy.get('#input-telephone') .type(mobileNumber)
                 .should('have.value',mobileNumber)
    }
    enterPassword(password){
        return cy.get('#input-password').type(password)
                 .should('have.value',password)
    }
    enterConfirmPassword(confirmPassword){
        return cy.get('#input-confirm').type(confirmPassword)
                 .should('have.value',confirmPassword)
    }
    clickOnCheckBox(){
        return cy.get('[type="checkbox"]') .check({force: true})
                 .should('be.checked')
    }
    clickOnContinueButtonOnRegisterPage(){
        return cy.get('[type="submit"]')
                 .eq(2)
                 .should('have.value','Continue')
                 .click();
    }
    verifyTitleofAccountCreation(){
        return cy.get('.page-title')
                 .should('contains.text',' Your Account Has Been Created!')
    }
    verifyRegisteredUser(){
        return cy.get('#account-register > div.alert.alert-danger.alert-dismissible')
                 .should('contains.text',' Warning: E-Mail Address is already registered!') 
    }

    verifyAccountCreation(){
        return cy.get('#content > h1')
                 .should('have.text',' Your Account Has Been Created!')
    }
}
export default Registration;