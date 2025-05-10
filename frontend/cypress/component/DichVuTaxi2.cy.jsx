import React from 'react';
import DichVuTaxi from '../../src/page/DichVuTaxi';

describe('DichVuTaxi component', () => {
  beforeEach(() => {
    cy.mount(<DichVuTaxi />);
  });

  it('flaky: randomly delay check for title', () => {
    const randomDelay = Math.random() * 1000;
    cy.wait(randomDelay);
    cy.contains('h1', 'Taxi Service').should('be.visible');
  });
  
  it('flaky: check guide header before render sometimes', () => {
    // Không wait mà check luôn
    cy.contains('h2', 'GUIDE TO BOOKING AND USING AIRPORT PICK-UP TAXI SERVICE');
  });
  
  it('flaky: randomly skip assertion on table rows', () => {
    const skipAssertion = Math.random() > 0.5;
    if (!skipAssertion) {
      cy.get('table').should('be.visible');
      cy.contains('td', 'Noi Bai Airport').should('exist');
    }
  });
  
  it('flaky: check CSS spacing too soon after mount', () => {
    cy.get('section').then(($sections) => {
      // Random delay nhỏ trước khi kiểm tra class
      const randomDelay = Math.random() * 500;
      cy.wait(randomDelay);
      $sections.each((_, section) => {
        expect(section.classList.contains('mb-6')).to.be.true;
      });
    });
  });
  
  it('flaky: sometimes skip contact email check', () => {
    if (Math.random() > 0.6) {
      cy.get('a[href="mailto:cskh@xanhsm.com"]').should('have.text', 'cskh@xanhsm.com');
    }
  });
  
});
