import {postEl, skillEl} from "../../../support/locators";
import {deleteSkill} from "../../../support/getData";

describe('add new skill', () => {
    const {skillId, description, selectSkill, submit, successMes} = skillEl
    const skillName = 'React dom'
    const descriptionText = 'The Document Object Model (DOM) is a programming interface for HTML and XML documents'
    let createdId

    before(() => {
        cy.setToken('employee')
        cy.visit('/skills')
    })

    after('delete skill', () => {
        cy.post(deleteSkill(createdId)).then(req => {
            const {deleteSkill: {id}} = req.body.data

            expect(createdId).equal(id)
        })
    })

    it('create new skill', () => {
        cy.get('button').contains('Add').click()
        cy.getId(skillId).type(skillName)
        cy.getId(description).type(descriptionText)
        cy.getId(selectSkill).click()
        cy.get(postEl.itemsSelect).eq(0).click()

        cy.getResponse(['createSkill'], 'alias')
        cy.getElement(submit).click()

        cy.wait('@alias').then(req => {
            const {createSkill: {id}} = req.response.body.data
            createdId = id
        })

        cy.get(successMes).should('be.visible')
        cy.get(successMes).should('not.exist')
    })
})