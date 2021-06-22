import {
  attachMatrixToEmployee,
  createMatrixProposal, deleteMatrixProposal, getAllEmployeeMatrices,
  getAllMatrices,
  getEmployee,
} from '../../../support/getData'
import { email } from '../../../support/client/employeeData'
import { todaysDate } from '../../../support/officePlanner/officeDays'

describe('create proposal', () => {
  let matrixData, createProposalId
  const title = 'Frontend Matrix'

  before(() => {
    cy.setToken('employee')
    cy.post(getAllMatrices())
      .then(req => matrixData = req.body.data.matrices
        .filter(el => el.title === title)[0])
    cy.post(getEmployee(email('employee')))
      .then(res => res.body.data.employeeByEmail.id).as('userId')
  })

  after('delete propose', () => {
    cy.setToken('manager')
    cy.post(deleteMatrixProposal(createProposalId), 'superUser').then(req => {
      expect(req.body.data.deleteMatrixProposal.id).equal(createProposalId)
    })
  })

  it('attach matrix', function() {
    cy.post(attachMatrixToEmployee(matrixData.id, this.userId))
  })
  
  it('create new proposal', function() {
    cy.post(getAllEmployeeMatrices(this.userId)).then(req => {

      const firstMatrix = req.body.data.employees[0].matrices.filter(el => el.title === title)[0]
      const {id} = firstMatrix.body.skills[0]

      cy.post(createMatrixProposal(id, matrixData.id, `proposal: ${todaysDate}`))
        .then(req => {
          createProposalId = req.body.data.createMatrixProposal.id
          expect(createProposalId.length).to.be.greaterThan(0)
        })
    })
  })
})