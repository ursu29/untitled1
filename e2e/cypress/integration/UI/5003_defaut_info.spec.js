import { tabs, workspace } from '../../support/locators'
import {email} from '../../support/client/employeeData'
import {getClient, getEmployee, getEmployeeExperiences, getProjects} from "../../support/getData";

describe('Checking default information (e2e)', () => {
  let userId
  let allData = {
    client: null,
    manager: null,
    projects: null,
    levels: null,
  }

  before(() => {
    cy.setToken('employee')
    cy.visit('/')
    cy.post(getClient()).then(res => {
      const { data } = res.body
      allData = { ...allData, client: data }
    })
    cy.post(getEmployee(email('manager'))).then(res => {
      const { data } = res.body
      userId = data.employeeByEmail.id
      allData = { ...allData, manager: data }

      cy.post(getProjects(userId)).then(res => {
        const { data } = res.body
        allData = { ...allData, projects: data }
      })
      cy.post(getEmployeeExperiences(userId)).then(res => {
        const { data } = res.body
        allData = { ...allData, levels: data }
      })
    })
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Check Employee data', () => {
    const { profile } = allData.client

    cy.haveText('employee_name', profile.name)
    cy.haveText('position', profile.position)
    cy.haveText('location', 'Saint Petersburg')
    cy.haveText('email', profile.email)
    cy.checkIfElementPresent('phone', profile.phoneNumber)
    cy.getElement('bonuses').should('contain.text', profile.bonuses)
  })

  it('Information about employee manager', () => {
    const { employeeByEmail } = allData.manager

    cy.get('.ant-card-meta-title').contains('Manager').should('have.text', employeeByEmail.name)
    cy.get('.ant-card-meta-description')
      .contains('Agile')
      .should('have.text', employeeByEmail.position)
    cy.getElement('avatar').should('be.visible')
  })

  it('Check the Projects field', () => {
    const { projects } = allData.projects.employee

    if (projects.length) {
      const projectNames = projects.map(obj => obj.name)
      cy.checkLength('project_tab', projects.length)
      cy.checkTextInArrayEl('project_tab', projectNames)

      return
    }
    cy.getElement('project').should('not.exist')
  })

  it('Check the Teams and Outlook buttons', () => {
    cy.getElement('mail_button').should('be.visible')
    cy.getElement('teams_button').should('be.visible')
  })

  it('Check all tabs', () => {
    Object.values(tabs).forEach(val => cy.get(workspace.tab).contains(val))
  })
})
