
import {email} from "../../support/client/employeeData";
import {
    attachMatrixToEmployee,
    getAllMatrices,
    getEmployee,
    updateExperience
} from "../../support/getData";

describe('Check saved comments', () => {
    let userId
    let generalMatrix
    const title = 'General Matrix'
    const text = new Date().toLocaleTimeString()

    before(() => {
        cy.setToken('employee')
        cy.post(getAllMatrices())
            .then(req => {
                debugger
                console.log(req.body.data.matrices)
                generalMatrix = req.body.data.matrices
                .filter(el => el.title === title)[0]})

        cy.post(getEmployee(email('employee')))
            .then(res => {
                debugger
                const {data} = res.body
                userId = data.employeeByEmail.id
            })
    })

    it('attach matrix', () => {
        cy.post(attachMatrixToEmployee(generalMatrix.id, userId)).then(_ => {
            cy.post(updateExperience(generalMatrix.id,'EXPERIENCED', text)).then(req => {
                console.log(req)
            })
        })
    })
})