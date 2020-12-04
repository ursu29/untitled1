import { createTraining } from '../../support/getData'
import { trainingData, ticket } from '../../support/client/training'
import { checkKeyValueExist } from '../../support/complexLocators'
import { agileManager } from '../../support/client/employeeData'

describe('Create/update training', () => {
  let getId
  const { responsible, title, description } = trainingData
  const { email, name, position } = agileManager

  context('', () => {
    before(() => {
      cy.setToken('employee')
      cy.visit('/onboarding')
    })
    it('Check permit by employee', () => {
      cy.post(createTraining(title, description, responsible)).then(res => {
        const { errors } = res.body

        expect(errors[0].message).equal('You have got no access')
      })
    })
  })

  context('Create new training', () => {
    before(() => {
      cy.setToken('manager')
      cy.visit('/onboarding')
    })

    it('Create training', () => {
      cy.post(createTraining(title, description, responsible), 'superUser').then(res => {
        const { data } = res.body
        const { id, __typename } = data.createOnboardingTicket

        expect(__typename).equal('OnboardingTicket')
        getId = id
      })
    })
  })

  context('Check all trainings response', () => {
    let response

    before(() => {
      cy.setToken('manager')
      cy.getResponse(['onboardingTickets'], 'alias')
      cy.visit('/onboarding')
      cy.wait(`@alias`).then(req => (response = req.response.body.data))
    })

    it('Check onboardingTickets request', () => {
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
})
