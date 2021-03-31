import {email} from '../../../support/client/employeeData'
import {getCV, getEmployee, updateCV} from '../../../support/getData'
import {skillEl} from "../../../support/locators";

const request = (id, jobId) => ({
    employee: id,
    id: jobId,
    certificates: [],
    education: [],
    summary: '',
    vitaes: []
})

const name = id => !id ? 'Work experience' : (id === 1 ? 'Certificates & Awards' : 'Education');

describe('create cv', () => {
    let employeeData
    let jobs
    const values = [0,1,2]

    before(() => {
        cy.setToken('employee')

        cy.post(getEmployee(email('employee'))).then(res => {
            employeeData = res.body.data.employeeByEmail

            cy.post(getCV(employeeData.email)).then(val => {
                jobs = val.body.data.employeeByEmail.curriculumVitae
                cy.post(updateCV(request( employeeData.id, jobs.id)))

                cy.visit('profile/cv')
            })
        })
    })

    values.forEach(el => {
        it(`add new ${name(el)} fields`, () => {
            cy.getElement('addJob').eq(el).click()

            cy.get(skillEl.successMes).should('be.visible')
            cy.get(skillEl.successMes).should('not.exist')
        })
    })

    values.forEach(el => {
        it(`delete ${name(el)} fields`, () => {
            cy.getIcon('delete').eq(0).click()
            cy.get('span').contains('OK').click()

            cy.get(skillEl.successMes).should('be.visible')
            cy.get(skillEl.successMes).should('not.exist')
        })
    })
})
