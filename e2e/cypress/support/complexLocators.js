import { devMenu, menuEl } from './locators'

export const submitPost = '.ant-modal-footer > .ant-btn-primary'
export const getSkill = name => `[data-cy=${name}] > [data-cy=skills_name] > .ant-tag`
export const inputSkill = id => cy.get('.ant-select-selector').eq(id)
export const postData = id => cy.get('.sc-gPEVay > span.ant-typography').eq(id)
export const postTitle = id => cy.get('.sc-gPEVay > h3.ant-typography').eq(id)
export const addSkill = id => cy.get('.ant-btn-link').eq(id)
export const getSelectItem = id => cy.get('.ant-select-tree-switcher').eq(id)
export const addNewReviewer = '[style="display: flex;"] > :nth-child(1) > .ant-btn > span'
export const getListOfMatrix = () =>
  cy.get(
    '[data-cy=matrix-tabs] > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab',
  )

export const filterSkillsName = (name, arr) =>
  arr
    .filter(el => el.level.name === name && !el.skill.isMatrixOnly)
    .map(val => val.skill.name)
    .sort()

export const hasKeyAndValue = (obj, key, value) => {
  expect(obj.hasOwnProperty(key)).equal(true)
  expect(obj[key]).equal(value[key])
}

export const checkKeyValueExist = (obj, values) =>
  Object.keys(values).forEach(el => hasKeyAndValue(values, el, obj))

Cypress.Commands.add('checkIfElementPresent', (visibleEl, text) => {
  cy.document().then(doc => {
    if (doc.querySelectorAll(`[data-cy=${visibleEl}]`).length) {
      cy.getElement(visibleEl).should('have.text', text)

      return
    }
    cy.getElement(visibleEl).should('not.exist')
  })
})

Cypress.on('uncaught:exception', () => {
  return false
})

Cypress.Commands.add('elementIsPresent', el =>
  cy.document().then(doc => !!doc.querySelectorAll([el]).length),
)
Cypress.Commands.add('addRole', (name = 'SUPERUSER') => {
  cy.get(devMenu.items).click({ multiple: true })
  cy.get(devMenu.item).contains(name).click({ force: true })
  cy.get(menuEl.allMenu).should('be.visible')
})

Cypress.Commands.add('elementIsPresent', el =>
  cy.document().then(doc => !!doc.querySelectorAll([el]).length),
)

Cypress.Commands.add('deleteAllSkills', (el, removeEl) => {
  cy.elementIsPresent(el).then(bool => {
    if (bool) {
      cy.get(el).then(() => cy.get(removeEl).click({ multiple: true }))
    }
  })
})

Cypress.Commands.add('editSkills', idx => {
  addSkill(idx).click()
  inputSkill(idx).click()
  cy.get('.anticon-check').should('have.class', 'anticon-check')
})

Cypress.Commands.add('spinnerDisappear', el => {
  cy.get(el).should('be.visible')
  cy.get(el).should('not.exist')
})

Cypress.Commands.add('getResponse', (arg, aliasName) => {
  cy.intercept('/graphql', req => {
    const data = `${req.body.operationName} ${req.body.query}`

    if (arg.every(el => data.includes(el))) {
      req.alias = aliasName
    }
  })
})

Cypress.Commands.add('mockResponse', (arg, mockData) => {
  cy.intercept('/graphql', req => {
    const data = `${req.body.operationName} ${req.body.query}`

    if (arg.every(el => data.includes(el))) {
      req.reply(mockData)
    }
  })
})

Cypress.Commands.add('compareTwoJson', (alias, expectJson) => {
  cy.wait(`@${alias}`).then(val => {
    if (val.response) {
      const res = val.response.body

      expect(res).to.deep.equal(expectJson)

      return
    }
    console.log('ERROR:', val)
  })
})

Cypress.Commands.add('shouldBeCalled', (alias, timesCalled) => {
  expect(
    cy.state('requests').filter(call => call.alias === alias),
    `${alias} should have been called ${timesCalled} times`,
  ).to.have.length(timesCalled)
})
