import { matrixEl } from '../../../support/client/matrices'
import {checkElementsInArray, checkTwoString} from '../../../support/utils'
import {query} from "../../../fixtures/query";

describe('Check streams', () => {
  let response
  let request

  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.getResponse(['getStream'], 'alias')
    cy.visit('/guilds/Community-Frontend/streams')
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('check request body', () => {
    checkTwoString(query.getStream, request.query)
    expect(request.operationName).equal('getStream')
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
