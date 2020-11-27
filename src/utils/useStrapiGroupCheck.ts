import { useEmployee } from './withEmployee'
import { StrapiGroups } from '../types'

export default function useStrapiGroupCheck(
  group: keyof typeof StrapiGroups | (keyof typeof StrapiGroups)[],
): boolean {
  const { employee } = useEmployee()

  if (Array.isArray(group)) {
    return employee.strapiGroupsMembership.some(e => group.includes(e))
  } else {
    return employee.strapiGroupsMembership.includes(group)
  }
}
