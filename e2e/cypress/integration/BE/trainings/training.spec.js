import {createTraining, deleteTraining, getEmployee} from '../../../support/getData'
import { trainingData } from '../../../support/client/training'
import {email} from "../../../support/client/employeeData";

describe('Create/update training', () => {
  let allTrainingData

  before(() => {
    cy.setToken('manager')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data

      allTrainingData = trainingData(employeeByEmail.agileManager.id)

    })
  })

  it('Check permit by employee', () => {

    cy.post(createTraining(allTrainingData.title, allTrainingData.description, allTrainingData.responsible)).then(res => {
      const { errors } = res.body

      expect(errors[0].message).equal('You have got no access')
    })
  })

  it('Create new training', () => {
    cy.post(createTraining(allTrainingData.title, allTrainingData.description, allTrainingData.responsible), 'superUser').then(res => {
      const { data } = res.body
      const { __typename, id } = data.createOnboardingTicket

      expect(__typename).equal('OnboardingTicket')

      cy.post(deleteTraining(id), 'superUser')
    })
  })
})
