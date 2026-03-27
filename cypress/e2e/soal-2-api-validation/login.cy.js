describe('Login Page', () => {

    const baseUrl = 'https://www.saucedemo.com/'
  
    /**
     * Reusable login function with error handling
     * @param {string} username
     * @param {string} password
     * @param {boolean} expectedSuccess
     * @param {string} expectedError (optional)
     */
    const login = (username, password, expectedSuccess, expectedError = '') => {
        cy.visit(baseUrl)
      
        // Only type if not empty
        if (username) {
          cy.get('#user-name').clear().type(username)
        }
      
        if (password) {
          cy.get('#password').clear().type(password)
        }
      
        cy.get('#login-button').click()
      
        if (expectedSuccess) {
          cy.url().should('include', '/inventory')
          cy.get('.inventory_list').should('be.visible')
        } else {
          cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', expectedError)
      
          cy.url().should('eq', baseUrl)
        }
      }
  
    // =========================
    // ✅ POSITIVE TEST CASE
    // =========================
    it('Positive - Login with valid credentials', () => {
      login('standard_user', 'secret_sauce', true)
    })
  
    // =========================
    // ❌ NEGATIVE TEST CASES
    // =========================
  
    it('Negative - Wrong password', () => {
      login(
        'standard_user',
        'salah_password',
        false,
        'Username and password do not match'
      )
    })
  
    it('Negative - Empty password', () => {
      login(
        'standard_user',
        '',
        false,
        'Password is required'
      )
    })
  
    it('Negative - Empty username', () => {
      login(
        '',
        'secret_sauce',
        false,
        'Username is required'
      )
    })
  
    it('Negative - Both fields empty', () => {
      login(
        '',
        '',
        false,
        'Username is required'
      )
    })

  })