import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";
import {hrTool, skillEl} from "../../../support/locators";
import * as getData from "../../../support/getData";
import {popUp} from "../../../support/client/employeeData";

const vacancy = {
    title: 'react js',
    reason: 'Расширение проекта',
    project: 'Portal',
    englishLevel: 'Advanced',
    experience: 'Без опыта',
    description: `External description: ${todaysDate}`,
    workDescription: pastDay,
    skills: `what do we expect from candidates: ${todaysDate}`,
    plus: `what will be a plus: ${pastDay}`,
    stack: 'Git, Javascript, Angular, Azure DevOps'

}

describe('Create new vacancy', () => {
    let processId, newProjectId, allVacancies
    const {
        position,
        processName,
        option,
        description,
        workDescription,
        skills,
        plus,
        stack,
        publishBtn,
        abort,
        level,
        experience
    } = hrTool
    const mainFields = [description, workDescription, skills, plus, stack]

    before(() => {
        cy.setToken('manager')
        cy.visit('/')
        cy.addRole()
        cy.post(getData.createNewProcess('title', 'ONBOARDING', 'INTERNAL'), 'superUser')
            .then(res => {
                processId = res.body.data.createProcess.id

                cy.post(getData.createProcess(processId), 'superUser')
                    .then(res => {
                        newProjectId = res.body.data.createProcessExecution.id

                        cy.visit(`/hr/${newProjectId}`)
                        cy.addRole()
                    })
            })
    })

    after('delete Training', () => {
        cy.post(getData.deleteProcess(processId), 'superUser').then(req => {
            expect(req.body.data.deleteProcess.id).equal(processId)
            cy.post(getData.getVacancies())
                .then(req => expect(allVacancies.length).to.be.greaterThan(req.body.data.vacancies.length))
        })
    })

    it('fill all the fields', () => {
        cy.getId(position).clear().type(vacancy.title)
        //project
        cy.getId(processName).eq(0).click()
        cy.get(option).contains('Portal').click()
        //level
        cy.getElement(level).click()
        cy.get(option).contains('Advanced').click()
        //experience
        cy.getElement(experience).click()
        cy.get(option).contains('Без опыта').click()

        //type all fields
        mainFields.forEach(el => cy.getElement(el).type(vacancy.el))

        cy.getElement(publishBtn).click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')

        cy.post(getData.getVacancies())
            .then(req => allVacancies = req.body.data.vacancies)
    })

    it(`Abort new position`, () => {
        cy.getElement(abort).click()
        cy.get(popUp.button).contains('Yes').click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')
    })

});