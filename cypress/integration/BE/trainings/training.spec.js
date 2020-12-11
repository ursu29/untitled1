import { createTraining, deleteTraining } from '../../../support/getData'
import { trainingData } from '../../../support/client/training'

describe('Create/update training', () => {
  const { responsible, title, description } = trainingData

  before(() => {
    cy.setToken('manager')
    cy.visit('/')
    cy.addRole()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Check permit by employee', () => {
    cy.post(createTraining(title, description, responsible)).then(res => {
      const { errors } = res.body

      expect(errors[0].message).equal('You have got no access')
    })
  })

  it('Create new training', () => {
    cy.post(createTraining(title, description, responsible), 'superUser').then(res => {
      const { data } = res.body
      const { __typename, id } = data.createOnboardingTicket

      expect(__typename).equal('OnboardingTicket')

      cy.post(deleteTraining(id), 'superUser')
    })
  })
})
