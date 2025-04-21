import React from 'react'
import Airports from '../../src/admin/Airports'
import { mount } from 'cypress/react'
import { MemoryRouter } from 'react-router-dom';

describe('Kiểm tra render giao diện và giả lập CRUD', () => {
  let dynamicAirports;

  beforeEach(() => {
   
    dynamicAirports = [
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

    // GET 
    cy.intercept('GET', '**/getAllAirports', (req) => {
      req.reply([...dynamicAirports]);
    }).as('getAirports');

    // POST 
    cy.intercept('POST', '**/addAirport', (req) => {
      const newAirport = {
        _id: Date.now().toString(), // Fake ID
        ...req.body,
      };
      dynamicAirports.push(newAirport);
      req.reply({ success: true });
    }).as('addAirport');

    // PUT 
    cy.intercept('PUT', '**/updateAirport/**', (req) => {
      const id = req.url.split('/').pop();
      dynamicAirports = dynamicAirports.map((airport) =>
        airport._id === id ? { ...airport, ...req.body } : airport
      );
      req.reply({ success: true });
    }).as('updateAirport');

    // DELETE 
    cy.intercept('DELETE', '**/deleteAirport/**', (req) => {
      const id = req.url.split('/').pop();
      dynamicAirports = dynamicAirports.filter((airport) => airport._id !== id);
      req.reply({ success: true });
    }).as('deleteAirport');
  });

  it('handles add, edit, and delete airports and updates UI', () => {
    mount(
      <MemoryRouter>
        <Airports />
      </MemoryRouter>
    );

    cy.wait('@getAirports');

    //add new airport
    cy.contains('+ New Airport').click();
    cy.get('input[name="code"]').type('HAN');
    cy.get('input[name="name"]').type('Noi Bai International');
    cy.get('input[name="location"]').type('Hanoi, Vietnam');
    cy.get('button[type="submit"]').click();

    cy.wait('@addAirport');
    cy.wait('@getAirports');
    cy.contains('HAN').should('exist');
    cy.contains('Noi Bai International').should('exist');

    //edit info
    cy.contains('Edit').first().click();
    cy.get('input[name="name"]').clear().type('JFK Updated Name');
    cy.get('button[type="submit"]').click();

    cy.wait('@updateAirport');
    cy.wait('@getAirports');
    cy.contains('JFK Updated Name').should('exist');

    //delete airport
    cy.contains('td', 'HAN')
      .parents('tr')
      .within(() => {
        cy.contains('Delete').click();
      });

    cy.wait('@deleteAirport');
    cy.wait('@getAirports');
    cy.contains('HAN').should('not.exist');
    cy.contains('Noi Bai International').should('not.exist');
  });
});

