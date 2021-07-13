import { matrix, notificationsText, selfEvalForm } from '../../../support/locators'
import { getSubTabUrl } from '../../../support/utils'
import { todaysDate } from '../../../support/officePlanner/officeDays'

describe('update self Evaluation form', () => {
  const {needsBtn, exceedsBtn, meetsBtn, fillComment} = selfEvalForm
  const TEXT = `feedback: ${todaysDate}`

  before(() => {
    cy.setToken('manager')
    cy.setImgToken('manager')
  })

  it('successfully filled out the form state:Needs ImprovementMeets, requirements, Exceeds requirements', () => {
    cy.visit(getSubTabUrl('career', '/profile', 'evaluation'))

    ;[needsBtn, meetsBtn, exceedsBtn].forEach(el => {
      cy.getElement(el).first().click({force: true})

      cy.get(matrix.success).should('be.visible')
      cy.get(matrix.success).should('contain.text', notificationsText.updateSeF)
      cy.get(matrix.success).should('not.exist')
    })
  })

  it('add new comment', () => {
    cy.getElement(fillComment).first().click({force: true})
    cy.get('.ant-input').last().clear().type(TEXT)
    cy.get('span').contains('Cancel').click()
    cy.get(matrix.success).should('not.exist')

    cy.getElement(fillComment).first().click({force: true})
    cy.get('span').contains('Post').click()

    cy.get(matrix.success).should('be.visible')
    cy.get(matrix.success).should('contain.text', notificationsText.updateSeF)
    cy.get(matrix.success).should('not.exist')

    cy.getElement(fillComment).first().click({force: true})
    cy.get('.ant-input').last().then(el => expect(el.text()).equal(TEXT))
  })
})