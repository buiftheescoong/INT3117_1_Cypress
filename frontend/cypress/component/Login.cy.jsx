import React from 'react';
import Login from '../../src/page/Login';
import { authContext } from '../../src/context/authContext';
import { MemoryRouter } from 'react-router-dom';

describe('Kiểm thử form login', () => {

  beforeEach(() => {
    const dispatch = cy.stub().as('dispatch');

    cy.mount(
      <authContext.Provider value={{ dispatch }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </authContext.Provider>
    );
  });

  it('Hiển thị form login', () => {
    cy.get('h1').should('contain.text', 'Login to your account');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button#Login').should('contain.text', 'Login');
  });

  it('Hiển thị lỗi bỏ trống trường thông tin', () => {
    cy.get('button#Login').click();
    cy.contains('Email is required', { timeout: 1000 }); 
  });

  it('Kiểm tra format email không hợp lệ', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('secret');
    cy.get('button#Login').click();
    cy.contains('Invalid email format');
  });
});
