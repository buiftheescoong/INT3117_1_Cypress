// SearchedFlightCards.cy.jsx
import React from 'react';
import { mount } from 'cypress/react';
import SearchedFlightCards from '../../../src/components/Card/SearchedFlightCards';

describe('SearchedFlightCards Component', () => {
  const mockFlight = {
    airline: {
      airlineLogo: 'https://example.com/logo.png',
    },
    departTime: '10:30',
    departDate: '2025-04-20T00:00:00.000Z',
    arriveTime: '14:45',
    arriveDate: '2025-04-20T00:00:00.000Z',
    price: 5500,
  };

  it('renders flight card with correct information', () => {
    mount(<SearchedFlightCards flight={mockFlight} />);

    cy.get('img').should('have.attr', 'src', mockFlight.airline.airlineLogo);

    cy.contains('Depart');
    cy.contains(mockFlight.departTime);
    cy.contains('20 Apr 2025'); // formatted departure date

    cy.contains('Arrive');
    cy.contains(mockFlight.arriveTime);
    cy.contains('20 Apr 2025'); // formatted arrival date

    cy.contains('Price');
    cy.contains(`₹ ${mockFlight.price}`);

    cy.contains('4h 15m'); // calculated duration from 10:30 to 14:45
  });

  it('has expected layout classes', () => {
    mount(<SearchedFlightCards flight={mockFlight} />);

    cy.get('.cursor-pointer').should('exist');
    cy.get('.hover\\:shadow-lg').should('exist');
    cy.get('.text-blue-500').should('contain.text', '4h 15m');
  });
});
