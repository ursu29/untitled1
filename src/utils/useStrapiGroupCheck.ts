import { useEmployee } from './withEmployee'

enum StrapiGroups {
  REVIEWERS,
  FEEDBACK,
  HR_RU,
  HR_EDITORS,
  NEWS_EDITORS,
  TECH_PORTAL,
  WORKSPACE_PLANNER,
  SYS_ADMINS,
  HR_ADMINS,
}

export default function useStrapiGroupCheck(group: keyof typeof StrapiGroups): boolean {
  const { employee } = useEmployee()
  return employee.strapiGroupsMembership.includes(group)
}
