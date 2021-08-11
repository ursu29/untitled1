import { getEmployeeAttributes } from '../../api/requests'
import { codeOkAndBodyNotNull } from '../../support/utils'
import {email} from '../../support/client/employeeData'
import {getEmployee} from "../../support/getData";

describe('Check bonuses presence and availability. Requires real environment. (e2e)', () => {
  let employeeId

  beforeEach(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {
      debugger
      const { employeeByEmail } = res.body.data
      employeeId = employeeByEmail.id
      debugger
    })
  })

  const idUserAlexey = 'Alexey.Avdeev@syncretis.com'

  //made with Test Employee credentials
  it('As employee I can see my own bonus', () => {
    getEmployeeAttributes('id bonuses isMe', employeeId).then(response => {
      codeOkAndBodyNotNull(response)


      expect(response.body.data.employee.id).equal(employeeId)
      expect(response.body.data.employee.isMe).equal(true)
      expect(response.body.data.employee.bonuses).to.not.be.oneOf([null, ''])
    })
  })

  it('As employee I can not see other persons bonuses', () => {
    getEmployeeAttributes('id bonuses isMe', idUserAlexey).then(response => {
      codeOkAndBodyNotNull(response)

      expect(response.body.data.employee.id).equal(idUserAlexey)
      expect(response.body.data.employee.isMe).equal(false)
      expect(response.body.data.employee.bonuses).to.be.oneOf([null, ''])
    })
  })
})
