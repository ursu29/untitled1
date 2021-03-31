import {email} from '../../../support/client/employeeData'
import {getCV, getEmployee, updateCV} from '../../../support/getData'

const title = `We are looking for a talented Front-End Developer to execute 
various development tasks on different projects and stacks. As a Front-End 
Developer will be a part of a dynamic and fun environment where you will
work on a variety of technical projects collaborating with team members
throughout our global organization (create custom web pages, templates,
and components for both the administrative authoring and front-end experiences).`

const request = (id, jobId, title) => ({
    employee: id,
    id: jobId,
    summary: title
})

describe('add summary', () => {
    let employeeData
    let jobs

    before(() => {
        cy.setToken('employee')

        cy.post(getEmployee(email('employee'))).then(res => {
            employeeData = res.body.data.employeeByEmail

            cy.post(getCV(employeeData.email))
                .then(val => jobs = val.body.data.employeeByEmail.curriculumVitae)
        })
    })

    after(() => {
        cy.post(updateCV(request( employeeData.id, jobs.id, ''))).then(res => {
            const {id, summary} = res.body.data.updateCurriculumVitae

            expect(id).equal(jobs.id)
            expect(summary).equal('')
        })
    })

    it('successfully update summary data', () => {
        cy.post(updateCV(request( employeeData.id, jobs.id, title))).then(res => {
            const {id, summary} = res.body.data.updateCurriculumVitae

            expect(id).equal(jobs.id)
            expect(summary).equal(title)
        })
    })
})
