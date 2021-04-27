import * as data from "../../../../support/getData";
import {checkNewEmail, EMAIL_URL} from "../../../../support/emails/checkNewEmails";
import {
    completeProcessExecutionStep,
    getEmployee, getProjectByCode,
} from "../../../../support/getData";
import {email} from "../../../../support/client/employeeData";
import {
    createProcessObj, vacancyObj,
} from "../../../../support/emails/data";

const onBoardingProcessId = '6086b5d8b6e488001c732895'

describe('onBoarding notification', () => {
    const randomNumber = new Date().getTime().toString()
    const agileManagers = []

    let vacancyId, lastEmail, portalData, firstStepId, secondStepId, employeeData, projectCodeId

    before(() => {
        cy.setToken('manager')

        cy.post(getEmployee(email('employee'))).then(res => employeeData = res.body.data.employeeByEmail)
        cy.getRequestData(EMAIL_URL).then(el => lastEmail = el.body.value[0].bodyPreview)

        cy.post(data.getProjectByCode()).then(req => {
            projectCodeId = req.body.data.projectByCode.id
        })

        cy.post(getProjectByCode()).then(req => {
            cy.post(data.getProjectManagers(req.body.data.projectByCode.id))
                .then(req => req.body.data.project.employees
                    .map(el => el.agileManager ? agileManagers.push(el.agileManager.email) : null))
        })

        cy.post(data.getAllProjects()).then(req => {
            portalData = req.body.data.projects
                .filter(el => el.name.includes('Portal'))
        })

        cy.post(data.getProcesses(onBoardingProcessId), 'superUser').then(reqProcess => {
            const {steps} = reqProcess.body.data.process

            firstStepId = steps[0].id
            secondStepId = steps[1].id
        })
    })


    after(() => {
        cy.post(data.toggleHoldProcess(vacancyId), 'superUser')
    })

    it('start process in HR tool', () => {
        cy.post(data.createHrProcess(createProcessObj(portalData[0].id, onBoardingProcessId)), 'superUser')
            .then(res => vacancyId = res.body.data.createProcessExecution.id)
    })

    it('update vacancy', () => {
        cy.post(data.updateVacancy(vacancyObj(vacancyId, projectCodeId)), 'superUser')
    })

    it('successfully sent message to all agile managers', () => {
        cy.post(data.updateProcess(`${new Date().getTime()}`, randomNumber, vacancyId), 'superUser').then(req => {
            checkNewEmail(lastEmail, {...agileManagers}, true)

            expect(req.body.data.updateProcessExecution.id).equal(vacancyId)
        })
    })

    it('successfully sent message to managers after first step', () => {
        cy.post(completeProcessExecutionStep(vacancyId, firstStepId), 'superUser').then(_ => {

            checkNewEmail(lastEmail, {...agileManagers}, true)
        })
    })
})
