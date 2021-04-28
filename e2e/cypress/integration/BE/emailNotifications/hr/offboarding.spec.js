import * as data from "../../../../support/getData";
import {checkNewEmail, EMAIL_URL} from "../../../../support/emails/checkNewEmails";
import {
    completeProcessExecutionStep,
    getEmployee,
} from "../../../../support/getData";
import {email} from "../../../../support/client/employeeData";
import {
    createProcessObj,
} from "../../../../support/emails/data";


const message = (email, vacancyId) => ({
    href: `https://portal.dev.syncretis.com/client/hr/${vacancyId}/`,
    email,
    process: `NO DELETE OFFBOARDING AUTHOTEST`,
    text: 'Please provide needed information and press complete button.'
})

const agileMessage = (email, vacancyId) => ({
    href: `https://portal.dev.syncretis.com/client/hr/${vacancyId}/`,
    email,
    title: `NO DELETE OFFBOARDING AUTHOTEST`,
    text: 'Please provide needed information and press complete button.'
})

const offBoardingCv = (
    employeeRef,
    id,
    employeePhone = '984388348349',
    finishDate = '2021-04-26T10:33:06.105Z'
) => ({
    employeePhone,
    employeeRef,
    finishDate,
    id,
})

const offBoardingProcessId = '6082cd40610399001ce44a19'
describe('offBoarding notification', () => {

    let vacancyId, lastEmail, portalData, firstStepId, secondStepId, employeeData

    before(() => {
        cy.setToken('manager')

        cy.post(getEmployee(email('employee'))).then(res => employeeData = res.body.data.employeeByEmail)
        cy.getRequestData(EMAIL_URL).then(el => lastEmail = el.body.value[0].bodyPreview)

        cy.post(data.getAllProjects()).then(req => {
            portalData = req.body.data.projects
                .filter(el => el.name.includes('Portal'))
        })

        cy.post(data.getProcesses(offBoardingProcessId), 'superUser').then(reqProcess => {
            const {steps} = reqProcess.body.data.process

            firstStepId = steps[0].id
            secondStepId = steps[1].id
        })
    })


    after(() => {
        cy.post(data.toggleHoldProcess(vacancyId), 'superUser')
    })

    it('start process in HR tool', () => {
        cy.post(data.createHrProcess(createProcessObj(portalData[0].id, offBoardingProcessId)), 'superUser')
            .then(res => vacancyId = res.body.data.createProcessExecution.id)
    })

    it('update vacancy', () => {
        cy.post(data.updateOffBoardingProcess(offBoardingCv(employeeData.id, vacancyId)), 'superUser')
            .then(req => expect(req.body.data.updateProcessExecution.id).equal(vacancyId))
    })

    it('successfully sent message to managers', () => {
        cy.post(completeProcessExecutionStep(vacancyId, firstStepId), 'superUser').then(_ => {
            checkNewEmail(lastEmail, message(employeeData.agileManager.email, vacancyId), true)
        })
    })

    it('successfully sent message to agile manager', () => {
        cy.post(completeProcessExecutionStep(vacancyId, secondStepId), 'superUser').then(_ => {
            checkNewEmail(lastEmail, agileMessage(employeeData.agileManager.email, vacancyId), true)
        })
    })

})
