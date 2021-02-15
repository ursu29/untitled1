import { LOCATION } from '../types'

export default (location: LOCATION) => {
  switch (location) {
    case LOCATION.SAINT_PETERSBURG:
      return 'Saint Petersburg'
    case LOCATION.TOMSK:
      return 'Tomsk'
    case LOCATION.KALININGRAD:
      return 'Kaliningrad'
    case LOCATION.ZURICH:
      return 'Zürich'
  }
}
