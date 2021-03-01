import {oneTwoOne, popUp, email} from '../../support/client/employeeData'
import { response, oneTwoOneLocators } from '../../support/client/oneTwoOne'
import { skillEl } from '../../support/locators'
import {getEmployee} from "../../support/getData";

describe('Check oneTwoOne request by employee', () => {
  let employeeData

    before(() => {
      cy.setToken('employee')
      cy.setImgToken('employee')
      cy.post(getEmployee(email('employee'))).then(res => employeeData = res.body.data.employeeByEmail)
    })
    it('Check oneTwoOne popup', () => {
      cy.mockResponse(['one2oneRequest'], response(employeeData.id, false)).as('alias')
      cy.visit('/')
      cy.wait('@alias').then(() => cy.getElement(oneTwoOne.button).click())

      cy.get(popUp.title).should('contain.text', oneTwoOne.text)
      cy.get(popUp.button).contains('No').click()
      cy.get(oneTwoOne.disableBtn).should('not.exist')
    })

    it('Check update oneTwoOne request', () => {
      cy.getElement(oneTwoOne.button).click()

      cy.intercept('/graphql', req => {
        if (req.body.operationName.includes('updateEmployee')) {
          const { input } = req.body.variables

          expect(input.id).equal(employeeData.id)
          expect(input.one2oneRequest).equal(true)
        }
      })
      cy.get(popUp.button).contains('Yes').click()
      cy.get(skillEl.successMes).should('have.text', 'Updated')
    })
})

describe('Check oneTwoOne request by manager', () => {
  let employeeData
    before(() => {
      cy.window().then((window) => {
        window.sessionStorage.clear();
        window.localStorage.clear();
      })
      cy.setToken('manager')
      cy.setImgToken('manager')
      cy.post(getEmployee(email('employee'))).then(res => employeeData = res.body.data.employeeByEmail)

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

          expect(input.id).equal(employeeData.id)
          expect(input.one2oneRequest).equal(false)
        }
      })
      cy.get(popUp.button).contains('Yes').click()
      cy.get(skillEl.successMes).should('have.text', 'Updated')
    })
})
