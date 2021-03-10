import {email} from "../../../support/client/employeeData";
import {
    attachMatrixToEmployee,
    getAllMatrices,
    getEmployee, getEmployeeExperiences,
    updateExperience
} from "../../../support/getData";

describe('Check saved comments', () => {
    let userId
    let generalMatrix
    let firstExperienced

    const level = 'EXPERIENCED'
    const title = 'General Matrix'
    const text = new Date().toLocaleTimeString()

    before(() => {
        cy.setToken('employee')
        cy.post(getAllMatrices())
            .then(req => {
                generalMatrix = req.body.data.matrices
                .filter(el => el.title === title)[0]})

        cy.post(getEmployee(email('employee')))
            .then(res => userId = res.body.data.employeeByEmail.id)
    })

    it('check employee matrix exist', () => {
        cy.post(attachMatrixToEmployee(generalMatrix.id, userId)).then(_ => {
            cy.post(getEmployeeExperiences(userId))
                .then(req => {
                    const {experiences} = req.body.data.employees[0]

                    firstExperienced = experiences
                    .filter(el => el.level === level)[0]
                })
        })
    })

    it('add comment to matrix', () => {
        cy.post(updateExperience(firstExperienced.id,level, text)).then(_ => {
            cy.post(getEmployeeExperiences(userId))
                .then(req => {
                    const {experiences} = req.body.data.employees[0]
                    const changedSkill = experiences.filter(el => el.level === level)[0]

                    expect(changedSkill.comment).equal(text)
                })
        })
    })
})