import { Employee, Project, Skill, Matrix, Post, Process, Vacancy, ProcessExecution } from './types'

const PATHS = {
  PROFILE: '/profile',
  ONBOARDING: '/onboarding',
  EMPLOYEES: '/employees',
  GUILDS: '/guilds',
  PROJECTS: '/projects',
  SKILLS: '/skills',
  POSTS: '/feed',
  MATRICES: '/matrices',
  SETTINGS: '/settings',
  EVENTS: '/events',
  PROCESSES: '/processes',
  KNOWLEDGE: '/knowledge',
  VACANCIES: '/vacancies',
  HR: '/hr',
  TIMEMASTER: '/timemaster',
  WIKI: '/wiki',
  OFFICE_PLANNER: '/office-planner',
  WORKSPACE_PLANNER: '/workspace-planner',
  FEEDBACK: '/feedback',
}

export const getEmployeeLink = (email: Employee['email']) => PATHS.EMPLOYEES + '/' + email + '/'
export const getProjectLink = (code: Project['code']) => PATHS.PROJECTS + '/' + code + '/'
export const getGuildLink = (code: Project['code']) => PATHS.GUILDS + '/' + code + '/'
export const getSkillLink = (id: Skill['id']) => PATHS.SKILLS + '/' + id + '/'
export const getMatrixLink = (id: Matrix['id']) => PATHS.MATRICES + '/' + id + '/'
export const getPostLink = (id: Post['id']) => PATHS.POSTS + '/' + id + '/'
export const getProcessLink = (id: Process['id']) => PATHS.PROCESSES + '/' + id + '/'
export const getProcessExecutionLink = (id: ProcessExecution['id']) => PATHS.HR + '/' + id + '/'
export const getVacancyLink = (id: Vacancy['id']) => PATHS.VACANCIES + '/' + id + '/'

export default PATHS
