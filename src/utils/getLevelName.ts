import { LEVEL } from '../types'

export default (level: LEVEL) => {
  switch (level) {
    case LEVEL.CONFIDENT:
      return 'Confident in'
    case LEVEL.EXPERIENCED:
      return 'Experienced'
    case LEVEL.LEARNING:
      return 'Currently studies'
    case LEVEL.WANTED:
      return 'Wants to know'
  }
}
