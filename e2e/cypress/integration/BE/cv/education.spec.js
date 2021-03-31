import {email} from '../../../support/client/employeeData'
import {getCV, getEmployee, updateCV} from '../../../support/getData'

const updateEducation = {
    dateEnd: '2014-01-01',
    dateStart: '2010-01-01',
    degree: 'degree',
    id: null,
    name: 'some university',
    speciality: 'speciality',
}

const request = (id, jobId, educationObj) => ({
    employee: id,
    id: jobId,
    education: [educationObj]
})

describe('add education (cv)', () => {
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
        cy.post(updateCV(request( employeeData.id, jobs.id, {}))).then(res => {
            const {id} = res.body.data.updateCurriculumVitae

            expect(id).equal(jobs.id)
        })
    })

    it('successfully add/update education data', () => {
        cy.post(updateCV(request( employeeData.id, jobs.id, {}))).then(res => {
            const {id, education} = res.body.data.updateCurriculumVitae
            const updateObj = {
                employee: employeeData.id,
                id: jobs.id,
                education: [{...updateEducation, id: education[0].id}]
            }

            expect(id).equal(jobs.id)
            expect(education.length).equal(1)

            cy.post(updateCV(updateObj)).then(res => {
                const {education} = res.body.data.updateCurriculumVitae
                const {dateEnd, dateStart, degree, id, name, speciality} = education[0]

                expect(education.length).equal(1)

                ;[dateEnd, dateStart, degree, id, name, speciality].forEach((el, idx) => {
                    const values = Object.values(updateObj.education[0])

                    expect(el).equal(values[idx])
                })
            })
        })
    })
})
