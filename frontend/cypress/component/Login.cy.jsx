import React from 'react';
import Login from '../../src/page/Login';
import { authContext } from '../../src/context/authContext';
import { MemoryRouter } from 'react-router-dom';

describe('<Login />', () => {

  beforeEach(() => {
    // Move the cy.stub() inside beforeEach to ensure it's within a test lifecycle method
    const dispatch = cy.stub().as('dispatch');

    cy.mount(
      <authContext.Provider value={{ dispatch }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </authContext.Provider>
    );
  });

  it('renders the login form', () => {
    cy.get('h1').should('contain.text', 'Login to your account');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button#Login').should('contain.text', 'Login');
  });

  it('shows error for empty fields', () => {
    cy.get('button#Login').click();
    cy.contains('Email is required', { timeout: 10000 }); // increase timeout to 10 seconds

  });

  it('shows error for invalid email format', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('secret');
    cy.get('button#Login').click();
    cy.contains('Invalid email format');
  });

  it('logs in successfully with correct credentials', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: {
        data: {
          email: 'test@email.com',
          isAdmin: true
        },
        token: 'mock_token'
      }
    }).as('loginRequest');

    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button#Login').click();

    cy.wait('@loginRequest');
    cy.contains('User logged in successfully');
    cy.get('@dispatch').should('have.been.calledWithMatch', {
      type: 'LOGIN_SUCCESS'
    });
  });

  it('shows error on failed login', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' }
    }).as('failedLogin');

    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button#Login').click();

    cy.wait('@failedLogin');
    cy.contains('Invalid credentials');
  });
});
