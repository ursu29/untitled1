import { Employee, Project, Skill, Matrix } from './types'

const PATHS = {
  PROFILE: '/profile',
  EMPLOYEES: '/employees',
  PROJECTS: '/projects',
  SKILLS: '/skills',
  STATS: '/stats',
  BOOKMARKS: '/bookmarks',
  NEWS: '/feed',
  MATRICES: '/matrices',
  SHARED_FILES: '/shared-files',
  SETTINGS: '/settings',
  EVENTS: '/events',
}

export const getEmployeeLink = (email: Employee['email']) => PATHS.EMPLOYEES + '/' + email + '/'
export const getProjectLink = (code: Project['code']) => PATHS.PROJECTS + '/' + code + '/'
export const getSkillLink = (id: Skill['id']) => PATHS.SKILLS + '/' + id + '/'
export const getMatrixLink = (id: Matrix['id']) => PATHS.MATRICES + '/' + id + '/'

export default PATHS
