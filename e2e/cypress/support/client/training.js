import { generateObjects, mergeObjects } from '../utils'
import { employeeData } from './employeeData'
import { todaysDate } from '../officePlanner/officeDays'

const { email, id, name, position } = employeeData.employee

export const trainingData = idManager => ({
  title: `new title: ${todaysDate}`,
  description: 'how to use hooks?',
  responsible: idManager,
})

export const responsible = (email, id, name, position) => ({
  email,
  id,
  name,
  position,
  __typename: 'Employee',
})

export const ticket = (
  isOptional = false,
  isSwissRe = false,
  trainingId = '5f904c2fe384ea001c0dd265',
  responsible = null,
  isRequestedByMe = null,
  idManager
) => ({
  description: trainingData(idManager).description,
  id: trainingId,
  responsible,
  isOptional,
  isRequestedByMe,
  isSwissRe,
  title: trainingData(idManager).title,
  __typename: 'OnboardingTicket',
})

export const createTickets = data => ({
  data: {
    onboardingTickets: data,
  },
})

export const trainingLocators = {
  ticket: 'ticket',
  sendEmail: 'sendEmail',
  count: 'count',
  activeTab: '.ant-tabs-tabpane-active',
}

// need all this horror to simplified
export const mixTrainings = (managerId) =>
  mergeObjects([
    generateObjects(1, ticket(false, false, '5f904c2fe384ea001c0dd265', null, null, managerId)),
    generateObjects(1, ticket(false, true, '5f904c2fe384ea001c0dd234',null, null, managerId)),
    generateObjects(1, ticket(true, false, '5f904c2fe384ea001c0dd211',null, null, managerId)),
  ])

export const responsibleEmployeeTrainings = (managerId) =>
  mergeObjects([
    generateObjects(
      1,
      ticket(false, false, '5f904c2fe384ea001c0dd211', [responsible(email, id, name, position)], null, managerId),
    ),
    generateObjects(1, ticket(true, false, '5f904c2fe384ea001c0dd265', null, null, managerId)),
  ])
