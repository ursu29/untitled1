import { gql } from '@apollo/client'
import { CalendarEvent } from '../types'

export const getEvents = gql`
  query getEvents($input: EventsInput!) {
    events(input: $input) {
      id
      title
      start
      end
      importance
      isOnline
      isExternal
      city
    }
  }
`

export const getEvent = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      description
      link
      start
      end
      importance
      isOnline
      isExternal
      city
      location
      skills {
        id
        name
        description
      }
      attendees {
        employee {
          id
          name
          email
          position
        }
        status
      }
      isAttendAll
      createdBy {
        id
      }
    }
  }
`

export const createEvent = gql`
  mutation createEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`

export const attendEvent = gql`
  mutation attendEvent($id: ID!) {
    attendEvent(id: $id)
  }
`

export const attendEventEveryone = gql`
  mutation attendEventEveryone($id: ID!) {
    attendEventEveryone(id: $id)
  }
`

export const cancelEvent = gql`
  mutation cancelEvent($input: CancelEventInput!) {
    cancelEvent(input: $input)
  }
`

export type EventsQueryType = {
  events: CalendarEvent[]
}
