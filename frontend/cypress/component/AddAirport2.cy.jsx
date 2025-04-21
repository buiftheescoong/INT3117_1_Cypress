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
  
    it('flaky: waits too little before checking input value', () => {
      mount(<AddAirport onSave={onSaveStub} onCancel={onCancelStub} />)
    
      cy.get('input[name="name"]').type('Tan Son Nhat')
    
      // giả sử input value cập nhật chưa kịp nếu app lag => test có thể fail
      cy.wait(50)
      cy.get('input[name="name"]').should('have.value', 'Tan Son Nhat')
    })
    
    // flaky test: random fail 30% of the time
    it('flaky: randomly fail with 30% chance', () => {
      if (Math.random() < 0.3) {
        expect(true).to.equal(false) // intentionally fail
      }
    })
    
    // flaky test: assume submit button is enabled immediately
    it('flaky: assumes submit button is enabled instantly', () => {
      mount(<AddAirport onSave={onSaveStub} onCancel={onCancelStub} />)
    
      cy.get('button[type="submit"]').should('not.be.disabled')
    })
    
    // flaky test: random delay before clicking submit
    it('flaky: random delay before clicking submit', () => {
      mount(<AddAirport onSave={onSaveStub} onCancel={onCancelStub} />)
    
      cy.get('input[name="name"]').type('Tan Son Nhat')
      cy.get('input[name="location"]').type('Ho Chi Minh')
      cy.get('input[name="code"]').type('SGN')
    
      const randomDelay = Math.floor(Math.random() * 1000)
      cy.wait(randomDelay)
    
      cy.get('button[type="submit"]').click()
      // giả sử nếu delay dài quá mà network intercept chưa setup kịp => fail
    })
    
    // flaky test: assert value immediately without retry
    it('flaky: check value immediately without retry', () => {
      mount(<AddAirport onSave={onSaveStub} onCancel={onCancelStub} />)
    
      cy.get('input[name="name"]').then(($input) => {
        expect($input.val()).to.equal('') // nếu chưa render xong có thể fail
      })
    })
  })