import { getSubTabUrl } from '../../../support/utils'
import {
  attachMatrixToEmployee,
  deleteMatrixProposal,
  getAllMatrices,
  getEmployee } from '../../../support/getData'
import { email } from '../../../support/client/employeeData'
import { skillEl } from '../../../support/locators'

describe('create proposal by employee', () => {
  const title = 'Frontend Matrix'
  const successMessage = 'Proposal was sent to the matrix owner'
  let matrixData

  before(() => {
    cy.setToken('employee')
    cy.visit(getSubTabUrl('career', '/profile', 'matrices'))

    cy.post(getAllMatrices())
      .then(req => matrixData = req.body.data.matrices
        .filter(el => el.title === title)[0])
    cy.post(getEmployee(email('employee')))
      .then(res => res.body.data.employeeByEmail.id).as('userId')
  })

  after(function() {
    cy.setToken('manager')
    cy.wait('@alias').then(req => {
      const {id} = req.response.body.data.createMatrixProposal

      cy.post(deleteMatrixProposal(id), 'superUser').then(req => {
        expect(req.body.data.deleteMatrixProposal.id).equal(id)
      })
    })
  })

  it('create new Proposal', function() {
    cy.post(attachMatrixToEmployee(matrixData.id, this.userId)).then(_ => {
      cy.getIcon('bulb').eq(0).click({force: true})
      cy.get('.ant-input').eq(1).type('Hello world')
      cy.getResponse(['createMatrixProposal'], 'alias')
      cy.get('span').contains('Post').click()

      cy.get(skillEl.successMes).should('be.visible')
      cy.get(skillEl.successMes).should('have.text', successMessage)
    })
  })
})