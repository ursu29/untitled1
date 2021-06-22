import {process, skillEl} from '../../../support/locators'
import { popUp } from '../../../support/client/employeeData'
import { proposeDevRelEvent } from '../../../support/getData'
import { proposalObj } from '../../../support/complexLocators'

describe('decline propose (devRel)', () => {
  const {successMes} = skillEl

  before(() => {
    cy.setToken('manager')
    cy.post(proposeDevRelEvent(proposalObj)).then(req => {
      expect(req.body.data.proposeDevrelEvent).equal(true)
    })
  })

  it('successfully decline propose', () => {
    let proposeCount;
    cy.visit('/devrel')
    cy.getId(process.declineBtn).then(el => proposeCount = el.length)

    cy.getId(process.declineBtn).eq(0).click()
    cy.get(popUp.button).contains('Yes').click()

    cy.get(successMes).should('be.visible')
    cy.get(successMes).should('not.exist')

    cy.getId(process.declineBtn).then(el => {
      expect(proposeCount).to.be.greaterThan(el.length)
    })
  })
})