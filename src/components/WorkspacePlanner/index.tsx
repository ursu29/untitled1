import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import { Tabs, Typography } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React, { useEffect, useState } from 'react'
import message from '../../message'
import getLocations, { QueryType as GetLocationQueryType } from '../../queries/getLocations'
import {
  BOOKING,
  WORKPLACE,
  WORKSPACE,
  workspacePoolQuery,
  WorkspacePoolQueryType,
  workspaceQuery,
  WorkspaceQueryType,
  workspaceDesignAccessQuery,
  workspaceDesignAccessQueryType,
} from '../../queries/workspace'
import { WorkplaceType } from '../../types'
import { useEmployee } from '../../utils/withEmployee'
import PageContent from '../UI/PageContent'
import BookTools from './BookTools'
import DesignModeSwitch from './DesignModeSwitch'
import Workspace from './Workspace'
import WorkspaceSelector from './WorkspaceSelector'
import './styles.css'
dayjs.extend(customParseFormat)

export default function WorkspacePlanner() {
  const employee = useEmployee()

  // State
  const [currentLocation, setCurrentLocation] = useState<string>()
  const [workplaces, setWorkplaces] = useState<WorkplaceType[]>([])
  const [isDesignMode, toggleDesignMode] = useState(false)
  const [dateRange, setDateRange] = useState({ startDate: '', finishDate: '' })
  const [selectedWorkspace, setSelectedWorkspace] = useState('')
  const [selectedWorkplace, setSelectedWorkplace] = useState('')
  const [isInfoForBooked, setIsInfoForBooked] = useState(false)
  const [isBookingListOpen, setIsBookingListOpen] = useState(false)
  const isPastDateChosen = !dayjs().isSameOrBefore(dayjs(dateRange.startDate, 'DD.MM.YYYY'), 'day')

  useEffect(() => {
    setSelectedWorkplace('')
  }, [dateRange, workplaces, currentLocation, isDesignMode, selectedWorkspace])

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
   *  CHECK ACCESS TO DESIGN MODE
   */
  const { data: designAccessRights } = useQuery<workspaceDesignAccessQueryType>(
    workspaceDesignAccessQuery,
  )
  const isDesignModeAccess = designAccessRights?.workspaceDesignAccess.write

  /**
   *  GET WORKSPACE POOL for chosen location
   */

  const workspacePoolQueryVariables = {
    input: { locationId: '5e5693ed05ca9232ef1cdbf7' }, //currentLocation } }, TODO:
    bookingsInput: { startDate: dateRange.startDate, finishDate: dateRange.finishDate },
  }

  const { data: dataWorkspacePool, loading: loadingWorkspacePool } = useQuery<
    WorkspacePoolQueryType
  >(workspacePoolQuery, {
    variables: workspacePoolQueryVariables,
  })
  const workspacePool = dataWorkspacePool?.workspacePool

  /**
   *  GET WORKSPACE
   */

  const [
    getWorkspace,
    { data: dataWorkspace, loading: loadingWorkspace, refetch: refetchGetWorkspace },
  ] = useLazyQuery<WorkspaceQueryType>(workspaceQuery, {
    variables: {
      bookingsInput: { startDate: dateRange.startDate, finishDate: dateRange.finishDate },
    },
    onCompleted: dataWorkspace => {
      setWorkplaces(dataWorkspace.workspace.workplaces)
    },
    fetchPolicy: 'network-only',
    onError: message.error,
  })

  const workspace = dataWorkspace?.workspace
  const bookingList = workspace?.workplaces
    .flatMap(workplace =>
      workplace.bookings?.map(booking => ({ workplaceId: workplace.id, ...booking })),
    )
    .filter(e => !!e)
    .sort((a, b) => {
      if (dayjs(a.startDate).isBefore(dayjs(b.startDate), 'day')) {
        return -1
      } else {
        return 1
      }
    })
  const bookedByMe = bookingList
    ?.filter(
      booking => booking.employeeEmail.toLowerCase() === employee.employee.email.toLowerCase(),
    )
    .map(e => e.id)

  const workspaceQueryVariables = {
    input: { id: workspace?.id },
    bookingsInput: { startDate: dateRange.startDate, finishDate: dateRange.finishDate },
  }

  /**
   *  WORKSPACE CRUD
   */

  const [createWorkspace, { loading: loadingCreateWorkspace }] = useMutation(WORKSPACE.create, {
    onCompleted: workspace => {
      const { id } = workspace.createWorkspace
      console.log(id)
      setSelectedWorkspace(id)
      getWorkspace({ variables: { input: { id } } })
      message.success('Workspace has been created')
    },
    refetchQueries: [
      {
        query: workspacePoolQuery,
        variables: workspacePoolQueryVariables,
      },
    ],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  const [updateWorkspace, { loading: loadingUpdateWorkspace }] = useMutation(WORKSPACE.update, {
    onCompleted: workspace => {
      const { id } = workspace.updateWorkspace
      console.log(id)
      setSelectedWorkspace(id)
      getWorkspace({ variables: { input: { id } } })
      message.success('Workspace has been updated')
    },
    refetchQueries: [
      {
        query: workspacePoolQuery,
        variables: workspacePoolQueryVariables,
      },
    ],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  const [deleteWorkspace, { loading: loadingDeleteWorkspace }] = useMutation(WORKSPACE.delete, {
    onCompleted: () => {
      message.success('Workspace has been deleted')
    },
    refetchQueries: [
      {
        query: workspacePoolQuery,
        variables: workspacePoolQueryVariables,
      },
    ],
    onError: message.error,
  })

  /**
   *  WORKPLACE CRUD
   */

  const [createWorkplace] = useMutation(WORKPLACE.create, {
    onCompleted: workplace => {
      setWorkplaces([...workplaces, workplace.createWorkplace])
    },
    onError: err => {
      message.error(err)
      refetchGetWorkspace()
    },
  })
  const handleCreateWorkplace = (value: any) => {
    createWorkplace({ variables: { input: { workspace: workspace?.id, ...value } } })
  }

  const [updateWorkplace] = useMutation(WORKPLACE.update, {
    onCompleted: workplace => {
      setWorkplaces([
        ...workplaces.filter(e => e.id !== workplace.updateWorkplace.id),
        workplace.updateWorkplace,
      ])
    },
    onError: err => {
      message.error(err)
      refetchGetWorkspace()
    },
  })

  const [deleteWorkplace] = useMutation(WORKPLACE.delete, {
    onCompleted: workplace => {
      setWorkplaces(workplaces.filter(e => e.id !== workplace.deleteWorkplace.id))
    },
    onError: err => {
      message.error(err)
      refetchGetWorkspace()
    },
  })

  /**
   *  WORKPLACE BOOKING CRUD
   */

  const [createWorkplaceBooking, { loading: loadingCreateWorkplaceBooking }] = useMutation(
    BOOKING.create,
    {
      onCompleted: () => {
        message.success('Reservation has been created')
      },
      refetchQueries: [
        {
          query: workspaceQuery,
          variables: workspaceQueryVariables,
        },
      ],
      awaitRefetchQueries: true,
      onError: message.error,
    },
  )
  const handleCreateWorkplaceBooking = (workplaceId: string) => {
    createWorkplaceBooking({
      variables: {
        input: {
          workplace: workplaceId,
          employee: employee.employee.strapiId,
          employeeEmail: employee.employee.email,
          startDate: dayjs(dateRange.startDate, 'DD.MM.YYYY').toDate(),
          finishDate: dayjs(dateRange.finishDate, 'DD.MM.YYYY').toDate(),
        },
      },
    })
  }

  const [deleteWorkplaceBooking, { loading: loadingDeleteWorkplaceBooking }] = useMutation(
    BOOKING.delete,
    {
      onCompleted: () => {
        setSelectedWorkplace('')
        message.success('Reservation has been canceled')
      },
      refetchQueries: [
        {
          query: workspaceQuery,
          variables: workspaceQueryVariables,
        },
      ],
      awaitRefetchQueries: true,
      onError: message.error,
    },
  )

  /**
   *  Functions
   */

  // Add new workplace
  const addWorkplace = (id: string, coords?: { coordX: number; coordY: number }) => {
    const cloningPlace = workplaces.find(e => e.id === id)

    if (!coords) {
      // Without coordinates - clone workplace
      const { x, y } = { x: cloningPlace?.coordX, y: cloningPlace?.coordY }
      if (!x || !y) return
      const creatingWorkplace = {
        coordX: x + 10,
        coordY: y + 10,
      }

      handleCreateWorkplace(creatingWorkplace)
    } else {
      // Received coordinates - clicked "Add" button
      const { x, y } = {
        x: Math.round(coords.coordX / 10) * -10,
        y: Math.round(coords.coordY / 10) * -10,
      }
      const creatingWorkplace = {
        coordX: x + 40,
        coordY: y + 50,
      }

      handleCreateWorkplace(creatingWorkplace)
    }
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
        coordX: x + Math.round(ui.deltaX / 10) * 10,
        coordY: y + Math.round(ui.deltaY / 10) * 10,
      },
    ])
  }

  // Stop dragging workplace
  const handleStopDrag = (id: string) => {
    const draggingPlace = workplaces.find(e => e.id === id)
    if (!draggingPlace) return
    updateWorkplace({
      variables: {
        input: {
          id,
          coordX: draggingPlace.coordX,
          coordY: draggingPlace.coordY,
        },
      },
    })
  }

  const loading =
    loadingLocations ||
    loadingWorkspacePool ||
    loadingWorkspace ||
    loadingCreateWorkspace ||
    loadingUpdateWorkspace ||
    loadingDeleteWorkspace ||
    loadingCreateWorkplaceBooking ||
    loadingDeleteWorkplaceBooking

  if (loading) message.loading('Loading...')

  return (
    <PageContent style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Typography.Title style={{ marginBottom: '40px' }}>Workspace Planner</Typography.Title>
      <Tabs
        animated={false}
        type="card"
        activeKey={currentLocation}
        onChange={location => {
          setCurrentLocation(location)
        }}
      >
        {locations?.map(location => (
          <Tabs.TabPane
            key={location.id}
            tab={location.name}
            disabled={location.id !== '5e5693ed05ca9232ef1cdbf7'} //TODO: add any possible location
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <WorkspaceSelector
                  isDesignMode={isDesignMode}
                  pool={workspacePool}
                  selectedWorkspace={selectedWorkspace}
                  workspace={workspace}
                  onSelect={(id: string) => {
                    setSelectedWorkspace(id)
                    getWorkspace({ variables: { input: { id } } })
                  }}
                  onCreate={(value: any) =>
                    createWorkspace({
                      variables: { input: { workspace_pool: workspacePool?.id, ...value } },
                    })
                  }
                  onDelete={(id: string) => deleteWorkspace({ variables: { input: { id } } })}
                  onEdit={(value: any) =>
                    updateWorkspace({
                      variables: { input: { id: workspace?.id, ...value } },
                    })
                  }
                  refetchGetWorkspace={refetchGetWorkspace}
                />

                {!isDesignMode && <BookTools dateRange={dateRange} setDateRange={setDateRange} />}
              </div>

              {isDesignModeAccess && (
                <DesignModeSwitch isDesignMode={isDesignMode} toggleDesignMode={toggleDesignMode} />
              )}
            </div>

            {workspace && (
              <Workspace
                isDesignMode={isDesignMode}
                isDateChosen={!!dateRange.startDate}
                isLoading={loading}
                isPastDateChosen={isPastDateChosen}
                isBookingListOpen={isBookingListOpen}
                selectedWorkplace={selectedWorkplace}
                dateRange={dateRange}
                workspace={workspace}
                workplaces={workplaces}
                bookings={bookingList}
                bookedByMe={bookedByMe}
                onSelect={(id: string) =>
                  selectedWorkplace === id ? setSelectedWorkplace('') : setSelectedWorkplace(id)
                }
                onClone={addWorkplace}
                onDelete={(id: string) => deleteWorkplace({ variables: { input: { id } } })}
                onDrag={handleDrag}
                onStop={handleStopDrag}
                onBook={handleCreateWorkplaceBooking}
                onBookCancel={deleteWorkplaceBooking}
                isInfoForBooked={isInfoForBooked}
                setIsInfoForBooked={setIsInfoForBooked}
                setIsBookingListOpen={setIsBookingListOpen}
              />
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </PageContent>
  )
}
