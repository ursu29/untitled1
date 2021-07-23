import { useQuery } from '@apollo/client'
import { EventsQueryType, getEvents } from '../../queries/events'
import { filterEvents } from './utils'

export default function DateChangeWrapper({
  filters,
  variables,
  render,
}: {
  filters: any
  variables: any
  render: any
}) {
  // Get events for the current month with some additional days from prev and next
  const { data } = useQuery<EventsQueryType>(getEvents, {
    variables,
  })

  const events = filterEvents(data?.events, filters)
  const cities = Array.from(
    new Set(
      data?.events
        .map(e => e.city)
        .filter(e => e)
        .slice()
        .sort() || [],
    ),
  )

  return render(events, cities)
}
