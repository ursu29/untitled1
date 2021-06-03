import { postRequest } from '../../api/requests'
import { codeOkAndBodyNotNull } from '../../support/utils'
import * as getData from '../../support/getData'
import * as data from '../../support/client/employeeData'
import {pastDay, todaysDate} from '../../support/officePlanner/officeDays'
import {getEmployee} from "../../support/getData";
import {email} from "../../support/client/employeeData";

describe('Check employee api (smoke)', () => {
  let employeeId
  let managerId

  const SECTION_COUNT = 7
  const FIRST_POSTS = 4

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data
      employeeId = employeeByEmail.id
      managerId = employeeByEmail.agileManager.id
    })
  })

  it.skip('Get projects', () => {
    cy.fixture('employee.json').then(body => {
      postRequest(body).then(response => {
        //we are using universal request here - when body doesn't need any replacements
        codeOkAndBodyNotNull(response)
        expect(response.body.data.projects).to.be.a('array')
      })
    })
  })

  it('check get Employee from graphql response', () => {
    cy.post(getData.getEmployee(data.email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data

      expect(employeeByEmail).to.deep.equal(data.employeesData(employeeId, managerId).employee)
    })
  })

  it('get Timemaster url', () => {
    cy.request(getData.TIMEMASTER).then(res => {
      expect(res.status).equal(200)
      expect(res.statusText).equal('OK')
    })
  })

  it('get getPosts', () => {
    cy.post(getData.getFirstPosts()).then(res => {
      const { posts } = res.body.data

      expect(posts.length).equal(FIRST_POSTS)
    })
  })

  it('check employee access to hidden page', () => {
    cy.post(getData.getEmployeeMatrices(employeeId)).then(res => {
      const { clientDevToolsAccess } = res.body.data

      expect(clientDevToolsAccess).equal(false)
    })
  })

  it('get wiki data', () => {
    cy.post(getData.getWikiRootSections()).then(res => {
      const { wikiRootSections } = res.body.data

      expect(wikiRootSections.length).equal(SECTION_COUNT)
    })
  })

  it('check on boarding access by employee', () => {
    cy.post(getData.getOnBoardingAccess()).then(res => {
      const {
        onboardingAccess: { read, write },
      } = res.body.data

      expect(read).equal(false)
      expect(write).equal(false)
    })
  })

  it('check guilds', () => {
    cy.post(getData.getGuildsTitle()).then(res => {
      const { guilds } = res.body.data

      expect(guilds.length).to.be.greaterThan(0)
    })
  })

  it('check vacancies', () => {
    cy.post(getData.getVacanciesId()).then(res => {
      const { vacancies } = res.body.data

      expect(vacancies.length).to.be.greaterThan(0)
    })
  })

  it('check apply days', () => {
    cy.post(getData.createOfficeBooking(todaysDate)).then(res => {
      const { createOfficeBooking } = res.body.data

      expect(createOfficeBooking).equal(true)
    })
  })

  it('check officce days', () => {
    cy.post(getData.getOfficeDays(pastDay, todaysDate)).then(res => {
      const { officeDays } = res.body.data

      expect(officeDays.length).to.be.greaterThan(0)
    })
  })
})
