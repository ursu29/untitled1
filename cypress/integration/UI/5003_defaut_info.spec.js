import { getClient, getManager, getProjects, getEmployeeExperiences } from '../../support/getData'

describe('Checking default information', () => {
  const userId = '1bf931df-2015-4516-ac33-0d2caddc7df2';
  let allData = {
    client: null,
    manager: null,
    projects: null,
    levels: null,
  }

  before(() => {
    cy.setToken('employee');
    cy.visit('/');
    cy.post(getClient()).then(res => {
      const {data} = res.body;
      allData = {...allData, client: data};
    })
    cy.post(getManager(userId)).then( res => {
      const {data} = res.body;
      allData = {...allData, manager: data};
    })
    cy.post(getProjects(userId)).then(res => {
      const {data} = res.body;
      allData = {...allData, projects: data}
    })
    cy.post(getEmployeeExperiences(userId)).then(res => {
      const {data} = res.body;
      allData = {...allData, levels: data}
    })
  })

  it('Check Employee data', () => {
    const {profile} = allData.client;

    cy.haveText('employee_name', profile.name);
    cy.haveText('position', profile.position);
    cy.haveText('location', profile.location);
    cy.haveText('email', profile.email);
  })

  it('Information about employee manager', () => {
    const {manager} = allData.manager.employees[0];

    cy.getElement('employee_card').contains(manager.name);
    cy.getElement('employee_card').contains(manager.position);
    cy.getElement('employee_avatar').should('be.visible')
  })

  it('Check the Projects field', () => {
    const {projects} = allData.projects.employees[0];

    if(projects.length) {
      const projectNames = projects.map(obj => obj.name);
      cy.checkLength('project_tab', projects.length);
      cy.checkTextInArrayEl('project_tab', projectNames)

      return;
    }
    cy.getElement('project').should('not.exist')
  })

  it('Check the Teams and Outlook buttons', () => {
    cy.getElement('mail_button').should('be.visible');
    cy.getElement('teams_button').should('be.visible');
  })

  it('Check the Skills tab', () => {
    cy.getElement('Confident in').contains('Confident in')
  })
})
