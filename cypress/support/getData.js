import { query } from '../fixtures/query'
import {employeeData} from "./client/employeeData";

export const URL = 'https://portal.dev.syncretis.com/graphql'
export const TIMEMASTER = 'https://timemaster.syncretis.com/'
export const LOCATIONS = ['Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zürich']
export const TAGS = ['5e342a2c5d0413001cbb8287', '5e3d51be5d0413001cbb88b1']

const {email} = employeeData.employee

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

export const applyDay = (date, location= 'SAINT_PETERSBURG') => ({
  operationName: 'apply',
  variables: {input: {date, location}},
  query: query.applyDay,
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

export const getEmployeeMatrices = () => ({
  operationName: null,
  variables: {},
  query: query.getEmployeeMatrices,
})

export const getWikiRootSections = () => ({
  operationName: 'getWikiRootSections',
  variables: {},
  query: query.getWikiRootSections,
})

export const getOnBoardingAccess = () => ({
  operationName: 'onboardingAccess',
  variables: {},
  query: query.onboardingAccess,
})

export const getTags = () => ({
  operationName: null,
  variables: {},
  query: query.tags
})

export const getGuildsTitle = () => ({
  operationName: 'getGuilds',
  variables: {},
  query: query.guild,
})

export const addJob = (
    employeeEmail= email,
    id= "60098d16a8239b001ce8bcec",
    company='test company',
    dateStart='',
    dateEnd='',
    level='4',
    position='front',
    project='portal',
    responsibilities='no responsibilities'
    ) => ({
    operationName: 'updateCurriculumVitae',
    variables: {input: {employeeEmail, id, vitaes: [{company, dateEnd, dateStart, level, position, project, responsibilities}]}},
    query: query.addJob
    })

export const deleteJob = (employeeEmail = email, id = "60098d16a8239b001ce8bcec") => ({
  operationName: 'updateCurriculumVitae',
  variables: {input: {employeeEmail, id, vitaes: []}},
  query: query.addJob
})

export const getCV = (employeeEmail = email) => ({
  operationName: 'getEmployeeCV',
  variables: {email: employeeEmail},
  query: query.getCV
})

export const getGetGuild = () => ({
  operationName: null,
  variables: {},
  query: query.guild,
})

export const getVacanciesId = () => ({
  operationName: 'getVacancies',
  variables: {},
  query: query.getVacanciesId,
})

export const getAllBookmarksId = () => ({
  operationName: 'getBookmarks',
  variables: {},
  query: query.allBookmarkId,
})

export const getBookmarks = () => ({
  operationName: 'getBookmarks',
  variables: {},
  query: query.getBookmarks,
})

export const getArchivedDPVersions = (email) => ({
  operationName: 'archivedDPVersions',
  variables: {input: {employeeAzureId: email}},
  query: query.archivedDPVersions,
})

export const updateEmployee = (id, agileManager) => ({
  operationName: 'updateEmployee',
  variables: { input: { id, agileManager } },
  query: query.updateEmp,
})

export const createProcess = (
  process = '600a9737a8239b001ce8bd2b',
  locations = ['5ece85750fc78f001ce934bc', '5ece85830fc78f001ce934bd'],
  project = 'guild-bonus',
) => ({
  operationName: 'createProcessExecution',
  variables: { input: { process, locations, project } },
  query: query.createProcess,
})

export const createNewProcess = (title, type, customer) => ({
  operationName: 'createProcess',
  query: query.createNewProcess,
  variables: {input: {title, type, customer}},
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

export const deleteProcess = (id) => ({
  operationName: 'deleteProcess',
  variables: {input: {id}},
  query: query.deleteProcess
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
      tags: TAGS,
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
