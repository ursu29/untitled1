import { checkKeyValueExist } from '../../support/complexLocators'
import {email} from '../../support/client/employeeData'
import {getEmployee} from "../../support/getData";

describe('Check Employee', () => {
  let employeeData

  before(() => {
    cy.setToken('employee')

    cy.post(getEmployee(email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data

      employeeData = employeeByEmail
    })
  })

  it('getEmployee response', () => {
    const {bonuses, email, id, isMe, location, name, phoneNumber, position, __typename} = employeeData

    cy.getResponse(['getEmployee', 'agileManager'], 'alias')
    cy.visit('/profile')

    cy.wait('@alias').then(req => {
      const { data } = req.response.body

      checkKeyValueExist(data.employeeByEmail, {
        bonuses,
        email,
        id,
        isMe,
        location,
        name,
        phoneNumber,
        position,
        __typename,
      })
    })
  })
})
