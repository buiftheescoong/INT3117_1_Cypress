import React from 'react';
import Footer from '../../../src/components/Footer/Footer'; 
import '../../../src/index.css'; 


describe('Kiểm thử thành phần Footer', () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });

  it('Hiển thị tiêu đề chính', () => {
    cy.contains('Mahuco Airways').should('exist');
    cy.contains('Company').should('exist');
    cy.contains('Business Partners').should('exist');
    cy.contains('For businesses').should('exist');
  });

  it('Hiển thị đường dẫn chính', () => {
    cy.contains('About Us').should('have.attr', 'href', '#about');
    cy.contains('QA Duty Free').should('have.attr', 'href', '#dutyfree');
    cy.contains('QMICE: Meetings and Conferences').should('exist');
  });

  it('Hiển thị đường dẫn trong footer', () => {
    cy.contains('Terms of Use').should('exist');
    cy.contains('Cookies').should('exist');
  });


  it('Hiển thị mô tả chứng nhận và giải thưởng', () => {
    cy.get('img[alt="Award 1"]').should('exist');
    cy.contains("World's Best Airline").should('exist');
    cy.contains("Best Airline in the Middle East").should('exist');
  });

  it('Hiển thị chính sách sử dụng', () => {
    cy.contains('Cookie Policy | Legal | Privacy | Accessibility | Optional Services and Fees').should('exist');
    cy.contains(/©\s*QAirline\. All Rights Reserved/).should('exist');

  });
});

