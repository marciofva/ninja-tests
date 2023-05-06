/// <reference types="Cypress" />

import Utils from '../support/helper'
import listDevicePage from '../page-objects/list-device-page'

const { faker } = require('@faker-js/faker')
const type = ["WINDOWS WORKSTATION", "WINDOWS SERVER", "MAC"]

let utils = new Utils()


describe('device management', () => {

  beforeEach(() => {
    cy.launchBrowser()
  })


  context('Test 1', () => {
    it('should display on UI all created devices from request GET /devices', () => {
      cy.getAllDevices().then(body => { body.forEach(function(item) {
          const { id, system_name, type, hdd_capacity } = item
          const devices_api = ''.concat(system_name, type, hdd_capacity)
          
          cy.get(listDevicePage.deviceInfo).then($el => {
            expect($el.text()).to.include(devices_api)
            expect($el.find('.device-name')).to.be.visible
            expect($el.find('.device-type')).to.be.visible
            expect($el.find('.device-capacity')).to.be.visible
          })
        })
      })
    })


    it('All devices should contain the edit and delete buttons', () => {
      cy.get(listDevicePage.deviceButton).each(($el) => {    
          expect($el.find('.device-edit')).to.be.visible
          expect($el.find('.device-remove')).to.be.visible
      })
    })
  })



  context('Test 2', () => {

    beforeEach(() => {
      cy.get(listDevicePage.addDeviceButtton)
      .click()
      .url()
      .should('include', `${Cypress.config().baseUrl}/devices/add`)
    })


    it('should create a new device and be visible on screen', () => {
      const deviceData = {
        systemName: `${faker.company.name()}-${utils.generateRandomNumber(100)}`.toUpperCase(),
        type: type[Math.floor(Math.random() * type.length)],
        hddCapacity: utils.generateRandomNumber(500)
      }

      cy.createDevice(deviceData).then(() => {
        const createdDevice = ''.concat(deviceData.systemName, deviceData.type, deviceData.hddCapacity)
        cy.get(listDevicePage.deviceInfo).then($el => {
          expect($el.text()).to.include(createdDevice)
        })
      })
    })
  })



  context('Test 3', () => {

    let deviceModel = {id:"", system_name:"", type:"", hdd_capacity:""}

    beforeEach(() => {
      cy.getAllDevices().then(body => {
        deviceModel = body[0]
      })
    })


    it('shoud rename device through request PUT /devices/:id', () => {

      const updatedData = {
        system_name: "Renamed Device",
        type: deviceModel.type,
        hdd_capacity: deviceModel.hdd_capacity
      }

      cy.updateDeviceByID(deviceModel.id, updatedData).then(() => {
          cy.getDeviceByID(deviceModel.id).then(body => {
            expect(body).to.not.empty
            expect(body.system_name).to.equal(updatedData.system_name)
          })
        })

        cy.reload().then(() => {
          cy.get(listDevicePage.deviceInfo).then($el => {
            expect($el.find('.device-name').first().text()).to.equal(updatedData.system_name)
          })
        })
    })
  })


  
  context('Test 4', () => {

    let deviceModel = {id:"", system_name:"", type:"", hdd_capacity:""}

    beforeEach(() => {
      cy.getAllDevices().then(body => {
        deviceModel = body[body.length-1]
      })
    })


    it('shoud delete device through request DELETE /devices/:id', () => {
      cy.log('device ID: ', deviceModel.id)
      cy.deleteDeviceByID(deviceModel.id).then(() => {
        cy.getDeviceByID(deviceModel.id).then((body) => {
          expect(body).to.empty
        })
      })

      cy.reload().then(() => {
        cy.get(listDevicePage.deviceInfo).then($el => {
          expect($el.find('.device-name').eq(-1).text()).to.not.equal(deviceModel.system_name)
        })
      })
    })
  })
})