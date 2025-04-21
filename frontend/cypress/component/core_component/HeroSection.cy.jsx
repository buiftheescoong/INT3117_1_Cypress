import React from 'react';
import HeroSection from '../../../src/components/Home/HeroSection'; 
import '../../../src/index.css'; 

describe('Kiểm thử Slider', () => {
  beforeEach(() => {
    cy.mount(<HeroSection />);
  });

  it('Hiển thị thanh trượt để xem slide', () => {
    cy.get('.swiper').should('exist');
    cy.get('.swiper-slide').should('have.length.at.least', 5);
  });

  it('Hiển thị slide đầu tiên với nội dung chính xác', () => {
    cy.contains('Explore the sights of the Andaman and Nicobar Islands').should('exist');
    cy.contains('The place called heaven on earth').should('exist');
    cy.get('img')
        .first()
        .should('have.attr', 'src')
        .and('include', 'denmark-copenhagen'); 
  
  });

  it('Tự động chuyển slide', () => {
    cy.get('.swiper-slide-active')
      .first()
      .invoke('index')
      .then((initialIndex) => {
        cy.wait(1000); 
        cy.get('.swiper-slide-active')
          .invoke('index')
          .should('not.eq', initialIndex);
      });
  });

});

