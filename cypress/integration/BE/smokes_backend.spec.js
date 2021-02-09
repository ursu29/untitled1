import { postRequest } from '../../api/requests'
import { codeOkAndBodyNotNull } from '../../support/utils'

describe('Smokes backend. Requires real environment.', () => {
  beforeEach(() => {
    cy.setToken('employee')
  })

  it('Get projects', () => {
    cy.fixture('employee.json').then(body => {
      postRequest(body).then(response => {
        //we are using universal request here - when body doesn't need any replacements
        codeOkAndBodyNotNull(response)
        expect(response.body.data.projects).to.be.a('array')
      })
    })
  })
})
