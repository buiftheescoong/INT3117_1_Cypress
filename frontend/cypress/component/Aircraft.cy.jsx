import React from 'react'
import { mount } from 'cypress/react'
import axios from 'axios'

import { MemoryRouter } from 'react-router-dom';
import Aircrafts from '../../src/admin/Aircrafts';

describe('<Aircrafts />', () => {
  beforeEach(() => {
    // Stub the network requests to avoid calling real API
    cy.intercept('GET', 'http://localhost:5001/api/aircrafts/getAllAircrafts', {
      statusCode: 200,
      body: [
        {
          _id: '1',
          airlineCode: 'VN123',
          airlineManifacturing: 'Boeing',
          airlineLogo: 'https://example.com/logo.png',
          seatClasses: [
            { classType: 'Economy', seats: [1, 2, 3] },
            { classType: 'Business', seats: [4, 5] }
          ]
        }
      ]
    }).as('getAircrafts');

    cy.intercept('DELETE', 'http://localhost:5001/api/aircrafts/deleteAircraft/*', {
      statusCode: 200
    }).as('deleteAircraft');
  });

  it('renders aircraft list and handles delete', () => {
    mount(
      <MemoryRouter>
        <Aircrafts />
      </MemoryRouter>
    );

    cy.wait('@getAircrafts');

    cy.contains('VN123').should('exist');
    cy.contains('Boeing').should('exist');
    cy.contains('Economy: 3 seats').should('exist');
    cy.contains('Business: 2 seats').should('exist');

    // Delete action test
    cy.contains('Delete').click();
    cy.wait('@deleteAircraft');
  });
});
