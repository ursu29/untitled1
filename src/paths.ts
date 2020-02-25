import { Employee, Project, Skill, Matrix, Post, Process } from './types'

const PATHS = {
  PROFILE: '/profile',
  EMPLOYEES: '/employees',
  PROJECTS: '/projects',
  SKILLS: '/skills',
  STATISTICS: '/stats',
  BOOKMARKS: '/bookmarks',
  POSTS: '/feed',
  MATRICES: '/matrices',
  SHARED_FILES: '/shared-files',
  SETTINGS: '/settings',
  EVENTS: '/events',
  PROCESSES: '/processes',
}

export const getEmployeeLink = (email: Employee['email']) => PATHS.EMPLOYEES + '/' + email + '/'
export const getProjectLink = (code: Project['code']) => PATHS.PROJECTS + '/' + code + '/'
export const getSkillLink = (id: Skill['id']) => PATHS.SKILLS + '/' + id + '/'
export const getMatrixLink = (id: Matrix['id']) => PATHS.MATRICES + '/' + id + '/'
export const getPostLink = (id: Post['id']) => PATHS.POSTS + '/' + id + '/'
export const getProcessLink = (id: Process['id']) => PATHS.PROCESSES + '/' + id + '/'

export default PATHS
