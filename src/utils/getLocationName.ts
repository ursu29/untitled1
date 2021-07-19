import { Location } from '../types/graphql'

export default function getLocationName(location: Location) {
  switch (location) {
    case Location.SaintPetersburg:
      return 'Saint Petersburg'
    case Location.Tomsk:
      return 'Tomsk'
    case Location.Kaliningrad:
      return 'Kaliningrad'
    case Location.Zurich:
      return 'Zürich'
    default:
      return 'Unknown'
  }
}
