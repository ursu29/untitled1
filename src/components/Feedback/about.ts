import { Feedback_About as FeedbackAbout } from '../../types/graphql'

export const getAboutLabel = (about: string) => {
  switch (about) {
    case FeedbackAbout.Company:
      return 'Syncretis'
    case FeedbackAbout.Team:
      return 'Team'
    case FeedbackAbout.Event:
      return 'Event'
    case FeedbackAbout.Portal:
      return 'Portal'
    default:
      return 'Unknown'
  }
}

export const aboutList = [
  {
    value: FeedbackAbout.Company,
    label: getAboutLabel(FeedbackAbout.Company),
  },
  {
    value: FeedbackAbout.Team,
    label: getAboutLabel(FeedbackAbout.Team),
  },
  {
    value: FeedbackAbout.Event,
    label: getAboutLabel(FeedbackAbout.Event),
  },
  {
    value: FeedbackAbout.Portal,
    label: getAboutLabel(FeedbackAbout.Portal),
  },
]
