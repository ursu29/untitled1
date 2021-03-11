import * as getData from "../../../support/getData";
import {email} from "../../../support/client/employeeData";

describe('check vacancies', () => {
    let firstVacancie
    let employeeId

    beforeEach(() => {
        cy.setToken('employee')
        cy.post(getData.getEmployee(email('employee')))
            .then(res => employeeId  = res.body.data.employeeByEmail.id)
        cy.post(getData.getVacancies())
            .then(req => firstVacancie = req.body.data.vacancies[0])
    })

    it('want to rotate', () => {
        cy.post(getData.rotateRequest('test comment', firstVacancie.id,employeeId )).then(req => {
            const {rotateRequest: {id}} = req.body.data

            expect(id.length).to.be.greaterThan(0)
        })
    })

    it('cancel rotate', () => {
        cy.post(getData.cancelRotateRequest(firstVacancie.id, employeeId )).then(req => {
            const {cancelRotateRequest: {id}} = req.body.data

            expect(id.length).to.be.greaterThan(0)
        })
    })
})