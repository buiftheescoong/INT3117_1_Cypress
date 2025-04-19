// cypress/component/HeroSection.cy.jsx

import React from 'react';
import HeroSection from '../../../src/components/Home/HeroSection'; // Adjust path as needed
import '../../../src/index.css'; // Tailwind or global styles

describe('<HeroSection />', () => {
  beforeEach(() => {
    cy.mount(<HeroSection />);
  });

  it('renders the Swiper with multiple slides', () => {
    cy.get('.swiper').should('exist');
    cy.get('.swiper-slide').should('have.length.at.least', 5); // all slides rendered
  });

  it('renders the first slide content correctly', () => {
    cy.contains('Explore the sights of the Andaman and Nicobar Islands').should('exist');
    cy.contains('The place called heaven on earth').should('exist');
    cy.get('img')
        .first()
        .should('have.attr', 'src')
        .and('include', 'denmark-copenhagen'); // ✅ match part of actual URL
  
  });

  it('autoplays the slides', () => {
    cy.get('.swiper-slide-active')
      .first()
      .invoke('index')
      .then((initialIndex) => {
        cy.wait(10000); // longer than autoplay delay
        cy.get('.swiper-slide-active')
          .invoke('index')
          .should('not.eq', initialIndex); // confirms slide changed
      });
  });

});
