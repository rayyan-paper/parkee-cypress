describe('Checkout Step Two Page', () => {

    const baseUrl = 'https://www.saucedemo.com/'
  
    const goToStepTwo = () => {
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
  
      cy.url().should('include', '/checkout-step-two')
    }
  
    // =========================
    // ✅ POSITIVE TEST CASE
    // =========================
    it('Positive - User can complete checkout', () => {
      goToStepTwo()
  
      cy.contains('Finish').click()
  
      cy.url().should('include', '/checkout-complete')
    })
  
    // =========================
    // ❌ NEGATIVE TEST CASE
    // =========================
    it('Negative - User cannot proceed without filling step one form', () => {
  
      cy.visit(baseUrl)
  
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
  
      cy.get('.inventory_item').first().within(() => {
        cy.contains('Add to cart').click()
      })
  
      cy.get('.shopping_cart_link').click()
      cy.contains('Checkout').click()
  
      // skip isi form
      cy.get('#continue').click()
  
      cy.url().should('include', '/checkout-step-one')
    })
  
    // =========================
    // 🔥 EDGE CASE - CANCEL
    // =========================
    it('Edge - Cancel returns user to inventory page', () => {
      goToStepTwo()
  
      cy.contains('Cancel').click()
  
      cy.url().should('include', '/inventory')
    })
  
    // =========================
    // 🔥 EDGE CASE - PRICE VALIDATION
    // =========================
    it('Edge - Total price is correctly calculated', () => {
      goToStepTwo()
  
      cy.get('.summary_subtotal_label')
        .invoke('text')
        .then((text) => {
          const subtotal = parseFloat(text.replace('Item total: $', ''))
  
          cy.get('.summary_tax_label')
            .invoke('text')
            .then((taxText) => {
              const tax = parseFloat(taxText.replace('Tax: $', ''))
  
              cy.get('.summary_total_label')
                .invoke('text')
                .then((totalText) => {
                  const total = parseFloat(totalText.replace('Total: $', ''))
  
                  expect(total).to.eq(subtotal + tax)
                })
            })
        })
    })
  
    // =========================
    // 🔥 OPTIONAL EDGE - RAPID CLICK
    // =========================
    it('Edge - Multiple rapid clicks on Finish button', () => {
      goToStepTwo()
  
      cy.contains('Finish').click({ multiple: true })
  
      cy.url().should('include', '/checkout-complete')
    })
  
  })