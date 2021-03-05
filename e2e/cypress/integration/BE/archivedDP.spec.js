import { planData } from '../../support/client/devPlan'
import {email} from '../../support/client/employeeData'
import {getArchivedDPVersions, getEmployee} from '../../support/getData'

describe('check archivedDPVersions response', () => {
  let response

  beforeEach(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data

      cy.post(getArchivedDPVersions(employeeByEmail.id)).then(res => (response = res.body.data))
    })
  })

  it('Check archivedDPVersions', () => {
    const { archivedDPVersions } = response

    if (archivedDPVersions) {
      archivedDPVersions.forEach(el => {
        cy.compareObjectsKeys(el, planData)
        expect(el.__typename).equal(planData.__typename)
      })
      expect(archivedDPVersions).to.be.a('array')
    }
  })
})
