// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
/// <reference types="Cypress" />

import 'cypress-plugin-api'

const API_URL = Cypress.env('API_BASE_URL')


Cypress.Commands.add('getAllDevices', () => {
    cy.api({
        method: 'GET',
        url: `${API_URL}/devices`      
    }).should((response) => {
        expect(response.status).to.eq(200)
    }).then(response => {
        return response.body
    })
})


Cypress.Commands.add('updateDeviceByID', (id, data) => {
    cy.api({
        method: 'PUT',
        url: `${API_URL}/devices/${id}`,
        body: data     
    }).should((response) => {
        expect(response.status).to.eq(200)
    })
})


Cypress.Commands.add('getDeviceByID', (id) => {
    cy.api({
        method: 'GET',
        url: `${API_URL}/devices/${id}`    
    }).should((response) => {
        expect(response.status).to.eq(200)
    }).then(response => {
        return response.body
    })
})


Cypress.Commands.add('deleteDeviceByID', (id, data) => {
    cy.api({
        method: 'DELETE',
        url: `${API_URL}/devices/${id}`,
        body: data     
    }).should((response) => {
        expect(response.status).to.eq(200)
    })
})
