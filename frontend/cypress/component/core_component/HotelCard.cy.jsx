// HotelCards.cy.jsx
import React from 'react';
import { mount } from 'cypress/react';
import HotelCards from '../../../src/components/Card/HotelCards';

describe('HotelCards Component', () => {
  const mockData = {
    imageUrl: 'https://example.com/hotel.jpg',
    rating: 4.5,
    location: 'Paris',
    country: 'France',
  };

  it('renders hotel card with correct data', () => {
    mount(<HotelCards data={mockData} />);

    cy.get('img')
      .should('have.attr', 'src', mockData.imageUrl)
      .and('have.attr', 'alt', '');

    cy.contains(mockData.rating);
    cy.contains(mockData.location);
    cy.contains(mockData.country);
    cy.contains('Book Flight now').should('be.visible');
  });

  it('has correct button behavior and style', () => {
    mount(<HotelCards data={mockData} />);

    cy.get('button')
      .should('have.class', 'bg-[#00008B]')
      .and('contain.text', 'Book Flight now');
  });
});
