import {
  deleteDevrel,
  getDevRels,
  proposeDevRelEvent,
} from '../../../support/getData'
import { proposalObj } from '../../../support/complexLocators'

describe('create new proposal (devRel)', () => {
  let allDevRealsProposals;

  before(() => {
    cy.setToken('employee')
  })

  it('successfully created proposal from Event', () => {
    cy.post(proposeDevRelEvent(proposalObj)).then(req => {
      expect(req.body.data.proposeDevrelEvent).equal(true)
    })
  })


  it('decline proposal', () => {
    cy.post(getDevRels()).then(req => {
      allDevRealsProposals = req.body.data.devrels
      const ID = allDevRealsProposals.filter(el => el.title === proposalObj.title)[0].id

      cy.post(deleteDevrel(ID), 'superUser').then(req => {
        expect(req.body.data.deleteDevrel.id).equal(ID)
      })
    })
  })

  it('check count', () => {
    cy.post(getDevRels()).then(req => {
      expect(allDevRealsProposals.length).to.be.greaterThan(req.body.data.devrels.length)
    })
  })
});