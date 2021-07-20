import { query } from '../fixtures/query'
import { employeeData } from './client/employeeData'
import { mainCity } from './locators'
import {todayOfficePlannerDate} from "./officePlanner/officeDays";
import { getEmployeeData, managerData } from './authorization'

export const URL = 'https://portal.dev.syncretis.com/graphql'
export const exportUrl = name  => `https://portal.syncretis.com/${name}`
export const TIMEMASTER = 'https://timemaster.syncretis.com/'
export const LOCATIONS = ['Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zürich']
export const TAGS = ['6030dd7ef84074001c07ebb5', '6030dd7ef84074001c07ebb6']

const { email } = employeeData.employee

Cypress.Commands.add('post', (body, superUser = null, baseUrl = URL, methodName = 'POST') => {
  return cy.request({
    url: baseUrl,
    method: methodName,
    headers: {
      'content-type': 'application/json',
      'dev-only-user-role': superUser,
      'dev-only-auth-disable': process.env.EMPLOYEE_TYPE === 'employee' ? getEmployeeData() : managerData()
    },
    body: body,
  })
})

Cypress.Commands.add('getRequestData', URL => {
  return cy.request({
    url: URL,
    method: 'GET',
    headers: {
      authorization: `Bearer ${Cypress.env('accessToken')}`,
      'content-type': 'application/json',
    },
  })
})

export const getEmployeesData = () => cy.readFile('cypress/fixtures/employees.json')

export const proposeDevRelEvent = obj => ({
  operationName: 'proposeDevrelEvent',
  variables: {input: {...obj}},
  query: query.proposeDevRelEvent,
})

export const getScrumMasters = () => ({
  variables: {},
  query: query.getScrumMasters,
})

export const getHobbyPosts = obj => ({
  operationName: 'getHobbyPosts',
  variables: {input: {...obj}},
  query: query.getHobbyPosts,
})

export const updateHobbyPost = obj => ({
  operationName: 'updateHobbyPost',
  variables: {input: {...obj}},
  query: query.updateHobbyPost,
})

export const createHobbyPost = obj => ({
  operationName: 'createHobbyPost',
  variables: {input: {...obj}},
  query: query.createHobbyPost,
})

export const acceptDevRel = id => ({
  operationName: 'acceptDevrel',
  variables: {id},
  query: query.acceptDevRel,
})

export const deleteDevrel = id => ({
  operationName: 'deleteDevrel',
  variables: {id},
  query: query.deleteDevrel,
})

export const getDevRels = (type = 'EVENT') => ({
  operationName: 'getDevrels',
  variables: {type},
  query: query.getDevrels,
})

export const getNotifications = () => ({
  operationName: 'getNotifications',
  variables: {},
  query: query.getNotifications,
})

export const getAllBirthdays = () => ({
  variables: {},
  query: query.getAllBirthdays,
})

export const removeBook = id => ({
  operationName: 'removeBook',
  variables: { id },
  query: query.removeBook,
})

export const createMatrixProposal = (cellId,matrix, proposal) => ({
  operationName: 'createMatrixProposal',
  variables: {input: {cellId,matrix,proposal}},
  query: query.createMatrixProposal,
})

export const getAllEmployeeMatrices = (id) => ({
  operationName: null,
  variables: {input:{id}},
  query: query.getEmployeeMatricesAndGrade,
})

export const getMatrixProposals = (matrix) => ({
  operationName: 'getMatrixProposals',
  variables: {matrix},
  query: query.getMatrixProposals,
})

export const resolveMatrixProposal = (id) => ({
  operationName: 'resolveMatrixProposal',
  variables: {id},
  query: query.resolveMatrixProposal,
})

export const deleteMatrixProposal = (id) => ({
  operationName: 'deleteMatrixProposal',
  variables: {id},
  query: query.deleteMatrixProposal,
})

export const createBook = obj => ({
  operationName: 'createBook',
  variables: { input:{ ...obj }},
  query: query.createBook,
})

export const getManager = id => ({
  operationName: 'GetEmployeeManager',
  variables: { input: { id: id } },
  query: query.getManager,
})

export const deleteVacancy = id => ({
  operationName: 'deleteHrVacancy',
  variables: { id },
  query: query.deleteHrVacancy,
})

export const completeProcessExecutionStep = (execution, step) => ({
  operationName: 'completeProcessExecutionStep',
  variables: {input: { execution, step }},
  query: query.completeProcessExecutionStep,
})

export const createWorkplaceBooking = (
    workplace,
    startDate = todayOfficePlannerDate,
    finishDate = todayOfficePlannerDate
) => ({
  operationName: 'createWorkplaceBooking',
  variables: {input: {workplace, startDate, finishDate}},
  query: query.createWorkplaceBooking,
})

export const deleteWorkplaceBooking = (id) => ({
  operationName: 'deleteWorkplaceBooking',
  variables: {id},
  query: query.deleteWorkplaceBooking,
})

export const workspace = (
    id,
    startDate = todayOfficePlannerDate,
    finishDate = todayOfficePlannerDate
) => ({
  operationName: 'workspace',
  variables: {bookingsInput: {startDate, finishDate}, id},
  query: query.workspace,
})

export const workspacePoolQuery = (
    location = mainCity,
    startDate = todayOfficePlannerDate,
    finishDate = todayOfficePlannerDate
) => ({
  operationName: 'workspacePoolQuery',
  variables: {input:{location},bookingsInput:{startDate,finishDate}},
  query: query.workspacePoolQuery,
})

export const getProcesses = id => ({
  operationName: 'getProcesses',
  variables: { id },
  query: query.getProcesses,
})

export const publishVacancy = (id) => ({
  operationName: 'publishVacancy',
  variables: {input: {id}},
  query: query.publishVacancy,
})

export const updateOffBoardingProcess = (obj) => ({
  operationName: 'updateProcessExecution',
  variables: {input:{...obj}},
  query: query.updateProcessExecution,
})

export const getProjectManagers = (id) => ({
  operationName: 'getProjectManagers',
  variables: {id},
  query: query.getProjectManagers,
})

export const getEvent = (id) => ({
  operationName: 'getEvent',
  variables: {id},
  query: query.getEvent,
})

export const createProcessStep = (obj) => ({
  operationName: 'createProcessStep',
  variables: {input:{...obj}},
  query: query.createProcessStep,
})

export const updateProcessStep = (obj) => ({
  operationName: 'updateProcessStep',
  variables: {input:{...obj}},
  query: query.updateProcessStep,
})

export const cancelEvent = (id, comment) => ({
  operationName: 'cancelEvent',
  variables: {input:{id, comment}},
  query: query.cancelEvent,
})

export const createEvent = (obj) => ({
  operationName: 'createEvent',
  variables: {input:{...obj}},
  query: query.createEvent,
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

export const updateDevelopmentPlan = (userId, lastDiscussed, lastUpdated) => ({
  operationName: 'updateDevelopmentPlan',
  variables: { input:{
      id: userId,
      lastDiscussed: `${lastDiscussed}T17:30:14+03:00`,
      lastUpdatedAt: `${lastUpdated}T14:30:56.738Z`,
    } },
  query: query.updateDevelopmentPlan,
})

export const matricesCustomFieldsMutation = (userId, lastDiscussed) => ({
  operationName: 'matricesCustomFieldsMutation',
  variables: { input:{
      employee: userId,
      lastDiscussed: `${lastDiscussed}T17:30:14+03:00`
    }},
  query: query.matricesCustomFieldsMutation,
})

export const evaluationCustomFields = employee => ({
  operationName: 'evaluationCustomFields',
  variables: { input:{employee}},
  query: query.evaluationCustomFields,
})

export const customFieldsMutationSelfEv = (userId, lastDiscussed) => ({
  operationName: 'customFieldsMutation',
  variables: { input:{
      employee: userId,
      lastDiscussed: `${lastDiscussed}T17:30:14+03:00`
    }},
  query: query.customFieldsMutationSelfEv,
})

export const getDevelopmentPlans = userId => ({
  operationName: 'getDevelopmentPlans',
  variables: { input:{employee: userId} },
  query: query.getDevelopmentPlans,
})

export const matricesCustomFields = userEmail => ({
  operationName: 'matricesCustomFields',
  variables: { input:{employee: userEmail} },
  query: query.matricesCustomFields,
})

export const createTraining = (title, description, responsible, optional = false,  isSwissReBool = false) => ({
  operationName: 'createOnboardingTicket',
  variables: {
    input: {
      title,
      description,
      responsible,
      isOptional: optional,
      isSwissre: isSwissReBool
    },
  },
  query: query.createTraining,
})

export const requestOnboardingTicket = (id) => ({
  operationName: 'requestOnboardingTicket',
  variables: {id},
  query: query.requestOnboardingTicket,
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

export const cancelOnboardingTicket = id => ({
  operationName: 'cancelOnboardingTicket',
  variables: {input: { id }},
  query: query.cancelOnboardingTicket,
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

export const deleteFeedback = id => ({
  operationName: 'deleteFeedback',
  variables: {
    input: { id },
  },
  query: query.deleteFeedback,
})

export const addFeedback = (text, about = 'PORTAL', isPrivate = false)=> ({
  operationName: 'addFeedback',
  variables: {input: {about, text, isPrivate}},
  query: query.addFeedback,
})

export const deletePost = id => ({
  operationName: 'deletePost',
  variables: {
    input: { id },
  },
  query: query.deletePost,
})

export const createPost = (
    body,
    title,
    locations = [],
    tags = [],
    isTranslated = false,
) => ({
  operationName: 'createPost',
  variables: {
    input: { body, tags, title, isTranslated, locations}
  },
  query: query.createPost,
})

export const deleteTraining = id => ({
  operationName: 'deleteOnboardingTicket',
  variables: {
    input: { id },
  },
  query: query.deleteTraining,
})

export const closeVacancy = id => ({
  operationName: 'closeVacancy',
  variables: {
    input: { id },
  },
  query: query.closeVacancy,
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

export const getEvaluationReviewers = (id) => ({
  operationName: 'getEvaluationReviewers',
  variables: {input: {toWhom: id}},
  query: query.getReviewers,
})

export const createEvaluationReviewer = (idUser, idReviewer) => ({
  operationName: 'createEvaluationReviewer',
  variables: {input: {fromWho: idReviewer, toWhom: idUser}},
  query: query.createReviewer,
})

export const deleteReviewer = (idReviewer, idUser) => ({
  operationName: 'deleteEvaluationReviewer',
  variables: {input: {fromWho: idReviewer, toWhom: idUser}},
  query: query.deleteReviewer,
})

export const getOfficeDays = (dateStart, dateEnd) => ({
  operationName: 'getOfficeDays',
  variables: { input: { dateStart, dateEnd } },
  query: query.getOfficeDays,
})

export const createOfficeBooking = (dateStart, location = 'SAINT_PETERSBURG', skipWeekends = true) => ({
  operationName: 'createOfficeBooking',
  variables: { input: { dateStart, location, skipWeekends } },
  query: query.applyDay,
})

export const getAllSkills = () => ({
  operationName: 'getSkills',
  variables: {},
  query: query.allSkills,
})

export const deleteSkill = (id) => ({
  operationName: 'deleteSkill',
  variables:  {input:{ id }},
  query: query.deleteSkill,
})

export const getAllMatrices = (employee, skill) => ({
  operationName: null,
  variables: {input: {employee, skill}},
  query: query.getAllMatrices,
})

export const getExperiences = () => ({
  operationName: 'getExperiences',
  variables: {},
  query: query.getExperiences,
})

export const getFirstPosts = () => ({
  operationName: 'getPosts',
  variables: { first: 4, filter: { tags: [] } },
  query: query.getFirstPost,
})

export const getEmployeeMatrices = (id) => ({
  operationName: null,
  variables: {input:{id}},
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

export const getPaths = () => ({
  operationName: 'getPaths',
  variables: {},
  query: query.getPaths,
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

export const updateProjectSkills = (projectId, allSkills) => ({
  operationName: 'updateProjectSkills',
  variables: {input: {
    project: projectId,
    skills: allSkills
    }},
  query: query.updateProjectSkills,
})

export const getProjectSkills = (projectId) => ({
  operationName: 'getProjectSkills',
  variables: {id: projectId},
  query: query.getProjectSkills,
})

export const getProjectByCode = (code = 'guild-portal') => ({
  operationName: 'getProjectByCode',
  variables: {code},
  query: query.getProjectByCode,
})

export const getGuildsTitle = () => ({
  operationName: 'getGuilds',
  variables: {},
  query: query.guild,
})

export const updateGuildTitleAndLeaders = (azureDisplayName, leaders = [], title) => ({
  operationName: 'updateGuild',
  variables: {input:{azureDisplayName, leaders, title}},
  query: query.updateGuild,
})

export const addJob = (
  employeeId = employeeData.employee.id,
  jobId = '6036318cf84074001c07f746',
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

export const updateCV = (obj) => ({
  operationName: 'updateCV',
  variables: { input: {...obj} },
  query: query.updateCV,
})

export const getGetGuild = () => ({
  operationName: null,
  variables: {},
  query: query.guild,
})

export const getGuildInfo = (azureDisplayName = 'community-frontend') => ({
  operationName: 'getGuild',
  variables: {input: {azureDisplayName}},
  query: query.guildInfo,
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

export const getRelatedBookmarks = (skills = []) => ({
  operationName: 'getBookmarks',
  variables: {input: {skills}},
  query: query.getBookmarks,
})

export const rotateRequest = (comment, id, candidate) => ({
  operationName: 'rotateRequest',
  variables: {input:{comment, id, candidate}},
  query: query.rotateRequest,
})

export const cancelRotateRequest = (id, candidate) => ({
  operationName: 'cancelRotateRequest',
  variables: {input:{id, candidate}},
  query: query.cancelRotateRequest,
})

export const getVacancies = () => ({
  operationName: 'getVacancies',
  variables: {},
  query: query.getVacanci,
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

export const updateEmployeeCapacity = (id, agileManager, employeeProjects) => ({
  operationName: 'updateEmployee',
  variables: { input: { id, agileManager, employeeProjects } },
  query: query.updateEmp,
})

export const updateOneTwoOne = (id, one2oneRequest) => ({
  operationName: 'updateEmployee',
  variables: {input: {id, one2oneRequest}},
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

export const createHrProcess = (createProcessObj) => ({
  operationName: 'createProcessExecution',
  variables: { input: {...createProcessObj} },
  query: query.createProcessExecution,
})

export const createNewProcess = (title, type, customer) => ({
  operationName: 'createProcess',
  query: query.createNewProcess,
  variables: { input: { title, type, customer } },
})

export const getAllProjects = () => ({
  operationName: 'getProjects',
  query: query.getAllProjects,
  variables: {},
})

export const updateVacancy = (obj) => ({
  operationName: 'updateVacancy',
  variables: {input: {...obj}},
  query: query.updateVacancy,
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

export const evaluate = (id, comment, evaluationAtt, evaluation = 3) => ({
  operationName: 'evaluate',
  variables: { input: { comment,
      evaluation,
      evaluationAttribute: evaluationAtt,
      toWhom: id} },
  query: query.evaluate,
})

export const getEvaluations = employee => ({
  operationName: 'getEvaluations',
  variables: {evaluationCommentsInput: {employee}, evaluationsInput: {employee}},
  query: query.getEvaluations,
})

export const getSubordinates = emailUser => ({
  operationName: 'getSubordinates',
  variables: {email: emailUser},
  query: query.getSubordinates,
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

export const updateGuild = (azureDisplayName, skills = []) => ({
  operationName: 'updateGuild',
  variables: { input: {azureDisplayName, skills }},
  query: query.updateGuild,
})

export const updateGuildShortDescription = (azureDisplayName, shortDescription) => ({
  operationName: 'updateGuild',
  variables: { input: {azureDisplayName, shortDescription }},
  query: query.updateGuild,
})

export const updateGuildDescription = (azureDisplayName, description) => ({
  operationName: 'updateGuild',
  variables: { input: {azureDisplayName, description }},
  query: query.updateGuild,
})

export const updatePost = (body, id, title, tagsArr = TAGS) => ({
  operationName: 'updatePost',
  variables: {
    input: {
      body,
      id,
      images: [],
      locations: [],
      tags: tagsArr,
      title,
    },
  },
  query: query.updatePost,
})
