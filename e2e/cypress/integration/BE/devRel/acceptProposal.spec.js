import {
  acceptDevRel,
  getDevRels,
  proposeDevRelEvent,
} from '../../../support/getData'
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";
import { proposalObj } from '../../../support/complexLocators'

describe('accept new proposal (devRel)', () => {
  let allDevRealsProposals;

  before(() => {
    cy.setToken('employee')
    cy.post(proposeDevRelEvent(proposalObj)).then(req => {
      expect(req.body.data.proposeDevrelEvent).equal(true)
    })
  })

  it('accept proposal from Event', () => {
    cy.post(getDevRels()).then(req => {
      allDevRealsProposals = req.body.data.devrels
      const ID = allDevRealsProposals.filter(el => el.title === proposalObj.title)[0].id

      cy.post(acceptDevRel(ID)).then(req => expect(req.body.data.acceptDevrel.id).equal(ID))
    })
  })

  it('check accept event', () => {
    cy.post(getDevRels()).then(req => {
      const getPrevEvent = req.body.data.devrels.filter(el => el.title === proposalObj.title)
      const {isDraft, link, dateEnd, dateStart} = getPrevEvent[0]

      expect(isDraft).equal(false)
      expect(link).equal(proposalObj.link)
      expect(dateEnd).equal(todaysDate)
      expect(dateStart).equal(pastDay)
    })
  })
});