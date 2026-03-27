describe('Inventory Page', () => {

    const baseUrl = 'https://www.saucedemo.com/'

    const login = () => {
        cy.visit(baseUrl)
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        // ✅ Validasi masuk inventory page
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('.inventory_list').should('be.visible')
    }

    beforeEach(() => {
        login()
    })

    // =========================
    // POSITIVE TEST CASE
    // =========================
    it('Positive - User successfully lands on inventory page', () => {
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('Positive - User can add item to cart', () => {
        cy.get('.inventory_item').first().within(() => {
            cy.contains('Add to cart').click()
        })

        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .and('contain', '1')
    })

    // =========================
    // NEGATIVE TEST CASE
    // =========================
    it('Negative - Add to cart button should not duplicate item', () => {
        cy.get('.inventory_item').first().within(() => {
            cy.contains('Add to cart').click()
            cy.contains('Add to cart').should('not.exist') // berubah jadi Remove
        })

        cy.get('.shopping_cart_badge')
            .should('contain', '1')
    })

    // =========================
    // EDGE CASE
    // =========================
    it('Edge - Cart state persists after page reload', () => {
        cy.get('.inventory_item').first().within(() => {
            cy.contains('Add to cart').click()
        })

        cy.reload()

        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .and('contain', '1')
    })

    // =========================
    // EDGE CASE - SORTING
    // =========================
    it('Edge - Sorting changes item order', () => {

        cy.get('.inventory_item_name')
            .first()
            .invoke('text')
            .then((firstItemBefore) => {

                cy.get('.product_sort_container')
                    .should('be.visible')
                    .select('za')

                cy.get('.inventory_item_name')
                    .first()
                    .invoke('text')
                    .should((firstItemAfter) => {
                        expect(firstItemAfter).not.to.eq(firstItemBefore)
                    })
            })
    })

})