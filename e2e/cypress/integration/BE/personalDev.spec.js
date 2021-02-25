import { developmentRolesData, guildContributionData, plan } from '../../support/client/devPlan'

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
    const { developmentRoles, guildContribution } = developmentPlans[0]

    expect(developmentPlans).to.be.a('array')
    expect(developmentRoles.__typename).equal(developmentRolesData.__typename)
    expect(guildContribution.__typename).equal(guildContributionData.__typename)

    cy.compareObjectsKeys(guildContribution, guildContributionData)
    cy.compareObjectsKeys(developmentRoles, developmentRolesData)

    developmentPlans.forEach(el => {
      cy.compareObjectsKeys(el, plan)
      expect(el.__typename).equal(plan.__typename)
    })
  })
})
