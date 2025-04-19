import React from 'react';
import Admin from '../../src/admin/Admin'; 
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'cypress/react';  

describe('<Admin />', () => {
  beforeEach(() => {
    // Mock API calls
    cy.intercept('GET', 'http://localhost:5001/api/promotions/getAllPromotions', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Promo 1' },
        { id: 2, name: 'Promo 2' },
      ],
    }).as('getPromotions');

    cy.intercept('GET', 'http://localhost:5001/api/aircrafts/getAllAircrafts', {
      statusCode: 200,
      body: [
        { id: 1, model: 'Aircraft 1' },
        { id: 2, model: 'Aircraft 2' },
      ],
    }).as('getAircrafts');

    cy.intercept('GET', 'http://localhost:5001/api/bookings/getAllBookings', {
      statusCode: 200,
      body: [
        { id: 1, flight: 'Flight 1' },
        { id: 2, flight: 'Flight 2' },
      ],
    }).as('getBookings');

    cy.intercept('GET', 'http://localhost:5001/api/flights/getAllFlights', {
      statusCode: 200,
      body: [
        { id: 1, flightNumber: 'FL123' },
        { id: 2, flightNumber: 'FL456' },
      ],
    }).as('getFlights');
    
    mount(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );
  });

  // it('renders Admin component with correct data', () => {
  //   cy.wait('@getPromotions');
  //   cy.wait('@getAircrafts');
  //   cy.wait('@getBookings');
  //   cy.wait('@getFlights');

  //   // Check if the page title is correct
  //   cy.get('h1').should('contain.text', 'Welcome back, Administrator!');

  //   // Check if the StatCard values are rendered correctly
  //   cy.get('[data-testid="statcard-flights"]')
  //     .should('contain.text', 'Total Flights')
  //     .and('contain.text', '2');  // Based on the mock data

  //   cy.get('[data-testid="statcard-bookings"]')
  //     .should('contain.text', 'Total Bookings')
  //     .and('contain.text', '2');  // Based on the mock data

  //   cy.get('[data-testid="statcard-aircrafts"]')
  //     .should('contain.text', 'Total Aircrafts')
  //     .and('contain.text', '2');  // Based on the mock data

  //   cy.get('[data-testid="statcard-promotions"]')
  //     .should('contain.text', 'Promotions')
  //     .and('contain.text', '2');  // Based on the mock data
  // });

  it('checks if API calls are made on component mount', () => {
    cy.wait('@getPromotions').its('request.url').should('include', 'getAllPromotions');
    cy.wait('@getAircrafts').its('request.url').should('include', 'getAllAircrafts');
    cy.wait('@getBookings').its('request.url').should('include', 'getAllBookings');
    cy.wait('@getFlights').its('request.url').should('include', 'getAllFlights');
  });

  it('renders the sidebar correctly', () => {
    cy.get('nav').should('exist'); // Assuming Sidebar has a <nav> element
  });
});
