import { FEEDBACK_ABOUT } from '../../types'

export const getAboutLabel = (about: string) => {
  switch (about) {
    case FEEDBACK_ABOUT.COMPANY:
      return 'Syncretis'
    case FEEDBACK_ABOUT.TEAM:
      return 'Team'
    case FEEDBACK_ABOUT.EVENT:
      return 'Event'
    case FEEDBACK_ABOUT.PORTAL:
      return 'Portal'
    default:
      return 'Unknown'
  }
}

export const aboutList = [
  {
    value: FEEDBACK_ABOUT.COMPANY,
    label: getAboutLabel(FEEDBACK_ABOUT.COMPANY),
  },
  {
    value: FEEDBACK_ABOUT.TEAM,
    label: getAboutLabel(FEEDBACK_ABOUT.TEAM),
  },
  {
    value: FEEDBACK_ABOUT.EVENT,
    label: getAboutLabel(FEEDBACK_ABOUT.EVENT),
  },
  {
    value: FEEDBACK_ABOUT.PORTAL,
    label: getAboutLabel(FEEDBACK_ABOUT.PORTAL),
  },
]
