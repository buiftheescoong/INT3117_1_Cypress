import React from 'react'
import Airports from '../../src/admin/Airports'
import { mount } from 'cypress/react'
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom';

describe('Airports Component', () => {
    const fakeAirports = [
      {
        _id: '1',
        airportCode: 'JFK',
        airport: 'John F. Kennedy International Airport',
        nameLocation: 'New York, USA',
      },
      {
        _id: '2',
        airportCode: 'SGN',
        airport: 'Tan Son Nhat International Airport',
        nameLocation: 'Ho Chi Minh City, Vietnam',
      },
    ];
  
    beforeEach(() => {
      cy.intercept('GET', '**/getAllAirports', {
        statusCode: 200,
        body: fakeAirports,
      }).as('getAirports');
  
      cy.intercept('POST', '**/addAirport', {
        statusCode: 201,
        body: { success: true },
      }).as('addAirport');
  
      cy.intercept('PUT', '**/updateAirport/**', {
        statusCode: 200,
        body: { success: true },
      }).as('updateAirport');
  
      cy.intercept('DELETE', '**/deleteAirport/**', {
        statusCode: 200,
        body: { success: true },
      }).as('deleteAirport');
    });
  
    it('renders airport list and handles add/edit/delete', () => {
      mount(
        <MemoryRouter>
          <Airports />
        </MemoryRouter>
      );
  
      // Wait for airport list
      cy.wait('@getAirports');
  
      // Check content
      cy.contains('Manage Airports');
      cy.contains('JFK');
      cy.contains('Tan Son Nhat');
  
      // Open new form
      cy.contains('+ New Airport').click();
      cy.get('input[name="name"]').type('Noi Bai International');
      cy.get('input[name="location"]').type('Hanoi, Vietnam');
      cy.get('input[name="code"]').type('HAN');
      cy.get('button[type="submit"]').click();
      cy.wait('@addAirport');
      cy.wait('@getAirports');
  
      // Edit existing
      cy.contains('Edit').first().click();
      cy.get('input[name="name"]').clear().type('Updated Airport Name');
      cy.get('button[type="submit"]').click();
      cy.wait('@updateAirport');
      cy.wait('@getAirports');
  
      // Delete
      cy.contains('Delete').last().click();
      cy.wait('@deleteAirport');
      cy.wait('@getAirports');
    });
  });