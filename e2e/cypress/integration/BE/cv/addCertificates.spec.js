import {email} from '../../../support/client/employeeData'
import {getCV, getEmployee, updateCV} from '../../../support/getData'

const updateCertificate = {
    date: '2021-03-30',
    expirationDate: '2021-03-30',
    id: null,
    link: 'https://www.glassdoor.com/',
    name: 'test name',
}

const request = (id, jobId) => ({
    employee: id,
    id: jobId,
    certificates: [{}]
})

describe('add certificates (cv)', () => {
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
        cy.post(updateCV(request(employeeData.id, jobs.id))).then(res => {
            const {id} = res.body.data.updateCurriculumVitae

            expect(id).equal(jobs.id)
        })
    })

    it('successfully add/update certificate', () => {
        cy.post(updateCV(request(employeeData.id, jobs.id))).then(res => {
            const {id, certificates} = res.body.data.updateCurriculumVitae
            const updateObj = {
                employee: employeeData.id,
                id: jobs.id,
                certificates: [{...updateCertificate, id: certificates[0].id}]
            }

            expect(id).equal(jobs.id)
            expect(certificates.length).equal(1)

            cy.post(updateCV(updateObj)).then(res => {
                const {certificates} = res.body.data.updateCurriculumVitae
                const {date, expirationDate, id, link, name} = certificates[0]

                expect(certificates.length).equal(1)

                ;[date, expirationDate, id, link, name].forEach((el, idx) => {
                    const values = Object.values(updateObj.certificates[0])

                    expect(el).equal(values[idx])
                })
            })
        })
    })
})
