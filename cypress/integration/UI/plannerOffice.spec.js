import { table, spinner, postEl, matrix } from '../../support/locators'
import { getEmployees } from '../../support/getData'
import {
  planner,
  officeDays,
  todaysDate,
  pastDay,
  employeeLimit,
  employeeMaxCount,
  filterEmployeesCount,
} from '../../support/officePlanner/officeDays'

const LOCATIONS = ['Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zürich']

describe('Office planner', () => {
  context('Check default values', () => {
    const count = 5
    let allEmployees = 0

    before(() => {
      cy.setToken('employee')
      cy.post(getEmployees(['SAINT_PETERSBURG'])).then(res => {
        allEmployees = res.body.data.employees.length
      })
      cy.mockResponse(['getOfficeDays'], officeDays(count, count, todaysDate))
      cy.visit('/office-planner')
    })

    beforeEach(() => {
      cy.restoreLocalStorage()
    })
    afterEach(() => {
      cy.saveLocalStorage()
    })

    it('Right number of employees', () => {
      cy.waitElDisappear(spinner.active)
      cy.get(table.activeTab)
        .eq(0)
        .then(val => {
          expect(val.text()).contains(
            ` ${employeeLimit(count)} of ${employeeMaxCount(allEmployees, count)}`,
          )
        })
      cy.get('.ant-table-cell')
        .eq(1)
        .then(val => expect(val.text()).contains(`0 of ${employeeMaxCount(allEmployees, 0)}`))
    })

    it('Check default values', () => {
      LOCATIONS.forEach(el =>
        cy.get(matrix.matrixTabs).then(tab => expect(tab.text()).contains(el)),
      )
      ;['Previous week', 'This week', 'Next week'].forEach(el =>
        cy.get('.ant-btn').contains(el).should('be.visible'),
      )
    })

    it('Check employees count', () => {
      cy.getElement(planner.sum).then(el => expect(el.text()).contains(allEmployees))
    })
  })

  context('One employee', () => {
    const count = 1
    let allEmployees = 0

    before(() => {
      cy.setToken('employee')
      cy.post(getEmployees(['SAINT_PETERSBURG'])).then(
        res => (allEmployees = res.body.data.employees.length),
      )
      cy.mockResponse(['getOfficeDays'], officeDays(count, count, todaysDate))
      cy.visit('/office-planner')
    })

    beforeEach(() => {
      cy.restoreLocalStorage()
    })
    afterEach(() => {
      cy.saveLocalStorage()
    })

    it('Check one employee', () => {
      cy.waitElDisappear(spinner.active)
      cy.get(table.activeTab)
        .eq(0)
        .then(val => {
          expect(val.text()).contains(
            ` ${employeeLimit(count)} of ${employeeMaxCount(allEmployees, count)}`,
          )
        })
    })
  })

  context('Check date', () => {
    let allDates
    before(() => {
      cy.setToken('employee')
      cy.getResponse(['getOfficeDays'], 'alias')

      cy.visit('/office-planner')
      cy.wait('@alias').then(el => {
        const { data } = el.response.body

        allDates = data.officeDays.map(empl => empl.date)
      })
    })

    beforeEach(() => {
      cy.restoreLocalStorage()
    })
    afterEach(() => {
      cy.saveLocalStorage()
    })

    it('Check button state', () => {
      if (allDates.includes(pastDay)) {
        cy.get(postEl.buttonSwitch).eq(0).should('have.class', 'ant-switch-disabled')

        return
      }
      cy.get(postEl.buttonSwitch).eq(0).should('not.have.class', 'ant-switch-disabled')
    })
  })

  context('Change employee day', () => {
    let allDays
    before(() => {
      cy.setToken('employee')
      cy.getResponse(['getOfficeDays'], 'alias')

      cy.visit('/office-planner')
      cy.wait('@alias').then(el => {
        const { data } = el.response.body

        allDays = data.officeDays
      })
    })

    beforeEach(() => {
      cy.restoreLocalStorage()
    })
    afterEach(() => {
      cy.saveLocalStorage()
    })

    it('Compare employeeCount', () => {
      cy.get('.office-planner-active > .ant-switch').click({ multiple: true, force: true })
      cy.getResponse(['apply'], 'alias')
      cy.wait('@alias').then(el => {
        const { data } = el.response.body
        const getCount = data => data[0].employeeCount

        expect(getCount(filterEmployeesCount(allDays, todaysDate))).not.be.equal(
          getCount(filterEmployeesCount(data.officeDays, todaysDate)),
        )
      })
    })
  })
})
