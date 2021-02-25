import { oneTwoOne, popUp, employeeData } from '../../support/client/employeeData'
import { response, oneTwoOneLocators } from '../../support/client/oneTwoOne'
import { skillEl } from '../../support/locators'

describe('Check oneTwoOne request', () => {
  const { id } = employeeData.employee

  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  context('Check oneTwoOne request', () => {
    before(() => {
      cy.mockResponse(['one2oneRequest'], response(id, false)).as('alias')
      cy.visit('/')
      cy.wait('@alias').then(() => cy.getElement(oneTwoOne.button).click())
    })
    it('Check oneTwoOne popup', () => {
      cy.get(popUp.title).should('contain.text', oneTwoOne.text)
      cy.get(popUp.button).contains('No').click()
      cy.get(oneTwoOne.disableBtn).should('not.exist')
    })

    it('Check update oneTwoOne request', () => {
      cy.getElement(oneTwoOne.button).click()

      cy.intercept('/graphql', req => {
        if (req.body.operationName.includes('updateEmployee')) {
          const { input } = req.body.variables

          expect(input.id).equal(id)
          expect(input.one2oneRequest).equal(true)
        }
      })
      cy.get(popUp.button).contains('Yes').click()
      cy.get(skillEl.successMes).should('have.text', 'Updated')
    })
  })

  context('Check disable oneTwoOne request', () => {
    it('Disable oneTwoOne request', () => {
      cy.setToken('manager')
      cy.setImgToken('employee')

      cy.mockResponse(['one2oneRequest'], response(id, true)).as('alias')
      cy.visit('/')
      cy.getElement(oneTwoOne.button).then(el => expect(el.text()).contains('1-2-1 request'))
      cy.wait('@alias').then(() => cy.get(oneTwoOne.disableBtn).should('exist'))
    })
  })

  context('Check Manager oneTwoOne', () => {
    before(() => {
      cy.setToken('manager')
      cy.setImgToken('employee')

      cy.visit('client/profile/employees')
    })

    beforeEach(() => {
      cy.restoreLocalStorage()
    })
    afterEach(() => {
      cy.saveLocalStorage()
    })

    it('Confirm meeting', () => {
      cy.get(oneTwoOneLocators.bargeSm).should('exist')
      cy.get(oneTwoOneLocators.bargeCount)
        .eq(0)
        .then(el => expect(el.text()).contains('1-2-1'))
    })

    it('Confirm request', () => {
      cy.get(oneTwoOneLocators.closeOneTwoOne).eq(0).click()
      cy.get(popUp.title).should('contain.text', oneTwoOne.closeTitle)

      cy.intercept('/graphql', req => {
        if (req.body.operationName.includes('updateEmployee')) {
          const { input } = req.body.variables

          expect(input.id).equal(id)
          expect(input.one2oneRequest).equal(false)
        }
      })
      cy.get(popUp.button).contains('Yes').click()
      cy.get(skillEl.successMes).should('have.text', 'Updated')
      cy.get('.current').then(el =>
        cy.get(oneTwoOneLocators.closeOneTwoOne).its('length').should('eq', parseInt(el.text())),
      )
    })
  })
})
