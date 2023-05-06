
/// <reference types="Cypress" />

import deviceDetailPage from '../page-objects/device-details-page'
import listDevicePage from '../page-objects/list-device-page'


Cypress.Commands.add('launchBrowser', () => {
    cy.visit('/')
    .title()
    .should('include', 'React App')
})


Cypress.Commands.add('createDevice', (data) => {
    cy.get(deviceDetailPage.systemNameInput).focus().type(data.systemName)
    cy.get('select').select(data.type)
    cy.get(deviceDetailPage.hddCapacityInput).focus().type(data.hddCapacity)
    cy.get(deviceDetailPage.saveDeviceButtton).click().wait(1000)
    cy.get(listDevicePage.addDeviceButtton).should('be.visible')
})
