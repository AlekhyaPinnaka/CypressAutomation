import Login from "../pageObjects/LoginPage";
import Registration from "../pageObjects/RegistrationPage";
 

describe('Login spec', () => {
    const login=new Login();
    const reg=new Registration();
    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');
    let isTitleVerified = false;

    beforeEach(()=>{
        cy.visit("https://ecommerce-playground.lambdatest.io/")
    });

    it('Verify title of the Page',()=>{
        cy.get('span:contains("Home")').should('be.visible')
        //cy.title().should('eq', 'Home');
    });

    it('Login into the Account', () => {
        login.mouseOverOnMyAccount();
        login.clickOnLogin();
        cy.login(username,password)
        cy.url({timeout: 10000})
           .then((url) => {
            if (url === 'https://ecommerce-playground.lambdatest.io/index.php?route=account/account') {
                cy.log("Login is Successful");
                cy.url().should('eq', 'https://ecommerce-playground.lambdatest.io/index.php?route=account/account');
                login.verifyMyAccountTitle();
                cy.writeFile('cypress/fixtures/loginStatus.json', { status: 'success' });
            }else{
                cy.log("Login failed: Email Id or Password is Incorrect");
                cy.get('.alert.alert-danger', { timeout: 10000 }).should('be.visible')
                    .invoke('text').then((text) => {
                        cy.log('Warning text: ' + text);

                        if (text.includes('Warning: No match for E-Mail Address and/or Password.')) {
                            cy.writeFile('cypress/fixtures/loginStatus.json', { status: 'failed' });
                        }else if (text.includes('Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.')) {
                            cy.log('Warning: Exceeded login attempts');
                            cy.writeFile('cypress/fixtures/loginStatus.json', { status: 'locked' });
                        }
                    });
            }
        }); 
        cy.request("GET","https://ecommerce-playground.lambdatest.io/index.php?route=account/account").should((response)=>{
            expect(response.status).to.eq(200);
        }) 
    });   

    after('Logout from the Account',()=>{
        login.clickOnLogout();
    });
   
});