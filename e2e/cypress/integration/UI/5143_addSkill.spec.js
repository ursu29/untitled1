import { getAllSkills } from '../../support/getData'
import { getSelectItem, inputSkill, addSkill } from '../../support/complexLocators'
import { workspace, tabs, skillEl } from '../../support/locators'

describe('Adding Skills in the Users Profile', () => {
  const skillName = 'Agile'
  const childSkill = 'SAFe'
  let allData = {
    skills: null,
    childSkills: null,
    uiSkill: [],
  }

  before(() => {
    cy.setToken('employee')
    cy.visit('/')
    cy.post(getAllSkills()).then(res => {
      const { data } = res.body
      allData = { ...allData, skills: data }
    })
    cy.editSkills(0)
    cy.deleteAllSkills(skillEl.item, skillEl.remove)
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
    cy.deleteAllSkills(skillEl.item, skillEl.remove)
  })

  it('Check edit button and list items', () => {
    const { skills } = allData.skills

    getSelectItem(0).click()
    getSelectItem(0)
      .parent()
      .then(val => {
        const selectedId = skills.filter(skill => skill.name === val.text())[0]
        const childSkill = skills
          .filter(skill => selectedId.id === skill.parent?.id)
          .map(val => val.name)
        allData = { ...allData, childSkills: childSkill }
      })
    cy.get(skillEl.skill)
      .each((val, idx) => {
        if (allData.childSkills.length >= idx) {
          allData.uiSkill.push(val.text())
        }
      })
      .then(
        () => expect(Cypress._.isEqual(allData.childSkills, allData.uiSkill.slice(1))).to.be.true,
      )
  })

  it(`Click on a skill ${skillName}`, () => {
    cy.get(skillEl.skill).contains(skillName).click({ force: true })
    cy.toEqualText(skillEl.item, skillName)
  })

  it(`Check on a child skill: ${childSkill} and collapsing`, () => {
    cy.get(skillEl.skill).contains(childSkill).click()
    cy.toEqualText(skillEl.item, childSkill)

    getSelectItem(0).click()
    cy.toEqualText(skillEl.item, childSkill)

    inputSkill(0).click()
    cy.toEqualText(skillEl.item, childSkill)
  })

  it(`Skill inside ${skillName} shouldn't change`, () => {
    inputSkill(0).click()
    cy.get(skillEl.skill).contains(skillName).click()
    getSelectItem(0).click()
    cy.get(skillEl.skill).contains(childSkill).click()
    cy.get(skillEl.skill).contains(skillName).click()
    cy.toEqualText(skillEl.item, childSkill)
  })

  it('Click on the Done', () => {
    cy.get(skillEl.skill).contains(skillName).click()
    addSkill(0).click()
    cy.get(skillEl.iconEdit).eq(0).should('have.class', 'anticon-edit')
    cy.get(skillEl.successMes).should('have.text', 'Skills updated')
    cy.toEqualText(skillEl.skillName, skillName, true)
    cy.editSkills(0)
  })

  it('Click to another tab', () => {
    getSelectItem(0).click()
    cy.get(skillEl.skill).contains(childSkill).click()
    cy.get(skillEl.skill).contains(skillName).click()
    cy.get(workspace.tab).contains(tabs.bookMark).click()
    cy.get(workspace.tab).contains(tabs.skill).click()
    cy.get(skillEl.iconChecked).should('have.class', 'anticon-check')
    cy.get(skillEl.item).its('length').should('eq', 2)
  })
})