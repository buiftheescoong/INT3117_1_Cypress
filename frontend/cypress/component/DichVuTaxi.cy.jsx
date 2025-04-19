import React from 'react';
import DichVuTaxi from '../../src/page/DichVuTaxi';

describe('DichVuTaxi component', () => {
  beforeEach(() => {
    cy.mount(<DichVuTaxi />);
  });

  it('renders the title', () => {
    cy.contains('h1', 'Taxi Service').should('be.visible');
  });

  it('renders the guide headers', () => {
    cy.contains('h2', 'GUIDE TO BOOKING AND USING AIRPORT PICK-UP TAXI SERVICE').should('be.visible');
    cy.contains('strong', 'I. Guide to booking the service:').should('be.visible');
    cy.contains('strong', 'II. Guide to using the service:').should('be.visible');
    cy.contains('strong', 'III. Instructions for customers to reach the Green Taxi SM airport pick-up points:').should('be.visible');
    cy.contains('strong', 'IV. Terms and Conditions:').should('be.visible');
  });

  it('renders the airport table with all locations', () => {
    cy.get('table').should('be.visible');
    cy.contains('td', 'Noi Bai Airport').should('exist');
    cy.contains('td', 'Tan Son Nhat Airport').should('exist');
    cy.contains('td', 'Phu Bai Airport').should('exist');
    cy.contains('td', 'Da Nang Airport').should('exist');
    cy.contains('td', 'Cam Ranh Airport').should('exist');
    cy.contains('td', 'Phu Quoc Airport').should('exist');
  });

  it('displays contact information correctly', () => {
    cy.contains('h3', 'Contact Information for XANH SM:').should('be.visible');
    cy.contains('strong', 'Customer Service Hotline:').should('be.visible');
    cy.contains('strong', 'Email:').should('be.visible');
    cy.get('a[href="mailto:cskh@xanhsm.com"]').should('have.text', 'cskh@xanhsm.com');
  });


  //css
  it('has proper spacing between sections', () => {
    cy.get('section').each(($section) => {
      expect($section).to.have.class('mb-6');
    });
  });
  
});
