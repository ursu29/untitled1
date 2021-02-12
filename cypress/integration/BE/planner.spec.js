import { checkKeyValueExist } from '../../support/complexLocators'
import { employeeData } from '../../support/client/employeeData'
import { day, getFirstDay, officeEmployee } from '../../support/officePlanner/officeDays'
import {checkTwoString} from "../../support/utils";
import {query} from "../../fixtures/query";

describe('Check Employees response', () => {
  let response
  let request
  const OPERATION_NAME = 'getOfficeDays'

  context('Employees response', () => {
    before(() => {
      cy.setToken('employee')
      cy.setImgToken('employee')

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
    before(() => {
      cy.setToken('employee')
      cy.getResponse([OPERATION_NAME], 'alias')
      cy.visit('/office-planner')
      cy.wait(`@alias`).then(val => {
        response = val.response.body.data
        request = val.request.body
      })
    })

    it('check request body', () => {
      checkTwoString(query.getOfficeDays, request.query)
      expect(request.operationName).equal(OPERATION_NAME)
    })

    it('getOfficeDays response', () => {
      const { officeDays } = response
      const allDate = officeDays.filter(el => el.location.code === 'saint_petersburg')
      const firstDay = allDate[0]

      const { __typename, date } = day(getFirstDay)

      expect(officeDays).to.be.a('array')
      expect(allDate.length).to.be.greaterThan(0)
      expect(date).equal(firstDay.date)
      expect(__typename).equal(firstDay.__typename)
      cy.compareObjectsKeys(day(getFirstDay), firstDay)
      cy.compareObjectsKeys(day(getFirstDay).location, firstDay.location)
    })
  })
})
