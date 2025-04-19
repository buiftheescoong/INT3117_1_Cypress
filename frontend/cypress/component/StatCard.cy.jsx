import React from "react";
import { mount } from 'cypress/react';
import StatCard from "../../src/admin/components/StatCard";


describe("<StatCard />", () => {
  it("renders value and label correctly", () => {
    mount(<StatCard value={42} label="Total Bookings" />);
    cy.contains("42").should("exist");
    cy.contains("Total Bookings").should("exist");
  });

  it("supports negative values", () => {
    mount(<StatCard value={-10} label="Cancellations" />);
    cy.contains("-10").should("exist");
    cy.contains("Cancellations").should("exist");
  });

  it("renders large numbers properly", () => {
    mount(<StatCard value={1000000} label="Passengers" />);
    cy.contains("1000000").should("exist");
  });

  it("has expected styling", () => {
    mount(<StatCard value={99} label="Flights" />);
    cy.get("div").should("have.class", "bg-blue-100");
    cy.get("h2").should("have.class", "text-4xl");
    cy.get("p").should("have.class", "text-lg");
  });

});
