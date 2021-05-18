import { Employee, Project, Skill, Matrix, Post, Process, Vacancy, ProcessExecution } from './types'
import { Hobby } from './types/graphql'

const PATHS = {
  PROFILE: '/profile',
  ONBOARDING: '/onboarding',
  EMPLOYEES: '/employees',
  CALENDAR: '/calendar',
  GUILDS: '/guilds',
  GUILDS_INFO: '/guilds-info',
  PROJECTS: '/projects',
  SKILLS: '/skills',
  STATISTICS: '/stats',
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
  MANAGEMENT: '/management',
  DEVREL: '/devrel',
  GAMES: '/games',
  HOBBIES: '/hobbies',
}

export const getEmployeeLink = (email: Employee['email']) => PATHS.EMPLOYEES + '/' + email
export const getProjectLink = (code: Project['code']) => PATHS.PROJECTS + '/' + code
export const getGuildLink = (code: Project['code']) => PATHS.GUILDS + '/' + code
export const getSkillLink = (id: Skill['id']) => PATHS.SKILLS + '/' + id
export const getHobbyLink = (id: Hobby['id']) => PATHS.HOBBIES + '/' + id
export const getMatrixLink = (id: Matrix['id']) => PATHS.MATRICES + '/' + id
export const getPostLink = (id: Post['id']) => PATHS.POSTS + '/' + id
export const getProcessLink = (id: Process['id']) => PATHS.PROCESSES + '/' + id
export const getProcessExecutionLink = (id: ProcessExecution['id']) => PATHS.HR + '/' + id
export const getVacancyLink = (id: Vacancy['id']) => PATHS.VACANCIES + '/' + id

export default PATHS
