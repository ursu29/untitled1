import {getHrTabUrl} from "../../../support/utils";
import {hrTool, postEl, skillEl} from "../../../support/locators";
import {deleteVacancy} from "../../../support/getData";

describe('create new process task', () => {
    let processId;
    const {activeIdProcess, create, prio, option, processName} = hrTool

    before(() => {
        cy.setToken('manager')
        cy.visit(getHrTabUrl('board'))
    })

    after(() => {
        cy.post(deleteVacancy(processId), 'superUser').then(req => {
            expect(req.body.data.deleteHrVacancy.id).equal(processId)
        })
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })
    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('Check errors message', () => {
        cy.getElement('start').click()

        cy.getId(activeIdProcess).click()
        cy.get(postEl.itemsSelect).eq(4).click()
        cy.getElement(create).click()

        cy.get(hrTool.errorMess).should('be.visible')
    })

    it('successfully created new task', () => {
        cy.get(skillEl.skillsEvent).click()
        cy.get(option).contains('Tomsk').click()
        cy.getId(prio).click()
        cy.get(option).contains('2').click()


        cy.getId(processName).click({multiple: true})
        cy.get(option).contains('Portal').click()

        cy.getResponse(['createProcessExecution'], 'createAlias')
        cy.getElement(create).click()
        cy.get(skillEl.successMes).should('be.visible')

        cy.wait('@createAlias')
            .then(req => processId = req.response.body.data.createProcessExecution.id)
    })
})
