class ProductListing {

    mouseOverOnAddOns() {
        cy.get('#widget-navbar-217834 > ul > li:nth-child(5) > a > div > span')
            .should('be.visible')
            .trigger('mouseover');
    }

    clickOnModules() {
        cy.get('#widget-navbar-217834 > ul > li:nth-child(5) > ul > li:nth-child(1) > a > div > span')
            .contains('Modules') // Wait until the "Modules" option appears
            .should('be.visible') // Ensure it's visible
            .click();
    }

    verifyProductListingText() {
        cy.get('#entry_212970 > h2')
            .contains('Product Listing')
            .should('have.text', 'Product Listing')
    }

    clickOnViewCart(){
        cy.get('.form-row > :nth-child(1) > .btn')
            .click();
    }
}
export default ProductListing;