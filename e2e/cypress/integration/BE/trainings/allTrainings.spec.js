import { checkKeyValueExist } from '../../../support/complexLocators'
import { ticket, trainingData } from '../../../support/client/training'
import { email} from '../../../support/client/employeeData'
import {createTraining, deleteTraining, getEmployee} from '../../../support/getData'
import { postEl } from '../../../support/locators'
import { checkTwoString } from '../../../support/utils'
import { query } from '../../../fixtures/query'

describe('get all trainings response', () => {
  let response
  let request
  let managerId
  let getId

  before(() => {
    cy.setToken('manager')

    cy.post(getEmployee(email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data
      managerId = employeeByEmail.agileManager.id
    })
    const { responsible, title, description } = trainingData(managerId)

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

  beforeEach(() => {
    cy.addHeadersAuth()
  })
  afterEach(() => {
    cy.addHeadersAuth()
  })

  it('Check all trainings response', () => {
    checkTwoString(query.onboardingTickets, request.query)
    expect(request.operationName).equal('onboardingTickets')

    const allId = response.onboardingTickets.map(el => el.id)
    const task = response.onboardingTickets.filter(el => el.id === getId)[0]
    const { description, id, title, __typename } = task

    checkKeyValueExist(ticket(true, false, getId, managerId), { description, id, title, __typename })

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
