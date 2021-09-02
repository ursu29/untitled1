import * as data from '../../../support/getData'
import {bodyObj, createProcessObj} from "../../../support/emails/data";


describe('create new process', () => {

    let processId, stepId, portalData, vacancyId, allMyProcess

    const filterByUser = (arr, userName) => arr.filter(processExecution => (processExecution.activeStepEmployees
        .filter(employee => employee.name === userName).length > 0) && (processExecution.status === 'RUNNING'))
    const userName = 'Ursula Kokshinova'
    const titleOfProcess = 'Test'
    const typeOfProcess = 'ONBOARDING'
    const customer = 'INTERNAL'
    const userID = "60c2a783a746fa001c3272c5"


    beforeEach(() => {
        cy.setToken('manager')

        cy.post(data.getAllProjects()).then(req => {
            portalData = req.body.data.projects
        })

        cy.post(data.createNewProcess(titleOfProcess, typeOfProcess, customer), 'superUser').then(
            res => {
                processId = res.body.data.createProcess.id
                cy.post(data.getProcesses(processId), 'superUser').then(reqProcess => {
                    stepId = reqProcess.body.data.process.steps[0].id
                    cy.post(data.updateProcessStep(bodyObj(stepId, userID)), 'superUser')

                    cy.post(data.createProcess(processId), 'superUser').then(res => {
                        const {createProcessExecution} = res.body.data
                        const {id, __typename} = createProcessExecution

                        expect(__typename).equal('ProcessExecution')
                        expect(id.length).to.be.greaterThan(0)
                    })
                })
            })
    })


    it('Creating and updating steps of process', () => {
        cy.post(data.createProcessStep({parentSteps: [stepId], process: processId}), 'superUser')
        cy.post(data.getProcesses(processId), 'superUser').then(reqProcess => {
            cy.post(data.updateProcessStep(bodyObj(reqProcess.body.data.process.steps[1].id, userID)), 'superUser')
        })
    })


    it('start process in HR tool', () => {
        cy.post(data.createHrProcess(createProcessObj(portalData[0].id, processId)), 'superUser')
            .then(res => {
                vacancyId = res.body.data.createProcessExecution.id
            })
    })

    it('filtering and counting responsible user', () => {
        cy.post(data.getAllProcess(), 'superUser').then(req => {
            const {processExecutions} = req.body.data
            allMyProcess = filterByUser(processExecutions, userName)

            expect(allMyProcess.length).to.be.greaterThan(0)
            console.log(allMyProcess.length)
        })
    })
})