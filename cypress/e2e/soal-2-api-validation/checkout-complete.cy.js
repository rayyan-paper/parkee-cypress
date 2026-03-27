describe('Checkout Complete Page', () => {

    const baseUrl = 'https://www.saucedemo.com/'

    const completeCheckout = () => {
        cy.visit(baseUrl)

        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        cy.get('.inventory_item').first().within(() => {
            cy.contains('Add to cart').click()
        })

        cy.get('.shopping_cart_link').click()
        cy.contains('Checkout').click()

        cy.get('#first-name').type('Rayyan')
        cy.get('#last-name').type('Dzaki')
        cy.get('#postal-code').type('12345')
        cy.get('#continue').click()

        cy.contains('Finish').click()

        cy.url().should('include', '/checkout-complete')
    }

    // =========================
    // POSITIVE TEST CASE
    // =========================
    it('Positive - Order is successfully completed', () => {
        completeCheckout()

        cy.contains('Thank you for your order!').should('be.visible')
        cy.get('.complete-header').should('be.visible')
    })

    // =========================
    // NEGATIVE TEST CASE
    // =========================
    it('Negative - User cannot access complete page directly', () => {
        cy.visit('https://www.saucedemo.com/checkout-complete.html', {
            failOnStatusCode: false
        })

        // Expected: tidak boleh langsung akses
        cy.url().should('not.include', '/checkout-complete')
    })

    // =========================
    // EDGE CASE - BACK HOME
    // =========================
    it('Edge - Back Home button redirects to inventory page', () => {
        completeCheckout()

        cy.contains('Back Home').click()

        cy.url().should('include', '/inventory')
    })

    // =========================
    // EDGE CASE - REFRESH PAGE
    // =========================
    it('Edge - Refresh keeps user on complete page', () => {
        completeCheckout()

        cy.reload()

        cy.url().should('include', '/checkout-complete')
    })

})