describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should login successfully with correct credentials', () => {
    
    cy.get('input[id="email"]').type('thecong@gmail.com');

    cy.get('input[id="password"]').type('Cong23032004*');

    cy.get('button[id="Login"]').click();

    cy.url().should('not.include', '/login'); 
  });

})
