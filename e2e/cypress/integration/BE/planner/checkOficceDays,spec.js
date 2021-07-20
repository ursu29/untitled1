import { checkTwoString } from '../../../support/utils'
import { query } from '../../../fixtures/query'
import { mainCity } from '../../../support/locators'
import { day, getFirstDay } from '../../../support/officePlanner/officeDays'

describe('getOfficeDays', () => {
  const OPERATION_NAME = 'getOfficeDays'
  let response, request

  before(() => {
    cy.setToken('employee')
    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit('/office-planner')
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('getOfficeDays response', () => {
    checkTwoString(query.getOfficeDays, request.query)
    expect(request.operationName).equal(OPERATION_NAME)

    const { officeDays } = response
    const allDate = officeDays.filter(el => el.location === mainCity)
    const firstDay = allDate[0]

    const { __typename } = day(getFirstDay)

    expect(officeDays).to.be.a('array')
    expect(allDate.length).to.be.greaterThan(0)
    expect(__typename).equal(firstDay.__typename)
    cy.compareObjectsKeys(day(getFirstDay), firstDay)
    cy.compareObjectsKeys(day(getFirstDay).location, firstDay.location)
  })
})