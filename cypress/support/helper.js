/// <reference types="Cypress" />


let Utils = function(){

    this.generateRandomNumber = function(maxNumber){
        return Math.floor(Math.random() * maxNumber) + 1
    }
}
export default Utils