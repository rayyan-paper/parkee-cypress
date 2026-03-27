describe('Cart Page', () => {

    const baseUrl = 'https://www.saucedemo.com/'
  
    const login = () => {
      cy.visit(baseUrl)
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
      cy.url().should('include', '/inventory')
    }
  
    const addItemToCart = () => {
      cy.get('.inventory_item').first().within(() => {
        cy.contains('Add to cart').click()
      })
    }
  
    beforeEach(() => {
      login()
      addItemToCart()
      cy.get('.shopping_cart_link').click()
  
      // validasi sudah di cart page
      cy.url().should('include', '/cart.html')
    })
  
    // =========================
    // ✅ POSITIVE TEST CASE
    // =========================
    it('Positive - Item appears in cart', () => {
      cy.get('.cart_item')
        .should('have.length', 1)
  
      cy.get('.inventory_item_name')
        .should('be.visible')
    })
    
    // =========================
    // ✅ POSITIVE TEST CASE
    // =========================
    it('Positive - User can proceed to checkout', () => {
        cy.contains('Checkout').click()
        cy.url().should('include', '/checkout-step-one')
    })

    // =========================
    // ❌ NEGATIVE TEST CASE
    // =========================
    it('Negative - User can remove item from cart', () => {
      cy.get('.cart_item').should('have.length', 1)
  
      cy.contains('Remove').click()
  
      cy.get('.cart_item').should('have.length', 0)
    })
  
    // =========================
    // 🔥 EDGE CASE
    // =========================
    it('Edge - Cart remains empty after removing item and refreshing', () => {
      cy.contains('Remove').click()
  
      cy.reload()
  
      cy.get('.cart_item').should('have.length', 0)
    })
  
    // =========================
    // 🔥 EDGE CASE - NAVIGATION
    // =========================
    it('Edge - Continue shopping redirects to inventory page', () => {
      cy.contains('Continue Shopping').click()
  
      cy.url().should('include', '/inventory')
    })

  })