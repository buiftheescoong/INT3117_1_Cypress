import React from 'react';
import BookHome from '../../../src/components/BookHome';
import FindingAirLineBar1 from "../../../src/components/FindingAirLine/FindingAirLineBar1";
import { mount } from 'cypress/react';

describe('BookHome Component', () => {
    let mockFormData;
    let mockSetFormData;
    let mockHandleFormDataChange;
    let mockHandleFlightSearch;
  
    beforeEach(() => {
      // Set up mocks before each test
      mockFormData = { /* mock initial formData state */ };
      mockSetFormData = cy.stub();
      mockHandleFormDataChange = cy.stub();
      mockHandleFlightSearch = cy.stub();
  
      // Mount the component
      cy.mount(
        <BookHome 
          formData={mockFormData}
          setFormData={mockSetFormData}
          handleFormDataChange={mockHandleFormDataChange}
          handleFlightSearch={mockHandleFlightSearch}
        />
      );
    });
  
    it('should render the BookHome component correctly', () => {
      // Check if the radio buttons and other elements are rendered
      cy.get('input[type="radio"]').should('have.length', 2); // 2 radio buttons (one-way, return)
      cy.get('label').contains('One way').should('exist');
      cy.get('label').contains('Return').should('exist');
    });
  
    it('should update the state when radio button changes', () => {
      // Simulate selecting "One way"
      cy.get('input[type="radio"][value="oneWay"]').check();
      cy.get('input[type="radio"][value="oneWay"]').should('be.checked');
      
      // Simulate selecting "Return"
      cy.get('input[type="radio"][value="return"]').check();
      cy.get('input[type="radio"][value="return"]').should('be.checked');
    });
  
   
  });
  