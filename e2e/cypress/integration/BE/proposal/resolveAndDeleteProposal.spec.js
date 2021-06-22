import {
  attachMatrixToEmployee,
  createMatrixProposal, deleteMatrixProposal, getAllEmployeeMatrices,
  getAllMatrices,
  getEmployee, getMatrixProposals, resolveMatrixProposal,
} from '../../../support/getData'
import { email } from '../../../support/client/employeeData'
import { todaysDate } from '../../../support/officePlanner/officeDays'

describe('create proposal', () => {
  let matrixData, createProposalId, allMatrixProposals
  const title = 'Quality Assurance Matrix'

  before(() => {
    cy.setToken('employee')
    cy.post(getAllMatrices())
      .then(req => {
        matrixData = req.body.data.matrices.filter(el => el.title === title)[0]
        cy.post(getMatrixProposals(matrixData.id)).then(req => allMatrixProposals = req.body.data.matrixProposals)
      })
    cy.post(getEmployee(email('employee')))
      .then(res => res.body.data.employeeByEmail.id).as('userId')
  })

  after('delete propose', () => {
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

  it('resolve proposal by employee', () => {
    const firstNotResolvePropose = allMatrixProposals.filter(el => !el.isResolved)[0].id

    cy.post(resolveMatrixProposal(firstNotResolvePropose))
      .then(req => expect(req.body.errors[0].message).equal('You have no access'))
  })

  it('resolve proposal by manager', () => {
    cy.setToken('manager')
    const firstProposal = allMatrixProposals.filter(el => !el.isResolved)[0]

    cy.post(resolveMatrixProposal(firstProposal.id), 'superUser').then(req => {
      expect(req.body.data.resolveMatrixProposal.id).equal(firstProposal.id)

      cy.post(getMatrixProposals(matrixData.id)).then(req => {
        const proposalData = req.body.data.matrixProposals
          .filter(el => el.id === firstProposal.id)[0]

        expect(proposalData.isResolved).equal(true)
      })
    })
  })
})