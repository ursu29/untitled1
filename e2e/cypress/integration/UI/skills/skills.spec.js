import {skillEl} from "../../../support/locators";

describe('Check skills page', () => {
    const skillName = 'React'
    const {titleTree, searchInput, name} = skillEl
    let firstSkill

    before(() => {
        cy.setToken('employee')
        cy.visit('/skills')
        cy.get(titleTree).eq(0).then(el => firstSkill = el.text())
    })

    it('fill skill name', () => {
        cy.getElement(searchInput).type(skillName)

        cy.get(titleTree).eq(0).contains('Frontend')

        cy.getElement(searchInput).type(skillName)
        cy.getElement(searchInput).clear()

        cy.get(titleTree).eq(0).contains(firstSkill)

        cy.get(titleTree).eq(0).dblclick()
        cy.getElement(name).contains(firstSkill)
    })
})