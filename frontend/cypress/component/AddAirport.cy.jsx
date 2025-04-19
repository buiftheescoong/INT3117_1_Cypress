// cypress/component/AddFlight.cy.jsx
import React from 'react'
import AddAirport from '../../src/admin/AddAirport'
import { mount } from 'cypress/react'
import axios from 'axios'

describe('<AddAirport />', () => {
    let onSaveStub
    let onCancelStub
  
    beforeEach(() => {
      onSaveStub = cy.stub().as('onSave')
      onCancelStub = cy.stub().as('onCancel')
    })
  
    it('adds a new airport', () => {
      cy.intercept('POST', 'http://localhost:5001/api/airports/addAirport', {
        statusCode: 200,
      }).as('addAirport')
  
      mount(<AddAirport onSave={onSaveStub} onCancel={onCancelStub} />)
  
      cy.get('input[name="name"]').type('Tan Son Nhat')
      cy.get('input[name="location"]').type('Ho Chi Minh')
      cy.get('input[name="code"]').type('SGN')
  
      cy.get('button[type="submit"]').click()
  
      cy.wait('@addAirport').its('request.body').should('deep.equal', {
        airport: 'Tan Son Nhat',
        nameLocation: 'Ho Chi Minh',
        airportCode: 'SGN',
      })
  
      cy.get('@onSave').should('have.been.calledWith', {
        name: 'Tan Son Nhat',
        location: 'Ho Chi Minh',
        code: 'SGN',
      })
    })
  
    it('edits an existing airport', () => {
      const initialData = {
        _id: 'airport123',
        airport: 'Noi Bai',
        nameLocation: 'Hanoi',
        airportCode: 'HAN',
      }
  
      cy.intercept('PUT', `http://localhost:5001/api/airports/updateAirport/${initialData._id}`, {
        statusCode: 200,
      }).as('updateAirport')
  
      mount(<AddAirport onSave={onSaveStub} onCancel={onCancelStub} initialData={initialData} />)
  
      // Change name from "Noi Bai" to "Noi Bai Intl"
      cy.get('input[name="name"]').clear().type('Noi Bai Intl')
      cy.get('input[name="location"]').clear().type('Hanoi City')
      cy.get('input[name="code"]').clear().type('HAN')
  
      cy.get('button[type="submit"]').click()
  
      cy.wait('@updateAirport').its('request.body').should('deep.equal', {
        airport: 'Noi Bai Intl',
        nameLocation: 'Hanoi City',
        airportCode: 'HAN',
      })
  
      cy.get('@onSave').should('have.been.calledWith', {
        name: 'Noi Bai Intl',
        location: 'Hanoi City',
        code: 'HAN',
      })
    })
  
    it('cancels the form', () => {
      mount(<AddAirport onSave={onSaveStub} onCancel={onCancelStub} />)
  
      cy.get('button').contains('Cancel').click()
  
      cy.get('@onCancel').should('have.been.called')
    })
  })