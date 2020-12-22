import { getEmployeeAttributes } from '../../api/requests'
import { codeOkAndBodyNotNull } from '../../support/utils'
import { employeeData as EmployeeData } from '../../support/client/employeeData'

describe('Check bonuses presence and availability. Requires real environment.', () => {
  beforeEach(() => {
    cy.setToken('employee')
  })

  const idUserTest = EmployeeData.employee.id
  const idUserAlexey = 'Alexey.Avdeev@sidenis.com'

  //made with Test Employee credentials
  it('As employee I can see my own bonus', () => {
    getEmployeeAttributes('id bonuses isMe', idUserTest).then(response => {
      codeOkAndBodyNotNull(response)
      expect(response.body.data.employee.id).equal(idUserTest)
      expect(response.body.data.employee.isMe).equal(true)
      //expect(response.body.data.employee.bonuses).to.not.be.oneOf([null, ''])  //uncommit whe Test Employee will get bonuses!
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
