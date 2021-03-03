import { query } from '../fixtures/query'
import { employeeData } from './client/employeeData'
import { mainCity } from './locators'

export const URL = 'https://portal.dev.syncretis.com/graphql'
export const TIMEMASTER = 'https://timemaster.syncretis.com/'
export const LOCATIONS = ['Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zurich']
export const TAGS = ['6030dd7ef84074001c07ebb5', '6030dd7ef84074001c07ebb6']

const { email } = employeeData.employee

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

export const getEmployeesData = () => cy.readFile('cypress/fixtures/employees.json')
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
  operationName: 'getEmployeeProjects',
  variables: { id },
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

export const createTraining = (title, description, responsible, optional = false) => ({
  operationName: 'createOnboardingTicket',
  variables: {
    input: {
      title,
      description,
      responsible,
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

export const applyDay = (date, location = 'SAINT_PETERSBURG') => ({
  operationName: 'apply',
  variables: { input: { date, location } },
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

export const attachMatrixToEmployee = (matrix, employee) => ({
  operationName: 'attachMatrixToEmployee',
  variables: {input: {matrix, employee}},
  query: query.attachMatrixToEmployee,
})

export const allEmployeeMatrices = (userId) => ({
  operationName: 'getEmployeeMatrices',
  variables: {input: {id: userId}},
  query: query.getAllEmployeeMatrices,
})

export const updateExperience = (matrixId, level, comment) => ({
  operationName: 'updateExperience',
  variables: {input: {id: matrixId, level, comment}},
  query: query.updateExperience,
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
  query: query.tags,
})

export const getGuildsTitle = () => ({
  operationName: 'getGuilds',
  variables: {},
  query: query.guild,
})

export const addJob = (
  employeeId = employeeData.employee.id,
  jobId = '602cd507bb916c001c541b9a',
  company = '',
  dateEnd = null,
  dateStart = null,
  level = '',
  position = '',
  project = '',
  responsibilities = '',
) => ({
  operationName: 'updateCurriculumVitae',
  variables: {
    input: {
      employee: employeeId,
      id: jobId,
      vitaes: [{ company, dateEnd, dateStart, level, position, project, responsibilities }],
    },
  },
  query: query.addJob,
})

export const deleteJob = (jobId, employeeId) => ({
  operationName: 'updateCurriculumVitae',
  variables: { input: { id: jobId, employee: employeeId, vitaes: [] } },
  query: query.addJob,
})

export const getCV = (employeeEmail = email) => ({
  operationName: 'getEmployeeCV',
  variables: { email: employeeEmail },
  query: query.getCV,
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

export const getArchivedDPVersions = email => ({
  operationName: 'archivedDPVersions',
  variables: { input: { employee: email } },
  query: query.archivedDPVersions,
})

export const updateEmployee = (id, agileManager) => ({
  operationName: 'updateEmployee',
  variables: { input: { id, agileManager } },
  query: query.updateEmp,
})

export const createProcess = (
  process = '602b73cdb47506001d900f24',
  locations = [mainCity],
  prio = 3,
) => ({
  operationName: 'createProcessExecution',
  variables: { input: { process, locations, prio } },
  query: query.createProcessExecution,
})

export const createNewProcess = (title, type, customer) => ({
  operationName: 'createProcess',
  query: query.createNewProcess,
  variables: { input: { title, type, customer } },
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

export const deleteProcess = id => ({
  operationName: 'deleteProcess',
  variables: { id },
  query: query.deleteProcess,
})

export const updatePost = (body, id, title) => ({
  operationName: 'updatePost',
  variables: {
    input: {
      body,
      id,
      images: [],
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
