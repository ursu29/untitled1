import { ProcessType } from '../types'

export const processList: ProcessType[] = ['ONBOARDING', 'OFFBOARDING', 'ROTATION']

export const getProcessName = (type?: ProcessType) => {
  switch (type) {
    case 'ONBOARDING':
      return 'Onboarding'
    case 'OFFBOARDING':
      return 'Offboarding'
    case 'ROTATION':
      return 'Rotation'
    default:
      return 'Unknown'
  }
}
