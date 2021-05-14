import { useQuery } from '@apollo/client'
import { Button } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import PageContent from '../UI/PageContent'
import ModalAddEvent from './ModalAddEvent'
import ModalEventSignUp from './ModalEventSignUp'
import { DateCellWrapper, EventWrapper, ToolbarWrapper } from './StyledCalendarComponents'
import { getEvents, EventsQueryType } from '../../queries/events'
import { filterEvents } from './utils'
import { CalendarEvent } from '../../types'
import PageHeader from '../UI/PageHeader'

const TODAY = new Date()
const YEAR = TODAY.getFullYear()

export default function Calendar() {
  const [modalEventSignUp, setModalEventSignUp] = useState({ eventId: '', visible: false })
  const [modalAddEvent, setModalAddEvent] = useState({ visible: false })
  const [view, setView] = useState('month')
  const [selectedMonth, setSelectedMonth] = useState(TODAY.getMonth())
  const [isFilterBarOpened, setIsFilterBarOpened] = useState(false)
  const [filters, setFilters] = useState({
    isInternal: undefined,
    isOnline: undefined,
    city: undefined,
  })

  moment.locale('ru', {
    week: {
      dow: 1,
      doy: 1,
    },
  })

  // Get events for the current month with some additional days from prev and next
  const variables = {
    input: {
      start: new Date(YEAR, selectedMonth - 1, 22),
      end: new Date(YEAR, selectedMonth + 1, 6),
    },
  }

  const { data, loading } = useQuery<EventsQueryType>(getEvents, {
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

  return (
    <>
      <PageHeader
        title="Events"
        extra={[
          <Button
            type="primary"
            onClick={() => setModalAddEvent({ visible: true })}
            data-cy="addEvent"
          >
            Add Event
          </Button>,
        ]}
      />
      <PageContent
        loading={loading}
        notFound={!data}
        notFoundMessage="Sorry, the calendar was not found"
        style={{ height: '90%', paddingLeft: 10, paddingRight: 10 }}
      >
        <BigCalendar
          formats={{
            timeGutterFormat: 'HH:mm',
          }}
          localizer={momentLocalizer(moment)}
          //@ts-expect-error
          events={events}
          style={{ height: '100%' }}
          views={['month', 'week']}
          showAllEvents={true}
          onSelectEvent={(event: CalendarEvent) => {
            setModalEventSignUp({ eventId: event.id, visible: true })
          }}
          onView={view => setView(view)}
          onNavigate={newDate => setSelectedMonth(newDate.getMonth())}
          components={{
            dateCellWrapper: DateCellWrapper,
            eventWrapper: props => EventWrapper({ view, ...props }),
            toolbar: props =>
              ToolbarWrapper({
                ...props,
                cities,
                isFilterBarOpened,
                setIsFilterBarOpened,
                filters,
                setFilters,
              }),
          }}
        />

        {modalEventSignUp.eventId && (
          <ModalEventSignUp
            visible={modalEventSignUp.visible}
            eventId={modalEventSignUp.eventId}
            handleClose={() => {
              setModalEventSignUp({ eventId: '', visible: false })
            }}
            refetchQueries={[{ query: getEvents, variables }]}
          />
        )}

        <ModalAddEvent
          visible={modalAddEvent.visible}
          handleClose={() => {
            setModalAddEvent({ visible: false })
          }}
          refetchQueries={[{ query: getEvents, variables }]}
        />
      </PageContent>
    </>
  )
}
