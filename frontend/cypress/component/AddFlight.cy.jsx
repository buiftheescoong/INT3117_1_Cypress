// cypress/component/AddFlight.cy.jsx
import React from 'react'
import AddFlight from '../../src/admin/AddFlight'
import { mount } from 'cypress/react'
import axios from 'axios'

describe('<AddFlight />', () => {
    let onSaveStub
    let onCancelStub
  
    const aircraftsMock = [
      { _id: 'ac1', airlineCode: 'VN123' },
      { _id: 'ac2', airlineCode: 'VJ456' }
    ]
  
    const locationsMock = [
      { _id: 'loc1', nameLocation: 'Hanoi', airportCode: 'HAN' },
      { _id: 'loc2', nameLocation: 'Ho Chi Minh', airportCode: 'SGN' }
    ]
  
    beforeEach(() => {
      // ✅ move cy.stub() inside this hook
      onSaveStub = cy.stub().as('onSave')
      onCancelStub = cy.stub().as('onCancel')
  
      cy.intercept('GET', 'http://localhost:5001/api/aircrafts/getAllAircrafts', {
        body: aircraftsMock
      }).as('getAircrafts')
  
      cy.intercept('GET', 'http://localhost:5001/api/airports/getAllAirports', {
        body: locationsMock
      }).as('getLocations')
  
      mount(<AddFlight onSave={onSaveStub} onCancel={onCancelStub} />)
  
      cy.wait('@getAircrafts')
      cy.wait('@getLocations')
    })
  
    it('fills out and submits the form', () => {
      cy.get('input[name="flightNumber"]').type('VN1234')
      cy.get('select[name="aircraft"]').select('VN123')
      cy.get('select[name="departureLocation"]').select('Hanoi (HAN)')
      cy.get('select[name="arrivalLocation"]').select('Ho Chi Minh (SGN)')
      cy.get('input[name="departureTime"]').type('2025-04-25T10:30')
      cy.get('input[name="arrivalTime"]').type('2025-04-25T12:30')
      cy.get('input[name="basePrice"]').type('500')
  
      cy.intercept('POST', 'http://localhost:5001/api/flights/addFlight', {
        statusCode: 200
      }).as('addFlight')
  
      cy.get('button[type="submit"]').click()
  
      cy.wait('@addFlight').then(() => {
        cy.get('@onSave').should('have.been.calledWithMatch', {
          flightNumber: 'VN1234',
          aircraft: 'ac1',
          departureLocation: 'loc1',
          arrivalLocation: 'loc2',
          departureTime: '2025-04-25T10:30',
          arrivalTime: '2025-04-25T12:30',
          basePrice: '500'
        })
      })
    })
  
    it('cancels the form', () => {
      cy.get('button').contains('Cancel').click()
      cy.get('@onCancel').should('have.been.called')
    })
  })