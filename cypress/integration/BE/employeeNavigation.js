import { email, employeeData } from '../../support/client/employeeData'
import { getEmployee } from '../../support/getData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { bookmarkAccess, bookmark } from '../../support/client/userMenu'
import {
  matrixEmployees,
  skillData,
  matrix,
  matrixBody,
  grade,
  group,
  skills,
} from '../../support/client/matrices'

describe(`Check employee getBookmarks`, () => {
  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { data } = res.body

      employeeData.employee = { ...data.employeeByEmail }
    })
  })

  it('getBookmarks response', () => {
    const { email, id, name, __typename } = employeeData.employee

    cy.getResponse(['getBookmarks'], 'alias')
    cy.visit('/client/profile/bookmarks')

    cy.wait(`@alias`).then(val => {
      const { bookmarks } = JSON.parse(val.response.body).data

      expect(bookmarks).to.be.a('array')
      cy.compareObjectsKeys(bookmarks[0], bookmark)

      bookmarks.forEach(el => {
        expect(el.access).to.deep.equal(bookmarkAccess)
        expect(el.likes).to.be.a('array')
        expect(el.skills).to.be.a('array')
        // employee data is present
        checkKeyValueExist(el.employee, { email, id, name, __typename })
      })
    })
  })
})

describe(`Check employee matrices`, () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { data } = res.body

      employeeData.employee = { ...data.employeeByEmail }
    })
    cy.getResponse(['getEmployeeMatrices'], 'alias')
    cy.visit('/client/profile/matrices')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('Check matrixEmployees keys', () => {
    const { id, name, __typename } = employeeData.employee
    const { employees } = response

    expect(employees).to.be.a('array')
    cy.compareObjectsKeys(employees[0], matrixEmployees(id, name, __typename))
  })

  it('Check matrixEmployees values', () => {
    const { id, name, __typename } = employeeData.employee
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
