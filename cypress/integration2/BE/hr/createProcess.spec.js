import * as data from '../../../support/getData'
import { filterBy } from '../../../support/utils'
import {deleteProcess} from "../../../support/getData";

describe('create new process', () => {
  let newProjectId
  let processId
  let allOffboarding
  let allRotation

  const randomNumber = new Date().getTime().toString()
  const filterByProcess = (arr, key, name) => arr.filter(el => el.process[key] === name)
  const name = 'Test Name'

  beforeEach(() => {
    cy.setToken('manager')
    cy.post(data.getAllProcess(), 'superUser').then(req => {
      const { processExecutions } = req.body.data

      allOffboarding = filterByProcess(processExecutions, 'type', 'offboarding')
      allRotation = filterByProcess(processExecutions, 'type', 'rotation')
    })
  })

  it('Create main process', () => {
    cy.post(data.createNewProcess('offBoarding', 'onboarding', 'internal'), 'superUser').then(res => {
      const {createProcess} = res.body.data

      processId = createProcess.id
    })
  })

  it('create process', () => {
    cy.post(data.createProcess(processId), 'superUser').then(res => {
      const { createProcessExecution } = res.body.data
      const { id, __typename } = createProcessExecution
      newProjectId = id

      expect(__typename).equal('ProcessExecution')
      expect(id.length).to.be.greaterThan(0)
    })
  })

  it('on hold', () => {
    cy.post(data.toggleHoldProcess(newProjectId), 'superUser').then(req => {
      const { toggleHoldProcessExecution } = req.body.data
      const { id, __typename } = toggleHoldProcessExecution
      newProjectId = id

      expect(__typename).equal('ProcessExecution')
      expect(id.length).to.be.greaterThan(0)
    })
  })

  it('resume task', () => {
    cy.post(data.getProcessExecutions(newProjectId), 'superUser').then(req => {
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

    cy.post(data.updateProcess(name, randomNumber, firstId), 'superUser').then(req => {
      const { id, __typename } = req.body.data.updateProcessExecution

      expect(__typename).equal('ProcessExecution')
      expect(id).equal(firstId)
    })
  })

  it('save rotation task', () => {
    const firstId = filterBy(allRotation, 'status', 'running')[0].id

    cy.post(data.updateProcess(name, randomNumber, firstId), 'superUser').then(req => {
      const { id, __typename } = req.body.data.updateProcessExecution

      expect(__typename).equal('ProcessExecution')
      expect(id).equal(firstId)
    })
  })

  it('delete process', () => {
   cy.post(deleteProcess(processId), 'superUser').then(res => expect(res.body.data.deleteProcess.id).equal(processId))
  })

})
