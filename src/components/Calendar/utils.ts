import { CalendarEvent } from '../../types'

export const filterEvents = (
  events: CalendarEvent[] | undefined,
  filters: { [key: string]: string | undefined },
) =>
  events
    ?.map(event => ({ ...event, start: new Date(event.start), end: new Date(event.end) }))
    .filter(event => {
      if (filters.isInternal === 'internal' && event.isExternal) return false
      if (filters.isInternal === 'external' && !event.isExternal) return false
      if (filters.isOnline === 'offline' && event.isOnline) return false
      if (filters.isOnline === 'online' && !event.isOnline) return false
      if (filters.city && event.city !== filters.city) return false
      return true
    }) || []

export const getCitySuggestions = async (city: string) => {
  const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + process.env.REACT_APP_DADATA_API_TOKEN,
    },
    body: JSON.stringify({
      query: city,
      count: 4,
      language: 'en',
      from_bound: { value: 'city' },
      to_bound: { value: 'city' },
    }),
  }

  return fetch(url, options as any)
    .then(response => response.text())
    .then(res => JSON.parse(res).suggestions?.map((e: any) => e.data.city))
}
