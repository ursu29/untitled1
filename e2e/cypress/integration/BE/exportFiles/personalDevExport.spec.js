import {
  exportUrl,
  getDevelopmentPlans,
  getEmployee,
} from '../../../support/getData'
import { email } from '../../../support/client/employeeData'

describe('export personal dev file', () => {
  let devPlan


  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee')))
        .then(res => {
        const {id} = res.body.data.employeeByEmail
        cy.post(getDevelopmentPlans(id))
          .then(req => devPlan = req.body.data.developmentPlans)
          })
      })

  it('successfully get the file', () => {
    cy.post(
      {plan: {...devPlan}},
        'superUser',
      exportUrl('export-development-plan')).then(res => {
      expect(res.status).equal(200)
      expect(res.body.length).to.be.greaterThan(0)
    })
  })
})