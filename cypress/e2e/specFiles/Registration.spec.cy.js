/// <reference types="cypress"/>
import Registration from "../pageObjects/RegistrationPage";

describe('Registration spec', () => {
  const reg = new Registration();
  let signUpData

  beforeEach(() => {
    cy.visit("https://ecommerce-playground.lambdatest.io/")
  });

  before(function () {
    cy.fixture('example').then(function (data) {
      signUpData = data;
    });
  });

  it('Verify title of the Page', () => {
    cy.get('span:contains("Home")').should('be.visible')
  });

  it('Registration Page', () => {
    reg.clickOnAccountPage()
    reg.clickOnContinueButton()
    reg.verifyTitleofRegisterAccountPage()
    reg.enterFirstName(signUpData.firstName)
    cy.log("Entered the First Name")
    reg.enterLastName(signUpData.lastName)
    cy.log("Entered the Last Name")
    reg.enterEmail(signUpData.email)
    cy.log("Entered the Email address")
    reg.enterMobileNumber(signUpData.mobileNumber)
    cy.log("Entered the Mobile Number")
    reg.enterPassword(signUpData.password)
    cy.log("Entered the Password")
    reg.enterConfirmPassword(signUpData.confirmPassword)
    cy.log("Entered the Confirmed Password")
    reg.clickOnCheckBox()
    reg.clickOnContinueButtonOnRegisterPage()
    cy.url({ timeout: 10000 })
      .then((url) => {
        if (url === 'https://ecommerce-playground.lambdatest.io/index.php?route=account/success') {
          cy.log("Account has been created Successfully");
          reg.verifyAccountCreation();
        } else {
          reg.verifyRegisteredUser().then(($warning) => {
            if ($warning.length === 0) {
              reg.verifyTitleofAccountCreation();
            } else {
              cy.log('User is already registered. Skipping account creation title check.');
            }
          });
        }

      });
  });
});  