import {evaluate, getEmployee, getEvaluations} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";

describe('check self evaluation grade', () => {
    let employeeId
    let evaluationData
    const grade = 2
    const text = new Date().toLocaleTimeString()

    before(() => {
        cy.setToken('employee')
        cy.post(getEmployee(email('employee'))).then(res => {

            const {employeeByEmail} = res.body.data
            employeeId = employeeByEmail.id
        })
    })

    beforeEach(() => {
        cy.post(getEvaluations(employeeId)).then(req => {
            evaluationData = req.body.data.evaluations[0]
        })
    })

    it('add new grade', () => {
        cy.post(evaluate(employeeId, text, evaluationData.evaluationAttribute.id, grade))
                .then(res => expect(res.status).equal(200))
    })

    it('check evaluation comment', () => {
            expect(evaluationData.comment).equal(text)
    })
    it('check evaluation grade', () => {
            expect(evaluationData.evaluation).equal(grade)
    })

    it('check evaluation fromWhom', () => {
            expect(evaluationData.fromWho.id).equal(employeeId)
    })

    it('check evaluation toWhom', () => {
            expect(evaluationData.toWhom.id).equal(employeeId)
    })
})