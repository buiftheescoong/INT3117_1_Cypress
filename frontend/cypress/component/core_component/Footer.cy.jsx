// cypress/component/Footer.cy.tsx

import React from 'react';
import Footer from '../../../src/components/Footer/Footer'; // Adjust path as needed
import '../../../src/index.css'; // Tailwind or global styles if required


import { mount } from 'cypress/react';


describe('<Footer />', () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });

  it('renders the main section headings', () => {
    cy.contains('Mahuco Airways').should('exist');
    cy.contains('Company').should('exist');
    cy.contains('Business Partners').should('exist');
    cy.contains('For businesses').should('exist');
  });

  it('renders important links', () => {
    cy.contains('About Us').should('have.attr', 'href', '#about');
    cy.contains('QA Duty Free').should('have.attr', 'href', '#dutyfree');
    cy.contains('QMICE: Meetings and Conferences').should('exist');
  });

  it('renders footer links like Terms of Use and Cookies', () => {
    cy.contains('Terms of Use').should('exist');
    cy.contains('Cookies').should('exist');
  });

  it('renders social media icons with correct aria-labels', () => {
    cy.get('[aria-label="Facebook"]').should('exist');
    cy.get('[aria-label="Twitter"]').should('exist');
    cy.get('[aria-label="LinkedIn"]').should('exist');
    cy.get('[aria-label="YouTube"]').should('exist');
  });

  it('renders award section with images and descriptions', () => {
    cy.get('img[alt="Award 1"]').should('exist');
    cy.contains("World's Best Airline").should('exist');
    cy.contains("Best Airline in the Middle East").should('exist');
  });

  it('displays the footer policy text', () => {
    cy.contains('Cookie Policy | Legal | Privacy | Accessibility | Optional Services and Fees').should('exist');
    cy.contains(/©\s*QAirline\. All Rights Reserved/).should('exist');

  });
});
