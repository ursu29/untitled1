import { getAllMatrices } from '../../support/getData'
import { getListOfMatrix } from '../../support/complexLocators'

export const matrix = {
  matrices: 'Matrices',
  knowledge: 'legend-buttons',
  matrixBtn: 'matrix-btn',
  item: '.ant-select-item-option-content',
  delete: 'delete-matrix',
  matrixName: 'QA Matrix',
  matrixTabs: '.ant-tabs-tab',
  success: '.ant-message-success',
  alert: '.ant-message-notice-content',
}

describe('Adding Matrix', () => {
  let allData = {
    matrices: null,
  }

  before(() => {
    cy.setToken('employee')
    cy.visit('/')
    cy.post(getAllMatrices()).then(res => {
      const { data } = res.body
      allData = { ...allData, matrices: data }
    })
  })

  it('Check the Matrices tab', () => {
    cy.getElement(matrix.matrices).click()
    cy.getElement(matrix.knowledge).should('be.visible')
    const { matrices } = allData.matrices
    const name = matrices.map(val => val.title)

    cy.getId(matrix.matrixBtn).click()
    cy.checkTextInArrayEl(matrix.item, name, false)
  })

  it('Delete all Matrix', () => {
    cy.elementIsPresent('[data-cy=no-matrices]').then(val => {
      if (!val) {
        getListOfMatrix().each(el => {
          cy.get(matrix.matrixTabs).contains(el.text()).click()
          cy.scrollTo('bottom')
          cy.getId(matrix.delete).eq(0).click()
          cy.scrollTo('top')
          cy.get(matrix.success).should('be.visible')
          cy.get(matrix.success).should('not.be.visible')
        })

        return
      }
      cy.getElement('no-matrices').should('be.visible')
    })
  })

  it('Add matrix', () => {
    cy.get(matrix.item).eq(0).click({ multiple: true })
    cy.get(matrix.alert).should('be.visible')
    cy.get(matrix.alert)
      .should('not.be.visible')
      .then(() => {
        getListOfMatrix().then(el => expect(el.text()).include(matrix.matrixName))
      })
  })
})
