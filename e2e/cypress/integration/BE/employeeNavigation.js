import { email } from '../../support/client/employeeData'
import { getEmployee } from '../../support/getData'
import { checkKeyValueExist } from '../../support/complexLocators'
import {
  matrixEmployees,
  skillData,
  matrix,
  matrixBody,
  grade,
  group,
  skills,
} from '../../support/client/matrices'
import { checkTwoString } from '../../support/utils'
import { query } from '../../fixtures/query'

describe(`Check employee matrices`, () => {
  let response
  let request
  let employeeData

  const OPERATION_NAME = 'getEmployeeMatrices'

  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.post(getEmployee(email('employee'))).then(res => {
      const { data } = res.body

      employeeData = { ...data.employeeByEmail }
    })
    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit('/profile/matrices?tab=matrices')
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('check request body', () => {
    checkTwoString(query.getAllEmployeeMatrices, request.query)
    expect(request.operationName).equal(OPERATION_NAME)
  })

  it('Check matrixEmployees keys', () => {
    const { id, name, __typename } = employeeData
    const { employees } = response

    expect(employees).to.be.a('array')
    cy.compareObjectsKeys(employees[0], matrixEmployees(id, name, __typename))
  })

  it('Check matrixEmployees values', () => {
    const { id, name, __typename } = employeeData
    const { employees } = response

    employees.forEach(el => {
      expect(el.matrices).to.be.a('array')
      expect(el.isMe).to.be.a('boolean')
      // employee data is present
      checkKeyValueExist(el, { id, name, __typename })
    })
  })

  it('Check matrix', () => {
    const { employees } = response

    employees.forEach(el =>
      el.matrices.forEach(val => {
        cy.compareObjectsKeys(val, matrix)
        expect(val.__typename).equal(matrix.__typename)
      }),
    )
  })

  it('Check access', () => {
    const { employees } = response

    employees.forEach(el =>
      el.matrices.forEach(val => expect(val.access).to.deep.equal(matrix.access)),
    )
  })

  it('Check matrixBody', () => {
    const { employees } = response
    employees.forEach(el => el.matrices.forEach(val => cy.compareObjectsKeys(val.body, matrixBody)))
  })

  it('Check grades', () => {
    const firstEmployee = response.employees[0]
    //matrixBody
    firstEmployee.matrices.forEach(el => {
      const firstGrade = el.body.grades[0]

      cy.compareObjectsKeys(firstGrade, grade)
      expect(firstGrade.__typename).equal(grade.__typename)
    })
  })

  it('Check groups', () => {
    const firstEmployee = response.employees[0]
    //matrixBody
    firstEmployee.matrices.forEach(el => {
      const firstGroup = el.body.groups[0]

      cy.compareObjectsKeys(firstGroup, group)
      expect(firstGroup.__typename).equal(group.__typename)
    })
  })

  it('Check skills', () => {
    const firstEmployee = response.employees[0]
    //matrixBody
    firstEmployee.matrices.forEach(el => {
      const firstSkill = el.body.skills[0]
      const { skill } = firstSkill

      cy.compareObjectsKeys(firstSkill, skills)
      cy.compareObjectsKeys(skill, skillData)
      expect(firstSkill.__typename).equal(skills.__typename)
      expect(skill.__typename).equal(skillData.__typename)
    })
  })
})
