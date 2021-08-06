import { getAllSkills } from '../../../support/getData'

describe('under-menu looks good', () => {
  let skillId
  const allTabsPatch = id => ({
    profile: 'profile',
    guild: 'guilds/community-frontend?community-frontend',
    skill: `skills/${id}`
  })
  beforeEach(() => {
    cy.addHeadersAuth()
  })
  afterEach(() => {
    cy.addHeadersAuth()
  })

  before(() => {
    cy.setToken('employee')

    cy.post(getAllSkills()).then(res => {
      const { skills } = res.body.data
      skillId = skills[0].id
    })
  })

  it('check bottom tabs in profile', () => {
    cy.visit(allTabsPatch(skillId).profile)

    cy.get('.ant-tabs-nav-list').last().matchImageSnapshot(`profileBottomTab`)
  })

  it('check community tab', () => {
    cy.visit(allTabsPatch(skillId).guild)

    cy.get('.ant-tabs-nav-wrap').last().matchImageSnapshot(`communityTab`)
  })

  it('check skills tab', () => {
    cy.visit(allTabsPatch(skillId).skill)

    cy.get('.ant-tabs-nav-wrap').last().matchImageSnapshot(`skillsTab`)
  })

})