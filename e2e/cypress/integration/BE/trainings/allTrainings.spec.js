import { checkKeyValueExist } from '../../../support/complexLocators'
import { ticket, trainingData } from '../../../support/client/training'
import { agileManager } from '../../../support/client/employeeData'
import { createTraining, deleteTraining } from '../../../support/getData'
import { postEl } from '../../../support/locators'
import { checkTwoString } from '../../../support/utils'
import { query } from '../../../fixtures/query'

describe('get all trainings response', () => {
  let response
  let request
  let getId

  const { email, name, position } = agileManager
  const { responsible, title, description } = trainingData

  before(() => {
    cy.setToken('manager')
    cy.post(createTraining(title, description, responsible, true), 'superUser').then(res => {
      const { data } = res.body
      const { id } = data.createOnboardingTicket
      getId = id
    })
    cy.getResponse(['onboardingTickets'], 'alias')
    cy.visit('/onboarding')
    cy.wait(`@alias`).then(req => {
      response = req.response.body.data
      request = req.request.body
    })
  })

  it('check request body', () => {
    checkTwoString(query.onboardingTickets, request.query)
    expect(request.operationName).equal('onboardingTickets')
  })

  it('Check all trainings response', () => {
    const allId = response.onboardingTickets.map(el => el.id)
    const task = response.onboardingTickets.filter(el => el.id === getId)[0]
    const { description, id, responsible, title, __typename } = task

    checkKeyValueExist(ticket(true, false, getId), { description, id, title, __typename })
    checkKeyValueExist(responsible[0], {
      email,
      name,
      position,
      id: agileManager.id,
      __typename: agileManager.__typename,
    })

    expect(allId).includes(getId)
    cy.get(postEl.button).eq(0).should('contain.text', 'Request training')
  })

  it('delete ticket', () => {
    cy.post(deleteTraining(getId)).then(req => {
      const { errors } = req.body

      expect(errors[0].message).equal('You have got no access')
    })
    cy.post(deleteTraining(getId), 'superUser').then(req => {
      const { data } = req.body

      expect(data.deleteOnboardingTicket.id).equal(getId)
    })
  })
})
