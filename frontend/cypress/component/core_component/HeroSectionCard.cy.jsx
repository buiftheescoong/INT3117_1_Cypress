
import React from 'react';
import HeroSectionCard from '../../../src/components/Home/HeroSectionCard'; // Adjust path as needed
import '../../../src/index.css'; // Tailwind or global styles
import { mount } from 'cypress/react';

const testData = {
    heading: 'Test Heading for Hero Section',
    subheading: 'This is a test subheading',
    src: 'https://example.com/test-image.jpg',
  };
  
  describe('HeroSectionCard component', () => {
    beforeEach(() => {
      mount(<HeroSectionCard {...testData} />);
    });
  
    it('renders the heading and subheading correctly', () => {
      cy.contains(testData.heading).should('exist');
      cy.contains(testData.subheading).should('exist');
    });
  
    it('renders the background image with correct src', () => {
      cy.get('img')
        .should('have.attr', 'src')
        .and('include', 'test-image.jpg');
    });
  
    it('renders the "Book now" button', () => {
      cy.get('button').contains('Book now').should('exist');
    });
  });