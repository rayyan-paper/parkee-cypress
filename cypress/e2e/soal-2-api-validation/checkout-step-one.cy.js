describe('Checkout Step One Page', () => {

    const baseUrl = 'https://www.saucedemo.com/'

    const loginAndGoToCheckout = () => {
        cy.visit(baseUrl)
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        cy.get('.inventory_item').first().within(() => {
            cy.contains('Add to cart').click()
        })

        cy.get('.shopping_cart_link').click()
        cy.contains('Checkout').click()

        // validasi sudah di step one
        cy.url().should('include', '/checkout-step-one')
    }

    beforeEach(() => {
        loginAndGoToCheckout()
    })

    /**
     * Reusable input function
     */
    const fillCheckoutForm = (firstName, lastName, postalCode, expectedSuccess, expectedError = '') => {

        if (firstName) {
            cy.get('#first-name').clear().type(firstName)
        }

        if (lastName) {
            cy.get('#last-name').clear().type(lastName)
        }

        if (postalCode) {
            cy.get('#postal-code').clear().type(postalCode)
        }

        cy.get('#continue').click()

        if (expectedSuccess) {
            cy.url().should('include', '/checkout-step-two')
        } else {
            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', expectedError)
        }
    }

    // =========================
    // POSITIVE TEST CASE
    // =========================
    it('Positive - User can continue with valid data', () => {
        fillCheckoutForm('Rayyan', 'Dzaki', '12345', true)
    })

    // =========================
    // NEGATIVE TEST CASES
    // =========================
    it('Negative - Empty first name', () => {
        fillCheckoutForm('', 'Dzaki', '12345', false, 'First Name is required')
    })

    it('Negative - Empty last name', () => {
        fillCheckoutForm('Rayyan', '', '12345', false, 'Last Name is required')
    })

    it('Negative - Empty postal code', () => {
        fillCheckoutForm('Rayyan', 'Dzaki', '', false, 'Postal Code is required')
    })

    it('Negative - All fields empty', () => {
        fillCheckoutForm('', '', '', false, 'First Name is required')
    })

    // =========================
    // EDGE CASE
    // =========================
    it('Edge - Input extremely long text', () => {
        const longText = 'a'.repeat(200)

        fillCheckoutForm(longText, longText, '12345', true)

        cy.url().should('include', '/checkout-step-two')
    })

})