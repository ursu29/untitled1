import {
  developmentRolesData,
  guildContributionData,
  plan,
  planData,
} from '../../support/client/devPlan'

describe(`Check getDevelopmentPlans`, () => {
  let response

  context('getDevelopmentPlans', () => {
    before(() => {
      cy.setToken('employee')
      cy.getResponse(['getDevelopmentPlans', 'developmentRoles'], 'alias')
      cy.visit('/profile/development-plan')
      cy.wait(`@alias`).then(val => (response = val.response.body.data))
    })

    beforeEach(() => {
      cy.restoreLocalStorage()
    })
    afterEach(() => {
      cy.saveLocalStorage()
    })

    it('Check plan keys', () => {
      const { developmentPlans } = response

      expect(developmentPlans).to.be.a('array')
      developmentPlans.forEach(el => {
        cy.compareObjectsKeys(el, plan)
        expect(el.__typename).equal(plan.__typename)
      })
    })

    it('Check roles', () => {
      const { developmentPlans } = response
      const { developmentRoles } = developmentPlans[0]

      cy.compareObjectsKeys(developmentRoles, developmentRolesData)

      expect(developmentRoles.__typename).equal(developmentRolesData.__typename)
    })

    it('Check guildContribution', () => {
      const { developmentPlans } = response
      const { guildContribution } = developmentPlans[0]
      cy.compareObjectsKeys(guildContribution, guildContributionData)

      expect(guildContribution.__typename).equal(guildContributionData.__typename)
    })
  })

  context('archivedDPVersions', () => {
    beforeEach(() => {
      cy.setToken('employee')
      cy.getResponse(['archivedDPVersions'], 'alias')
      cy.visit('/profile/development-plan')
      cy.wait(`@alias`).then(val => (response = val.response.body.data))
    })

    it('Check archivedDPVersions', () => {
      const { archivedDPVersions } = response

      expect(archivedDPVersions).to.be.a('array')
      archivedDPVersions.forEach(el => {
        cy.compareObjectsKeys(el, planData)
        expect(el.__typename).equal(planData.__typename)
      })
    })
  })
})
