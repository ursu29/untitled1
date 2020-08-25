import { useMutation, useQuery } from '@apollo/react-hooks'
import { Tabs, Typography } from 'antd'
import React, { useState } from 'react'
import message from '../../message'
import getLocations, { QueryType as GetLocationQueryType } from '../../queries/getLocations'
import {
  createWorkplaceMutation,
  deleteWorkplaceMutation,
  updateWorkplaceMutation,
  createWorkplaceBookingMutation,
  workspaceQuery,
  WorkspaceQueryType,
} from '../../queries/workspace'
import { WorkplaceType } from '../../types'
import PageContent from '../UI/PageContent'
import EditTools from './EditTools'
import Workspace from './Workspace'
import WorkTools from './WorkTools'
import BookingList from './BookingList'
import { useEmployee } from '../../utils/withEmployee'
import dayjs from 'dayjs'

export default function WorkspacePlanner() {
  const employee = useEmployee()

  // State
  const [currentLocation, setCurrentLocation] = useState<string>()
  const [workplaces, setWorkplaces] = useState<WorkplaceType[]>([])
  const [isDesignMode, toggleDesignMode] = useState(false)
  const [dateRange, setDateRange] = useState({ startDate: '', finishDate: '' })

  // Get locations
  const { data: dataLocations, loading: loadingLocations } = useQuery<GetLocationQueryType>(
    getLocations,
    {
      onCompleted: dataLocations => {
        setCurrentLocation(dataLocations.locations[0].id)
      },
    },
  )
  const locations = dataLocations?.locations

  /**
   *  Get workspace for current location
   */
  const { data: dataWorkspace, loading: loadingWorkspace } = useQuery<WorkspaceQueryType>(
    workspaceQuery,
    {
      variables: {
        input: { locationId: '5e5693ed05ca9232ef1cdbf7', startDate: '333', finishDate: '4444' },
      }, //currentLocation } }, TODO:
      onCompleted: dataWorkspace => {
        setWorkplaces(dataWorkspace.workspace.workplaces)
      },
    },
  )
  const workspace = dataWorkspace?.workspace
  const bookingList = workspace?.workplaces.flatMap(workplace =>
    workplace.bookings.map(booking => ({ workplaceId: workplace.id, ...booking })),
  )

  console.log(workspace)
  console.log(bookingList)

  bookingList?.forEach(booking => {
    const { startDate, finishDate } = dateRange

    if (
      dayjs(booking.startDate) <= dayjs(startDate) &&
      dayjs(startDate) <= dayjs(booking.finishDate)
    )
      console.log(
        'startDate overlapping: ',
        booking.startDate,
        ' <= ',
        startDate,
        ' <= ',
        booking.finishDate,
      )
    if (
      dayjs(booking.startDate) <= dayjs(finishDate) &&
      dayjs(finishDate) <= dayjs(booking.finishDate)
    )
      console.log(
        'finishDate overlapping: ',
        booking.startDate,
        ' <= ',
        finishDate,
        ' <= ',
        booking.finishDate,
      )
    if (
      dayjs(startDate) < dayjs(booking.startDate) &&
      dayjs(booking.finishDate) < dayjs(finishDate)
    )
      console.log(
        'full overlapping: ',
        startDate,
        ' < ',
        booking.startDate,
        '< ',
        booking.finishDate,
        '< ',
        finishDate,
      )
  })
  /*   // Update workspace
  const [update] = useMutation(updateWorkspace, {
    // onCompleted: () => message.success('Workspace has been updated'),
    // awaitRefetchQueries: true,
    // refetchQueries: [{ query: getWikiPage, variables }],
    onError: message.error,
  })
  const handleUpdate = (value: any) => {
    update({ variables: { input: { id: workspace?.id, ...value } } })
  } */

  //TODO: onerror - make initial state

  /**
   *  Create workplace query
   */
  const [createWorkplace] = useMutation(createWorkplaceMutation, {
    onCompleted: workplace => {
      setWorkplaces([...workplaces, workplace.createWorkplace])
    },
    onError: message.error,
  })
  const handleCreateWorkplace = (value: any) => {
    createWorkplace({ variables: { input: { workspace: workspace?.id, ...value } } })
  }

  /**
   *  Update workplace query
   */
  const [updateWorkplace] = useMutation(updateWorkplaceMutation, {
    onCompleted: workplace => {
      setWorkplaces([
        ...workplaces.filter(e => e.id !== workplace.updateWorkplace.id),
        workplace.updateWorkplace,
      ])
    },
    onError: message.error,
  })
  const handleUpdateWorkplace = (input: any) => {
    updateWorkplace({ variables: { input } })
  }

  /**
   *  Delete workplace query
   */
  const [deleteWorkplace] = useMutation(deleteWorkplaceMutation, {
    onCompleted: workplace => {
      setWorkplaces(workplaces.filter(e => e.id !== workplace.deleteWorkplace.id))
    },
    onError: message.error,
  })
  const handleDeleteWorkplace = (input: any) => {
    deleteWorkplace({ variables: { input } })
  }

  /**
   *  Create workplace booking query
   */
  const [createWorkplaceBooking] = useMutation(createWorkplaceBookingMutation, {
    onCompleted: workplaceBooking => {
      console.log({ workplaceBooking })
    },
    onError: message.error,
  })
  const handleCreateWorkplaceBooking = (workplaceId: string) => {
    /*     bookingList?.forEach(booking => {
      const {startDate, finishDate} = dateRange

      if (dayjs(booking.startDate) <= dayjs(startDate) && dayjs(startDate) <= dayjs(booking.finishDate) ) console.log(
        'startDate overlapping: ',
        booking.startDate, ' <= ',startDate,' <= ',booking.finishDate
      )
      if (dayjs(booking.startDate) <= dayjs(finishDate) && dayjs(finishDate) <= dayjs(booking.finishDate) ) console.log(
        'finishDate overlapping: ',
        booking.startDate, ' <= ',finishDate,' <= ',booking.finishDate
      )
      if (dayjs(startDate) < dayjs(booking.startDate) && dayjs(booking.finishDate) < dayjs(finishDate) ) console.log(
        'full overlapping: ',
        startDate, ' < ', booking.startDate, '< ',booking.finishDate,'finishDate,' 
      )
    }) */

    createWorkplaceBooking({
      variables: {
        input: {
          workplace: workplaceId,
          employee: employee.employee.strapiId,
          employeeEmail: employee.employee.email,
          startDate: dateRange.startDate,
          finishDate: dateRange.finishDate,
        },
      },
    })
  }

  // Add new workplace
  const addWorkplace = (id: string) => {
    const cloningPlace = workplaces.find(e => e.id === id)

    const { x, y } = cloningPlace
      ? { x: cloningPlace.coordX, y: cloningPlace.coordY }
      : { x: 0, y: 0 }

    const creatingWorkplace = {
      coordX: x + 10,
      coordY: y + 10,
    }
    handleCreateWorkplace(creatingWorkplace)
  }

  // Drag workplace
  const handleDrag = (e: any, ui: { deltaX: number; deltaY: number }, id: string) => {
    const draggingPlace = workplaces.find(e => e.id === id)
    if (!draggingPlace) return
    const { x, y } = { x: draggingPlace.coordX, y: draggingPlace.coordY }

    setWorkplaces([
      ...workplaces.filter(e => e.id !== id),
      {
        ...draggingPlace,
        coordX: Math.round(x + ui.deltaX),
        coordY: Math.round(y + ui.deltaY),
      },
    ])
  }

  // Stop dragging workplace
  const handleStopDrag = (id: string) => {
    const draggingPlace = workplaces.find(e => e.id === id)
    handleUpdateWorkplace({
      id,
      coordX: draggingPlace?.coordX,
      coordY: draggingPlace?.coordY,
    })
  }

  return (
    <PageContent>
      <Typography.Title style={{ marginBottom: '40px' }}>Workspace Planner</Typography.Title>
      <Tabs
        animated={false}
        type="card"
        activeKey={currentLocation}
        onChange={location => {
          setCurrentLocation(location)
        }}
      >
        {locations?.map(location => {
          return (
            <Tabs.TabPane key={location.id} tab={location.name}>
              <EditTools
                isDesignMode={isDesignMode}
                toggleDesignMode={toggleDesignMode}
                onWorkplaceAdd={addWorkplace}
              />

              {!isDesignMode && <WorkTools dateRange={dateRange} setDateRange={setDateRange} />}

              {workspace ? (
                <Workspace
                  isDesignMode={isDesignMode}
                  workspace={workspace}
                  workplaces={workplaces}
                  onClone={addWorkplace}
                  onDelete={(id: string) => handleDeleteWorkplace({ id })}
                  onDrag={handleDrag}
                  onStop={handleStopDrag}
                  onBook={handleCreateWorkplaceBooking}
                />
              ) : (
                <div>workspace not found</div>
              )}

              <BookingList bookings={bookingList} />
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </PageContent>
  )
}
