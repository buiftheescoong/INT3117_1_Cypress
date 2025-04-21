import React from 'react';
import LetGetToKnow from '../../../src/components/Home/LetGetToKnow';
import { mount } from 'cypress/react';

describe('LetGetToKnow component', () => {
    beforeEach(() => {
      mount(<LetGetToKnow />);
    });
  
    it('displays the correct heading', () => {
      cy.contains('Find special prices to favorite destinations').should('exist');
    });
  
    it('renders the "Book now" button', () => {
      cy.get('button').contains('Book now').should('exist');
    });
  
    it.skip('applies the background image via computed style', () => {
      cy.get('div')
        .first()
        .should('have.css', 'background-image')
        .and('include', 'big-clound-seascape-view-airplane-window');
    });
  
    it('has a gradient overlay somewhere visible', () => {
      cy.get('div')
        .filter(':visible')
        .should('exist')
        .then(($els) => {
          const hasGradient = Array.from($els).some((el) =>
            getComputedStyle(el).backgroundImage.includes('linear-gradient')
          );
          expect(hasGradient).to.be.true;
        });
    });
  });