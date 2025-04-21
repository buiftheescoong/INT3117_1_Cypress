/// <reference types="cypress" />
import React from 'react';
import TicketBooking from '../../src/page/TicketBooking';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import * as reactRouterDom from 'react-router-dom';
import * as cloudinaryUtil from '../../src/utils/uploadImageToCloudinary';
import * as flightRequest from '../../src/clientRequest/GetSpecifiedFlightRequest';

describe('TicketBooking Component', () => {
    beforeEach(() => {
      // Stub localStorage in the app
      cy.window().then((win) => {
        win.localStorage.setItem('token', 'fake-token');
        win.localStorage.setItem('ClassTypes', JSON.stringify({
          Economy: { extra_fee: 0 },
          Business: { extra_fee: 100 },
        }));
      });
  
      // Intercept booking request or Stripe if needed
      cy.intercept('POST', '**/bookings/checkout-session/**', {
        statusCode: 200,
        body: { url: 'https://mocked.stripe.url' },
      }).as('mockCheckout');
  
      // Optionally intercept Stripe calls or suppress them
      cy.intercept('POST', 'https://m.stripe.com/**', { statusCode: 200 }).as('stripe');
    });
  
    it('renders TicketBooking and walks through steps', 
      () => {
      cy.mount(
        <MemoryRouter initialEntries={['/ticket-booking/123/Economy']}>
          <Routes>
            <Route path="/ticket-booking/:id/:classType" element={<TicketBooking />} />
          </Routes>
        </MemoryRouter>
      );
  
      // Step 1: Wait for loading to complete
      cy.contains('Seat Reservation').should('exist');
  
      // Fake selecting number of passengers (if input exists)
      cy.get('input[type="number"]').clear().type('1');
  
      // Try moving to next step
      cy.contains('Next').click();
  
      // Step 2: Fill traveler detail
      cy.contains('Traveller Details');
      cy.get('input[name="fullName"]').type('John Doe');
      cy.contains('Next').click();
  
      // Step 3: Review & Confirm
      cy.contains('Review');
      cy.contains('Confirm & Pay').click();
  
      // Should redirect or hit Stripe
      cy.wait('@mockCheckout');
    }
  );
  });