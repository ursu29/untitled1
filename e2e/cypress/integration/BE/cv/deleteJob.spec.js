import {email} from '../../../support/client/employeeData'
import {getCV, getEmployee, updateCV} from '../../../support/getData'

const obj = {
    company: "Syncretis",
    dateEnd: null,
    dateStart: null,
    level: "",
    position: "",
    project: "",
    responsibilities: ""
}

describe('delete work experience', () => {
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

    it('successfully deleting job place', () => {
        const emptySummary = {
            employee: employeeData.id,
            id: jobs.id,
            vitaes: []
        }
        const request = {
            employee: employeeData.id,
            id: jobs.id,
            vitaes: [obj, obj]
        }
        cy.post(updateCV(request)).then(req => {
            const {vitaes} = req.body.data.updateCurriculumVitae

            expect(vitaes.length).equal(2)

            cy.post(updateCV(emptySummary)).then(res => {
                const {id, vitaes} = res.body.data.updateCurriculumVitae

                expect(id).equal(jobs.id)
                expect(vitaes.length).equal(0)
            })
        })
    })
})
