import { Employee, Project, Skill } from './types'

const PATHS = {
  PROFILE: '/profile',
  EMPLOYEES: '/employees',
  PROJECTS: '/projects',
  GUILD_PROJECTS: '/guild',
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

export default PATHS
