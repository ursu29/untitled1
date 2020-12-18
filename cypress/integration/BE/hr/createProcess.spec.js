import {
  createProcess,
  toggleHoldProcess,
  getProcessExecutions,
  getAllProcess,
  updateProcess,
} from '../../../support/getData'
import { filterBy } from '../../../support/utils'

describe('create new process', () => {
  let newProjectId
  let allOffboarding
  let allRotation

  const randomNumber = new Date().getTime().toString()
  const filterByProcess = (arr, key, name) => arr.filter(el => el.process[key] === name)
  const name = 'Test Name'

  beforeEach(() => {
    cy.setToken('manager')
    cy.post(getAllProcess(), 'superUser').then(req => {
      const { processExecutions } = req.body.data

      allOffboarding = filterByProcess(processExecutions, 'type', 'offboarding')
      allRotation = filterByProcess(processExecutions, 'type', 'rotation')
    })
  })

  it('create process', () => {
    cy.post(createProcess(), 'superUser').then(res => {
      debugger
      const { createProcessExecution } = res.body.data
      const { id, __typename } = createProcessExecution
      newProjectId = id

      expect(__typename).equal('ProcessExecution')
      expect(id.length).to.be.greaterThan(0)
    })
  })

  it('on hold', () => {
    cy.post(toggleHoldProcess(newProjectId), 'superUser').then(req => {
      const { toggleHoldProcessExecution } = req.body.data
      const { id, __typename } = toggleHoldProcessExecution
      newProjectId = id

      expect(__typename).equal('ProcessExecution')
      expect(id.length).to.be.greaterThan(0)
    })
  })

  it('resume task', () => {
    cy.post(getProcessExecutions(newProjectId), 'superUser').then(req => {
      const { processExecutions } = req.body.data
      const { id, __typename, status } = processExecutions[0]
      newProjectId = id

      expect(__typename).equal('ProcessExecution')
      expect(id.length).to.be.greaterThan(0)
      expect(status).equal('holding')
    })
  })

  it('save offBoarding task', () => {
    const firstId = filterBy(allOffboarding, 'status', 'running')[0].id

    cy.post(updateProcess(name, randomNumber, firstId), 'superUser').then(req => {
      const { id, __typename } = req.body.data.updateProcessExecution

      expect(__typename).equal('ProcessExecution')
      expect(id).equal(firstId)
    })
  })

  it('save rotation task', () => {
    const firstId = filterBy(allRotation, 'status', 'running')[0].id

    cy.post(updateProcess(name, randomNumber, firstId), 'superUser').then(req => {
      const { id, __typename } = req.body.data.updateProcessExecution

      expect(__typename).equal('ProcessExecution')
      expect(id).equal(firstId)
    })
  })
})
