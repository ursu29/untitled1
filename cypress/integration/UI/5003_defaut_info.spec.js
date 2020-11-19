import { getClient, getManager, getProjects, getEmployeeExperiences } from '../../support/getData'

describe('Checking default information', () => {
  const userId = '1bf931df-2015-4516-ac33-0d2caddc7df2'
  const tabs = {
    skill: 'Skills',
    bookMark: 'Bookmarks',
    matrices: 'Matrices',
    personal: 'Personal',
    form: 'Self',
    cv: 'CV',
  }
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
    cy.post(getManager(userId)).then(res => {
      const { data } = res.body
      allData = { ...allData, manager: data }
    })
    cy.post(getProjects(userId)).then(res => {
      const { data } = res.body
      allData = { ...allData, projects: data }
    })
    cy.post(getEmployeeExperiences(userId)).then(res => {
      const { data } = res.body
      allData = { ...allData, levels: data }
    })
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
    const { manager } = allData.manager.employees[0]

    cy.getElement('employee_card').contains(manager.name)
    cy.getElement('employee_card').contains(manager.position)
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

    cy.getElement(tabs.skill).contains(tabs.skill)
    cy.getElement('Title Confident in').contains('Confident in')
    cy.checkSkills('noConfident', 'Confident', 'Confident in', experiences)
    cy.checkSkills('noExperienced', 'Experienced', 'Experienced', experiences)
    cy.checkSkills('noCurrently', 'Currently', 'Currently studies', experiences)
    cy.checkSkills('noWants', 'Wants', 'Wants to know', experiences)
  })

  it('Check all tabs', () => {
    Object.values(tabs).forEach(val => cy.getElement(val).contains(val))
  })

  it('Check the Bookmarks tab', () => {
    cy.getElement(tabs.bookMark).click()
    cy.getElement('bookmark').contains('Add bookmark')
  })

  it('Check the Matrices tab', () => {
    cy.getElement(tabs.matrices).click()
    cy.getElement('legend-buttons').should('be.visible')
  })

  it('Check the Personal development tab', () => {
    cy.getElement(tabs.personal).click()
    cy.getElement('evaluation-form').should('be.visible')
  })

  it('Check the Self Evaluation Form tab', () => {
    cy.getElement(tabs.form).click()
    cy.getElement('helper').should('be.visible')
  })

  it('Check the CV tab', () => {
    cy.getElement(tabs.cv).click()
    cy.getElement('cv-form').should('be.visible')
  })
})
