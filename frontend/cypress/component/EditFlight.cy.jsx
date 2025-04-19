import React from 'react'
import EditFlight from '../../src/admin/EditFlight'
import { mount } from 'cypress/react'
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom';

describe('<EditFlight />', () => {
    const mockFlight = {
        _id: 'flight123',
        departDate: { date: '2025-04-20', time: '10:30' }, // <-- use 24h format here
        arriveDate: { date: '2025-04-20', time: '14:15' },
      };
      
  
    beforeEach(() => {
      cy.intercept('PUT', `http://localhost:5001/api/flights/updateFlight/${mockFlight._id}`, {
        statusCode: 200,
      }).as('updateFlight');
    });
  
    it('renders and updates flight time', () => {
      const onSave = cy.stub().as('onSave');
      const onCancel = cy.stub().as('onCancel');
  
      mount(<EditFlight flight={mockFlight} onSave={onSave} onCancel={onCancel} />);
  
      // Check if datetime inputs are pre-filled
      cy.get('input[type="datetime-local"]').first().should('have.value', '2025-04-20T10:30');
      cy.get('input[type="datetime-local"]').eq(1).should('have.value', '2025-04-20T14:15');
  
      // Change times
      cy.get('input[type="datetime-local"]').first().clear().type('2025-04-21T09:45');
      cy.get('input[type="datetime-local"]').eq(1).clear().type('2025-04-21T12:00');
  
      // Submit
      cy.contains('Save').click();
      cy.wait('@updateFlight');
      cy.get('@onSave').should('have.been.calledOnce');
    });
  
    it('cancels editing', () => {
      const onSave = cy.stub().as('onSave');
      const onCancel = cy.stub().as('onCancel');
  
      mount(<EditFlight flight={mockFlight} onSave={onSave} onCancel={onCancel} />);
      cy.contains('Cancel').click();
      cy.get('@onCancel').should('have.been.calledOnce');
    });
  });