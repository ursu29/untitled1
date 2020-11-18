import { developmentRolesData, guildContributionData, plan, planData} from '../../support/client/devPlan'

describe(`Check employee Personal development`, () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['archivedDPVersions'], 'alias')
    cy.visit('/client/profile/development-plan')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
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

describe(`Check getDevelopmentPlans`, () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['getDevelopmentPlans'], 'alias')
    cy.visit('/client/profile/development-plan')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
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
    Object.entries(developmentRoles).forEach(el => {
      if (!el[0].includes('__typename')) {
        expect(el[1]).to.be.a('boolean')

        return
      }
    })
    expect(developmentRoles.__typename).equal(developmentRolesData.__typename)
  })

  it('Check guildContribution', () => {
    const { developmentPlans } = response
    const { guildContribution } = developmentPlans[0]
    cy.compareObjectsKeys(guildContribution, guildContributionData)
    Object.entries(guildContribution).forEach(el => {
      if (!['__typename', 'custom'].some(val => el[0].includes(val))) {
        expect(el[1]).to.be.a('boolean')

        return
      }
    })
    expect(guildContribution.__typename).equal(guildContributionData.__typename)
  })
})
