import { agileManager } from './employeeData'
export const trainingData = {
  title: 'react',
  description: 'how to use hooks?',
  responsible: agileManager.email,
}

export const ticket = trainingId => ({
  description: trainingData.description,
  id: trainingId,
  responsible: [],
  title: trainingData.title,
  __typename: 'OnboardingTicket',
})
