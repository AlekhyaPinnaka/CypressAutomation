import ProductListing from "../pageObjects/ProductListingPage"

describe('OrderHistory spec', () => {
    const productListing = new ProductListing();
    let totalSum = 0;

    beforeEach(() => {
        cy.visit("https://ecommerce-playground.lambdatest.io/");
    });

    it('Verify title of the Page', () => {
        cy.get('span:contains("Home")').should('be.visible');
    });

    it('Product Listing', () => {
        productListing.mouseOverOnAddOns();
        productListing.clickOnModules();
        productListing.verifyProductListingText();

        cy.get('div.swiper-wrapper')
            .eq(0)
            .each(($product) => {
                const productName = $product.find('h4.title').text().trim();
                cy.log('Product Name:' + productName);
                const productPrice = $product.find('.price').text().trim();
                cy.log('Product Price:' + productPrice + " ");
            });

        cy.get('div.product-action>button')
            .eq(0)
            .click({ force: true })
            .wait(1000);
        cy.get('.d-flex > p')
            .then(($p) => {
                const text = $p.text();
                cy.log(text);
                expect(text).to.include('Success');
            });

        productListing.clickOnViewCart();

        cy.url().should('include', 'index.php?route=checkout/cart');

        cy.get('#content > form > div > table > tbody > tr').each(($row) => {
            cy.wrap($row)
                .find('td:last-child')
                .invoke('text')
                .then((totalText) => {
                    cy.log('Extracted Total Text:', totalText);
                    const numericTotalText = totalText.replace(/[^0-9.-]+/g, '');  // Remove symbols
                    const totalValue = parseFloat(numericTotalText);
                    if (!isNaN(totalValue)) {
                        totalSum += totalValue;
                    } else {
                        cy.log('Warning: Invalid total value detected.');
                    }
                    cy.log('Running Total Sum:', totalSum);
                });
        });

        cy.then(() => {
            const finalTotal = `$${totalSum.toFixed(2)}`;
            cy.log('Final Total Sum:', totalSum);
        });

        cy.get('#content > div.row.mb-3.align-items-end > div.col-md-4 > table')
            .find('tr')
            .each(($row, rowIndex) => {
                cy.wrap($row).find('td')
                    .each(($cell, cellIndex) => {
                        const cellText = $cell.text().trim();
                        cy.log(`Row: ${rowIndex + 1}, Cell: ${cellIndex + 1} - ${cellText}`);
                        if (cellText === 'Total:') {
                            cy.log(`Found the text "Total:" in Row: ${rowIndex + 1}, Cell: ${cellIndex + 1}`);
                            cy.wrap($row).find('td').eq(cellIndex + 1)
                                .then(($nextCell) => {
                                    const totalValueFromCart = $nextCell.text().trim();
                                    cy.log('Total Value from Cart:', totalValueFromCart);
                                    cy.then(() => {
                                        const formattedTotalSum = `$${totalSum.toFixed(2)}`;
                                        const numericTotalValueFromCart = totalValueFromCart.replace(/[^0-9.-]+/g, '');
                                        if (formattedTotalSum === `$${parseFloat(numericTotalValueFromCart).toFixed(2)}`) {
                                            cy.log(`Total Values are equal: ${formattedTotalSum} === $${parseFloat(numericTotalValueFromCart).toFixed(2)}`);
                                        } else {
                                            cy.log(`Total Values are not equal: ${formattedTotalSum} !== $${parseFloat(numericTotalValueFromCart).toFixed(2)}`);
                                        }
                                    });
                                });
                        }
                    });
            });

        cy.get('.buttons.d-flex > .btn-primary')
            .should('have.text', 'Checkout')
            .click();
    });
});