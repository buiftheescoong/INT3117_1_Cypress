describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login');
    });
  
    it('Đăng nhập thành công (admin)', () => {
      
      cy.get('input[id="email"]').type('thecong@gmail.com');
  
      cy.get('input[id="password"]').type('Cong23032004*');
  
      cy.get('button[id="Login"]').click();
  
      cy.url().should('include', '/admin'); 
    });
    
    it('Sai mật khẩu với tài khoản admin', () => {
        cy.get('input[id="email"]').type('thecong@gmail.com');
        cy.get('input[id="password"]').type('123456');
        cy.get('button[id="Login"]').click();
        cy.contains('div', 'Invalid email or password', { timeout: 5000 }).should('be.visible');
        cy.url().should('include', '/');
    });
    
    it('Đăng nhập thành công (user)', () => {
        cy.get('input[id="email"]').type('user@gmail.com');
        cy.get('input[id="password"]').type('User23032004*');
        cy.get('button[id="Login"]').click();
        cy.url().should('include', '/');
    });
    
    it('Username không tồn tại, password đúng', () => {
        cy.get('input[id="email"]').type('no@gmail.com');
        cy.get('input[id="password"]').type('User23032004*');
        cy.get('button[id="Login"]').click();
        cy.contains('div', 'Invalid email or password', { timeout: 5000 }).should('be.visible');
        cy.url().should('include', '/');
    });
    
    it('Username không tồn tại, password sai', () => {
        cy.get('input[id="email"]').type('no@gmail.com');
        cy.get('input[id="password"]').type('wrongPassword');
        cy.get('button[id="Login"]').click();
        cy.contains('div', 'Invalid email or password', { timeout: 5000 }).should('be.visible');
        cy.url().should('include', '/');
    });
    
    it('Tài khoản user, sai mật khẩu', () => {
        cy.get('input[id="email"]').type('user@gmail.com');
        cy.get('input[id="password"]').type('123456');
        cy.get('button[id="Login"]').click();
        cy.contains('div', 'Invalid email or password', { timeout: 5000 }).should('be.visible');
        cy.url().should('include', '/');
    });

    it('Đăng nhập với email rỗng', () => {
        cy.get('input[id="email"]').clear();
        cy.get('input[id="password"]').type('123456');
        cy.get('button[id="Login"]').click();
        cy.contains('div', 'Email is required', { timeout: 5000 }).should('be.visible');
        cy.url().should('include', '/');
    });

    it('Đăng nhập với password rỗng', () => {
        cy.get('input[id="email"]').type('user@gmail.com');
        cy.get('input[id="password"]').clear();
        cy.get('button[id="Login"]').click();
        cy.contains('div', 'Password is required', { timeout: 5000 }).should('be.visible');
        cy.url().should('include', '/');
    });
    
  })
  