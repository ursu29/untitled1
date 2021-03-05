import { developmentRolesData, guildContributionData } from '../../support/client/devPlan'

describe(`Check getDevelopmentPlans`, () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.getResponse(['getDevelopmentPlans', 'developmentRoles'], 'alias')
    cy.visit('/profile/development-plan')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  it('Check plan keys', () => {
    const { developmentPlans } = response

    const {developmentRoles, guildContribution} = developmentPlans

    expect(developmentRoles.__typename).equal(developmentRolesData.__typename)
    expect(guildContribution.__typename).equal(guildContributionData.__typename)

    cy.compareObjectsKeys(guildContribution, guildContributionData)
    cy.compareObjectsKeys(developmentRoles, developmentRolesData)
  })
})
