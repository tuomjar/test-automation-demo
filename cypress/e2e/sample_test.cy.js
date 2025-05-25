describe('Vite React Frontend Test', () => {
  it('should load the home page and show Vite + React text', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Vite + React').should('be.visible')
  })
})
