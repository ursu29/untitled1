import * as data from "../../../../support/getData";
import {checkNewEmail, EMAIL_URL} from "../../../../support/emails/checkNewEmails";
import {
    completeProcessExecutionStep, createProcessStep,
    deleteProcess,
    getEmployee,
    getProcesses,
    getProjectByCode, publishVacancy, updateVacancy
} from "../../../../support/getData";
import {email} from "../../../../support/client/employeeData";
import {bodyData, bodyObj, createProcessObj, stepName, vacancyObj} from "../../../../support/emails/data";

const message = (emails) => ({
    emails,
    name: stepName
})

describe('sending notification to the project manager', () => {
    let processId, vacancyId, lastEmail, portalData, vacancyData, firstStepId, employeeData, projectCodeId

    before(() => {
        cy.setToken('manager')
        cy.post(getEmployee(email('manager'))).then(res => employeeData = res.body.data.employeeByEmail)

        cy.getRequestData(EMAIL_URL).then(el => lastEmail = el.body.value[0].bodyPreview)
        cy.post(getProjectByCode()).then(req => {
            projectCodeId = req.body.data.projectByCode.id
        })
        cy.post(data.getAllProjects()).then(req => {
            portalData = req.body.data.projects
                .filter(el => el.name.includes('Portal'))
        })

        cy.post(data.createNewProcess(bodyData.title, bodyData.type, bodyData.customer), 'superUser').then(res => {
            processId = res.body.data.createProcess.id
            cy.post(getProcesses(processId), 'superUser').then(reqProcess => {
                firstStepId = reqProcess.body.data.process.steps[0].id
                cy.post(data.updateProcessStep(bodyObj(firstStepId, employeeData.id, true)), 'superUser')

            })
        })
    })

    after(() => {
        cy.post(data.toggleHoldProcess(vacancyId), 'superUser').then(_ => {
            cy.post(deleteProcess(processId), 'superUser').then(res =>
                expect(res.body.data.deleteProcess.id).equal(processId))
        })
    })

    it('create new process step', () => {
        cy.post(createProcessStep({parentSteps: [firstStepId], process: processId}), 'superUser')
    })

    it('update second process', () => {
        cy.post(getProcesses(processId), 'superUser').then(reqProcess => {
            cy.post(data.updateProcessStep(bodyObj(reqProcess.body.data.process.steps[1].id, employeeData.id, true)), 'superUser')
        })
    })

    it('start process in HR tool', () => {
        cy.post(data.createHrProcess(createProcessObj(portalData[0].id, processId)), 'superUser')
            .then(res => {
                vacancyId = res.body.data.createProcessExecution.id

                cy.post(data.getProcessExecutions(vacancyId), 'superUser')
                    .then(req => vacancyData = req.body.data.processExecutions[0].vacancy)
            })
    })

    it('update vacancy', () => {
        cy.post(updateVacancy(vacancyObj(vacancyData.id, projectCodeId)), 'superUser')
    })

    it('publish vacancy', () => {
        cy.post(publishVacancy(vacancyData.id), 'superUser').then(req => {
            expect(req.body.data.publishVacancy.id).equal(vacancyData.id)
        })
    })

    it('successfully sent message to all agile managers', () => {
        cy.post(completeProcessExecutionStep(vacancyId, firstStepId), 'superUser').then(_ => {
            checkNewEmail(lastEmail, message(employeeData.email), true)
        })
    })

})
