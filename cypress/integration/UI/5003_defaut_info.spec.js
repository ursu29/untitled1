import * as data from '../../support/getData'
import { tabs, workspace } from '../../support/locators'
import {agileManager, employeeData as EmployeeData} from '../../support/client/employeeData'

describe('Checking default information', () => {
  const userId = EmployeeData.employee.id
  let allData = {
    client: null,
    manager: null,
    projects: null,
    levels: null,
  }

  before(() => {
    cy.setToken('employee')
    cy.visit('/')
    cy.post(data.getClient()).then(res => {
      const { data } = res.body
      allData = { ...allData, client: data }
    })
    cy.post(data.getEmployee(agileManager.email)).then(res => {
      const { data } = res.body
      allData = { ...allData, manager: data }
    })
    cy.post(data.getProjects(userId)).then(res => {
      const { data } = res.body
      allData = { ...allData, projects: data }
    })
    cy.post(data.getEmployeeExperiences(userId)).then(res => {
      const { data } = res.body
      allData = { ...allData, levels: data }
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
    cy.haveText('location', profile.location)
    cy.haveText('email', profile.email)
    cy.checkIfElementPresent('phone', profile.phoneNumber)
    cy.checkIfElementPresent('bonuses', profile.bonuses)
  })

  it('Information about employee manager', () => {
    const { employeeByEmail } = allData.manager

    cy.get('.ant-card-meta-title').contains('Manager').should('have.text', employeeByEmail.name)
    cy.get('.ant-card-meta-description').contains('Agile').should('have.text', employeeByEmail.position)
    cy.getElement('avatar').should('be.visible')
  })

  it('Check the Projects field', () => {
    const { projects } = allData.projects.employees[0]

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

  it('Check the Skills tab', () => {
    const { experiences } = allData.levels.employees[0]

    cy.get(workspace.tab).contains(tabs.skill)
    cy.getElement('Title Confident in').contains('Confident in')
    cy.checkSkills('noConfident', 'Confident', 'Confident in', experiences)
    cy.checkSkills('noExperienced', 'Experienced', 'Experienced', experiences)
    cy.checkSkills('noCurrently', 'Currently', 'Currently studies', experiences)
    cy.checkSkills('noWants', 'Wants', 'Wants to know', experiences)
  })

  it('Check all tabs', () => {
    Object.values(tabs).forEach(val => cy.get(workspace.tab).contains(val))
  })

})
