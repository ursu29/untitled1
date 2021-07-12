import { matrix, postEl } from '../../../support/locators'
import { pastDay, todaysDate } from '../../../support/officePlanner/officeDays'

describe('successfully create new hobbies post', () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')
    cy.visit('/hobby')

  })

  it('post created successful', () => {
    cy.get(postEl.posts).should('be.visible')
    cy.getElement('createPost').click()
    cy.get(postEl.title).type(todaysDate)
    cy.get(postEl.writePost).type(`${todaysDate} ${pastDay}`)

    cy.scrollTo('bottom')

    cy.getId('portal-select').last().click()
    cy.get(matrix.item).eq(0).click()
    cy.get(postEl.delete).should('be.visible')

    cy.getElement('preview').click()
    cy.get('button').contains('Publish').click()

    cy.get(matrix.successMes).should('be.visible')
    cy.get(matrix.success).should('not.exist')
  })

})