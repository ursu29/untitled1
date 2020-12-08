import { agileManager } from './employeeData'
import { generateObjects, mergeObjects } from '../utils'

export const trainingData = {
  title: 'react',
  description: 'how to use hooks?',
  responsible: agileManager.email,
}

export const ticket = (
  isOptional = false,
  isSwissRe = false,
  trainingId = '5f904c2fe384ea001c0dd265',
) => ({
  description: trainingData.description,
  id: trainingId,
  responsible: null,
  isOptional,
  isRequestedByMe: null,
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
}

export const mixTrainings = () =>
  mergeObjects([
    generateObjects(1, ticket(false, false)),
    generateObjects(1, ticket(true, false, '5f904c2fe384ea001c0dd211')),
    generateObjects(1, ticket(true, true, '5f904c2fe384ea001c0dd211')),
    generateObjects(1, ticket(false, false, '5f904c2fe384ea001c0dd211')),
  ])
