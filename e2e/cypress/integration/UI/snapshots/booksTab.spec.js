import { getAllSkills } from '../../../support/getData'

describe('under-menu looks good', () => {
  let skillId
  const allTabsPatch = id => ({
    profile: 'profile',
    guild: 'guilds/community-frontend?community-frontend',
    skill: `skills/${id}`
  })
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.post(getAllSkills()).then(res => {
      const { skills } = res.body.data
      skillId = skills[0].id
    })
  })
  it('check books tab menu', () => {
    Object.values(allTabsPatch(skillId)).forEach((el, idx) => {
      cy.visit(el)

      cy.get('.ant-skeleton').should('not.exist')

      cy.get('.ant-tabs-nav-wrap').last().matchImageSnapshot(`underMenu-${idx}`)
    })
  })

})