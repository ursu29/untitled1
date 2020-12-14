import { agileManager } from './employeeData'
import { generateObjects, mergeObjects } from '../utils'
import { employeeData } from './employeeData'
import { todaysDate } from '../officePlanner/officeDays'

const { email, id, name, position } = employeeData.employee

export const trainingData = {
  title: `new title: ${todaysDate}`,
  description: 'how to use hooks?',
  responsible: agileManager.email,
}

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
) => ({
  description: trainingData.description,
  id: trainingId,
  responsible,
  isOptional,
  isRequestedByMe,
  isSwissRe,
  title: trainingData.title,
  __typename: 'OnboardingTicket',
})

export const createTickets = data => ({
  data: {
    onboardingTickets: data,
  },
})

export const trainingLocators = {
  ticket: '.iZJrxq',
  sendEmail: 'sendEmail',
  count: 'count',
  activeTab: '.ant-tabs-tabpane-active',
}

export const mixTrainings = () =>
  mergeObjects([
    generateObjects(1, ticket(false, false)),
    generateObjects(1, ticket(false, true, '5f904c2fe384ea001c0dd234')),
    generateObjects(1, ticket(true, false, '5f904c2fe384ea001c0dd211')),
  ])

export const responsibleEmployeeTrainings = () =>
  mergeObjects([
    generateObjects(
      1,
      ticket(false, false, '5f904c2fe384ea001c0dd211', [responsible(email, id, name, position)]),
    ),
    generateObjects(1, ticket(true, false)),
  ])
