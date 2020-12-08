import { checkKeyValueExist } from '../../support/complexLocators'
import { employeeData } from '../../support/client/employeeData'
import { day, getFirstDay, officeEmployee } from '../../support/officePlanner/officeDays'

describe('Check Employees response', () => {
  let response

  context('Employees response', () => {
    before(() => {
      cy.setToken('employee')
      cy.getResponse(['getEmployees'], 'alias')
      cy.visit('/office-planner')
      cy.wait(`@alias`).then(val => (response = val.response.body.data))
    })

    it('Check Employees response', () => {
      const { employees, officeAccess, profile } = response
      const { id, location, __typename } = employeeData.employee
      const firstEmployee = employees[0]

      expect(employees).to.be.a('array')
      expect(firstEmployee.worksFromOffice).to.be.a('array')

      cy.compareObjectsKeys(officeEmployee, firstEmployee)
      checkKeyValueExist({ read: true, write: false, __typename: 'Access' }, officeAccess)
      checkKeyValueExist({ id, location, __typename }, profile)
    })
  })

  context('getOfficeDays', () => {
    beforeEach(() => {
      cy.setToken('employee')
      cy.getResponse(['getOfficeDays'], 'alias')
      cy.visit('/office-planner')
      cy.wait(`@alias`).then(val => (response = val.response.body.data))
    })

    it('getOfficeDays response', () => {
      const { officeDays } = response
      const firstDay = officeDays[0]
      const { __typename, date } = day(getFirstDay)

      expect(officeDays).to.be.a('array')
      expect(officeDays.length).equal(8)
      expect(date).equal(firstDay.date)
      expect(__typename).equal(firstDay.__typename)
      cy.compareObjectsKeys(day(getFirstDay), firstDay)
      cy.compareObjectsKeys(day(getFirstDay).location, firstDay.location)
    })
  })
})
