import { matrixEl } from '../../../support/client/matrices'
import { checkElementsInArray } from '../../../support/utils'

xdescribe('Check streams', () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.getResponse(['getStream'], 'alias')
    cy.visit('/guilds/community-frontend/streams')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  it('Check streams data', () => {
    cy.get('.ant-tabs-tab').eq(2).should('have.class', 'ant-tabs-tab-active')

    const { streams } = response

    if (streams.length) {
      checkElementsInArray(streams, '__typename', 'Stream')

      // check first title
      const { name, comments, likes, views } = streams[0]

      cy.get(matrixEl.name)
        .eq(0)
        .then(el => expect(el.text()).equal(name))
      ;[views, comments, likes].forEach((info, idx) => {
        cy.get(matrixEl.info)
          .eq(idx)
          .then(el => expect(el.text()).equal(info.toString()))
      })
    }
  })
})
