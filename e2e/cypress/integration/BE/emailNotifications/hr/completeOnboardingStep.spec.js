import * as data from "../../../../support/getData";
import {checkNewEmail, EMAIL_URL} from "../../../../support/emails/checkNewEmails";
import {email} from "../../../../support/client/employeeData";
import {
    bodyData,
    bodyObj,
    createProcessObj,
    stepMessage,
    stepName,
    vacancyObj
} from "../../../../support/emails/data";

describe('sending notification if completed one step', () => {
    const agileManagers = []

    let processId, vacancyId, lastEmail, portalData, vacancyData, firstStepId, employeeData, projectCodeId

    before(() => {
        cy.setToken('manager')
        cy.post(data.getEmployee(email('manager'))).then(res => employeeData = res.body.data.employeeByEmail)

        cy.getRequestData(EMAIL_URL).then(el => lastEmail = el.body.value[0].bodyPreview)
        cy.post(data.getProjectByCode()).then(req => {
            projectCodeId = req.body.data.projectByCode.id

            cy.post(data.getProjectManagers(projectCodeId))
                .then(req => req.body.data.project.employees
                    .map(el => el.agileManager ? agileManagers.push(el.agileManager.email) : null))
        })
        cy.post(data.getAllProjects()).then(req => {
            portalData = req.body.data.projects
                .filter(el => el.name.includes('Portal'))
        })

        cy.post(data.createNewProcess(bodyData.title, bodyData.type, bodyData.customer), 'superUser').then(res => {
            processId = res.body.data.createProcess.id
            cy.post(data.getProcesses(processId), 'superUser').then(reqProcess => {
                firstStepId = reqProcess.body.data.process.steps[0].id

                cy.post(data.updateProcessStep(bodyObj(firstStepId, employeeData.id)), 'superUser')
            })
        })
    })

    after(() => {
        cy.post(data.toggleHoldProcess(vacancyId), 'superUser').then(_ => {
            cy.post(data.deleteProcess(processId), 'superUser').then(res =>
                expect(res.body.data.deleteProcess.id).equal(processId))
        })
    })

    it('create new process step', () => {
        cy.post(data.createProcessStep({parentSteps: [firstStepId], process: processId}), 'superUser')
    })

    it('update second process', () => {
        cy.post(data.getProcesses(processId), 'superUser').then(reqProcess => {
            cy.post(data.updateProcessStep(bodyObj(reqProcess.body.data.process.steps[1].id, employeeData.id)), 'superUser')
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
        cy.post(data.updateVacancy(vacancyObj(vacancyData.id, projectCodeId)), 'superUser')
    })

    it('publish vacancy', () => {
        cy.post(data.publishVacancy(vacancyData.id), 'superUser').then(req => {
            expect(req.body.data.publishVacancy.id).equal(vacancyData.id)
        })
    })

    it('successfully sent message to ', () => {
            cy.post(data.completeProcessExecutionStep(vacancyId, firstStepId), 'superUser').then(_ => {
                checkNewEmail(lastEmail, stepMessage(employeeData.email, stepName, bodyData.title), false)
            })
    })

})
