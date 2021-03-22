import { Level } from '../types/graphql'

export const levelList = Object.values(Level)

export const getLevelName = (level: Level) => {
  switch (level) {
    case Level.Confident:
      return 'Confident in'
    case Level.Experienced:
      return 'Experienced'
    case Level.Learning:
      return 'Currently studies'
    case Level.Wanted:
      return 'Wants to know'
  }
}

export const getMatrixLevelName = (level: Level) => {
  switch (level) {
    case Level.Confident:
      return 'Practical knowledge'
    case Level.Experienced:
      return 'Practical knowledge'
    case Level.Learning:
      return 'Theoretical knowledge'
    case Level.Wanted:
      return 'No Knowledge'
    default:
      return '?'
  }
}
