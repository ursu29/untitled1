import { checkKeyValueExist } from '../../../support/complexLocators'
import { ticket, trainingData } from '../../../support/client/training'
import { agileManager } from '../../../support/client/employeeData'
import { createTraining } from '../../../support/getData'

describe('get all trainings response', () => {
  let response
  let getId

  const { email, name, position } = agileManager
  const { responsible, title, description } = trainingData

  before(() => {
    cy.setToken('manager')
    cy.post(createTraining(title, description, responsible), 'superUser').then(res => {
      const { data } = res.body
      const { id } = data.createOnboardingTicket
      getId = id
    })
    cy.getResponse(['onboardingTickets'], 'alias')
    cy.visit('/onboarding')
    cy.wait(`@alias`).then(req => (response = req.response.body.data))
  })

  it('Check all trainings response', () => {
    const allId = response.onboardingTickets.map(el => el.id)
    const task = response.onboardingTickets.filter(el => el.id === getId)[0]
    const { description, id, responsible, title, __typename } = task

    checkKeyValueExist(ticket(getId), { description, id, title, __typename })
    checkKeyValueExist(responsible[0], {
      email,
      name,
      position,
      id: agileManager.id,
      __typename: agileManager.__typename,
    })
    expect(allId).includes(getId)
  })
})
