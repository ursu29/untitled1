import { query } from '../fixtures/query'

const URL = 'https://portal.dev.sidenis.com/graphql'
export const LOCATIONS = ['Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zürich']

Cypress.Commands.add('post', (body, superUser = null, methodName = 'POST') => {
  return cy.request({
    url: URL,
    method: methodName,
    headers: {
      authorization: `Bearer ${Cypress.env('accessToken')}`,
      'content-type': 'application/json',
      'dev-only-user-role': superUser,
    },
    body: body,
  })
})

// need to simplify all this request body
export const getManager = id => ({
  operationName: 'GetEmployeeManager',
  variables: { input: { id: id } },
  query: query.getManager,
})

export const getClient = () => ({
  operationName: null,
  variables: {},
  query: query.getClient,
})

export const getProjects = id => ({
  operationName: 'GetEmployeeProjects',
  variables: { input: { id: id } },
  query: query.getProjects,
})

export const getEmployeeExperiences = id => ({
  operationName: 'getEmployeeExperiences',
  variables: { input: { id: id } },
  query: query.getEmployeeExperiences,
})

export const getEmployee = email => ({
  operationName: 'getEmployee',
  variables: { email: email },
  query: query.getEmployee,
})

export const createTraining = (title, description, responsibleMail, optional = false) => ({
  operationName: 'createOnboardingTicket',
  variables: {
    input: {
      title,
      description,
      responsibleMail,
      isOptional: optional,
    },
  },
  query: query.createTraining,
})

export const createBookmark = (title, link, skills) => ({
  operationName: 'createBookmark',
  variables: {
    input: {
      title,
      link,
      skills,
    },
  },
  query: query.createBookmark,
})

export const completeTicket = id => ({
  operationName: 'completeOnboardingTicket',
  variables: {
    input: { id },
  },
  query: query.completeTicket,
})

export const toggleBookmarklike = bookmark => ({
  operationName: 'toggleBookmarklike',
  variables: {
    input: { bookmark },
  },
  query: query.toggleBookmarklike,
})

export const deleteBookmark = id => ({
  operationName: 'deleteBookmark',
  variables: {
    input: { id },
  },
  query: query.deleteBookmark,
})

export const deleteTraining = id => ({
  operationName: 'deleteOnboardingTicket',
  variables: {
    input: { id },
  },
  query: query.deleteTraining,
})

export const getEmployees = location => ({
  operationName: 'getEmployees',
  variables: { input: { locations: location } },
  query: query.getEmployees,
})

export const getEmployeeTickets = () => ({
  operationName: 'employeeOnboardingTickets',
  variables: {},
  query: query.getEmployeeTickets,
})

export const getOfficeDays = (startDate, count = 7) => ({
  operationName: 'getOfficeDays',
  variables: { input: { startDate, count } },
  query: query.getOfficeDays,
})

export const getAllSkills = () => ({
  operationName: 'getSkills',
  variables: {},
  query: query.allSkills,
})

export const getAllMatrices = () => ({
  operationName: null,
  variables: {},
  query: query.getAllMatrices,
})

export const getFirstPosts = () => ({
  operationName: 'getPosts',
  variables: { first: 4, filter: { tags: [] } },
  query: query.getFirstPost,
})

export const getTags = () => ({
  operationName: null,
  variables: {},
  query: query.tags,
})

export const updateEmployee = (id, agileManager) => ({
  operationName: updateEmployee,
  variables: { input: { id, agileManager } },
  query: query.updateEmp,
})

export const createProcess = (
  process = '5fd3706d6bedc2001cbc528b',
  locations = ['5e56a0129ff50b001c34a41b', '5e56a01f9ff50b001c34a41c'],
  project = 'b8dccc35-d0d1-410c-9352-637fa752529f',
) => ({
  operationName: 'createProcessExecution',
  variables: { input: { process, locations, project } },
  query: query.createProcess,
})

export const toggleHoldProcess = id => ({
  operationName: 'toggleHoldProcessExecution',
  variables: { input: { id } },
  query: query.holdProcess,
})

export const getProcessExecutions = id => ({
  operationName: 'getProcessExecutions',
  variables: { input: { id } },
  query: query.getProcessExecutions,
})

export const getAllProcess = () => ({
  operationName: null,
  variables: {},
  query: query.getAllProcess,
})

export const updateProcess = (
  employee,
  employeePhone,
  id,
  finishDate = '2020-12-07T10:33:45.945Z',
) => ({
  operationName: 'updateProcessExecution',
  variables: {
    input: {
      employee,
      employeePhone,
      finishDate,
      id,
    },
  },
  query: query.updateProcess,
})

export const updatePost = (body, id, isTranslated, title) => ({
  operationName: 'updatePost',
  variables: {
    input: {
      body,
      id,
      images: [],
      isPublic: false,
      isTranslated,
      locations: [],
      tags: ['5df72a93458463001cbe6ebb', '5df8809d458463001cbe6ec6'],
      title,
    },
  },
  query: query.updatePost,
})

export const setHeaders = (role = 'superUser') => ({
  accept: '*/*',
  authorization: `Bearer ${Cypress.env('accessToken')}`,
  'content-type': 'application/json',
  'dev-only-user-role': role,
  'x-timezone-offset': -180,
})
