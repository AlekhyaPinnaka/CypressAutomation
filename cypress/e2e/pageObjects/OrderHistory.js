class OrderHistory{

    myOrders(){
        return cy.get(':nth-child(2) > .card-header')
                 .should('have.text','My Orders')
    }

    clickOnorderhistory(){
        return cy.get('#content > div:nth-child(2) > div > div')
        // .contains('View your order history')
        // .should('be.visible')  // Optional: Ensure the text is visible
        // .click(); 
    }

}
export default OrderHistory;