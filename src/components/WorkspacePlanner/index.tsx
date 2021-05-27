import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { DownOutlined } from '@ant-design/icons'
import { Divider, Dropdown, Menu, PageHeader, Space, Spin } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React, { useEffect, useState } from 'react'
import message from '../../message'
import {
  BOOKING,
  WORKPLACE,
  WORKSPACE,
  workspaceDesignAccessQuery,
  workspaceDesignAccessQueryType,
  workspacePoolQuery,
  WorkspacePoolQueryType,
  workspaceQuery,
  WorkspaceQueryType,
} from '../../queries/workspace'
import { LOCATION, WorkplaceType } from '../../types'
import getLocationName from '../../utils/getLocationName'
import { useEmployee } from '../../utils/withEmployee'
import PageContent from '../UI/PageContent'
import BookTools from './BookTools'
import DesignModeSwitch from './DesignModeSwitch'
import './styles.css'
import Workspace from './Workspace'
import WorkspaceSelector from './WorkspaceSelector'

dayjs.extend(customParseFormat)

export default function WorkspacePlanner() {
  const employee = useEmployee()

  // State
  const [currentLocation, setCurrentLocation] = useState<LOCATION>(employee.employee.location)
  const [workplaces, setWorkplaces] = useState<WorkplaceType[]>([])
  const [isDesignMode, toggleDesignMode] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().format('DD.MM.YYYY'),
    finishDate: dayjs().format('DD.MM.YYYY'),
  })
  const [selectedWorkspace, setSelectedWorkspace] = useState('')
  const [selectedWorkplace, setSelectedWorkplace] = useState('')
  const [isInfoForBooked, setIsInfoForBooked] = useState(false)
  const [isBookingListOpen, setIsBookingListOpen] = useState(false)
  const isPastDateChosen = !dayjs().isSameOrBefore(dayjs(dateRange.startDate, 'DD.MM.YYYY'), 'day')

  useEffect(() => {
    if (isDesignMode) return
    setSelectedWorkplace('')
  }, [dateRange, workplaces, currentLocation, isDesignMode, selectedWorkspace])

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
    input: { location: currentLocation || LOCATION.SAINT_PETERSBURG },
    bookingsInput: { startDate: dateRange.startDate, finishDate: dateRange.finishDate },
  }

  const { data: dataWorkspacePool, loading: loadingWorkspacePool } =
    useQuery<WorkspacePoolQueryType>(workspacePoolQuery, {
      variables: workspacePoolQueryVariables,
    })
  const workspacePool = dataWorkspacePool

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
      setWorkplaces(dataWorkspace.workspace?.workplaces)
    },
    fetchPolicy: 'network-only',
    pollInterval: 15000,
    onError: error => {
      if (!workspacePool?.workspaces.length) return
      message.error(error)
    },
  })

  const workspace = workspacePool?.workspaces.length ? dataWorkspace?.workspace : undefined
  const bookingList = workspace?.workplaces
    .flatMap(workplace =>
      workplace.bookings?.map(booking => ({ workplaceId: workplace.id, ...booking })),
    )
    .filter(e => !!e)
    .slice()
    .sort((a, b) => {
      if (dayjs(a.startDate).isBefore(dayjs(b.startDate), 'day')) {
        return -1
      } else {
        return 1
      }
    })
  const bookedByMe = bookingList
    ?.filter(booking => booking.employeeId === employee.employee.id)
    .map(e => e.id)

  const workspaceQueryVariables = {
    id: workspace?.id,
    bookingsInput: { startDate: dateRange.startDate, finishDate: dateRange.finishDate },
  }

  /**
   *  WORKSPACE CRUD
   */

  const [createWorkspace, { loading: loadingCreateWorkspace }] = useMutation(WORKSPACE.create, {
    onCompleted: workspace => {
      const { id } = workspace.createWorkspace
      setSelectedWorkspace(id)
      getWorkspace({ variables: { id } })
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
      setSelectedWorkspace(id)
      getWorkspace({ variables: { id } })
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
      refetchGetWorkspace?.()
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
      refetchGetWorkspace?.()
    },
  })

  const [deleteWorkplace] = useMutation(WORKPLACE.delete, {
    onCompleted: workplace => {
      setWorkplaces(workplaces.filter(e => e.id !== workplace.deleteWorkplace.id))
    },
    onError: err => {
      message.error(err)
      refetchGetWorkspace?.()
    },
  })

  /**
   *  WORKPLACE BOOKING CRUD
   */

  const [createWorkplaceBooking, { loading: loadingCreateWorkplaceBooking }] = useMutation(
    BOOKING.create,
    {
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
          // employee: employee.employee.id,
          startDate: dateRange.startDate,
          finishDate: dateRange.finishDate,
        },
      },
    })
  }

  const [deleteWorkplaceBooking, { loading: loadingDeleteWorkplaceBooking }] = useMutation(
    BOOKING.delete,
    {
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
    loadingWorkspacePool ||
    loadingWorkspace ||
    loadingCreateWorkspace ||
    loadingUpdateWorkspace ||
    loadingDeleteWorkspace ||
    loadingCreateWorkplaceBooking ||
    loadingDeleteWorkplaceBooking

  const locationsMenu = (
    <Menu
      onClick={({ key }) => {
        setCurrentLocation(key as LOCATION)
      }}
    >
      {[LOCATION.SAINT_PETERSBURG, LOCATION.TOMSK, LOCATION.KALININGRAD].map(i => {
        return <Menu.Item key={i}>{getLocationName(i as LOCATION)}</Menu.Item>
      })}
    </Menu>
  )

  return (
    <PageContent style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <PageHeader
        className="site-page-header"
        title="Workspace Planner"
        extra={
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Space size={16}>
              <Dropdown overlay={locationsMenu} placement="bottomRight">
                <a
                  className="ant-dropdown-link"
                  href={`/office-planner`}
                  onClick={e => e.preventDefault()}
                >
                  {getLocationName(currentLocation)} <DownOutlined />
                </a>
              </Dropdown>
            </Space>
          </div>
        }
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Divider style={{ margin: '0' }} />
      </PageHeader>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <WorkspaceSelector
            isDesignMode={isDesignMode}
            pool={workspacePool}
            selectedWorkspace={selectedWorkspace}
            workspace={workspace}
            disabled={!workspacePool?.workspaces.length}
            onSelect={(id: string) => {
              setSelectedWorkspace(id)
              getWorkspace({ variables: { id } })
            }}
            onCreate={(value: any) =>
              createWorkspace({
                variables: { input: { ...value, location: currentLocation } },
              })
            }
            onDelete={(id: string) => deleteWorkspace({ variables: { id } })}
            onEdit={(value: any) =>
              updateWorkspace({
                variables: { input: { id: workspace?.id, ...value } },
              })
            }
            refetchGetWorkspace={refetchGetWorkspace}
          />

          {!isDesignMode && (
            <BookTools
              dateRange={dateRange}
              setDateRange={setDateRange}
              disabled={!workspacePool?.workspaces.length}
            />
          )}
        </div>

        {isDesignModeAccess && (
          <DesignModeSwitch isDesignMode={isDesignMode} toggleDesignMode={toggleDesignMode} />
        )}
      </div>

      <Divider style={{ margin: 0 }} />

      <Spin spinning={loading}>
        {!workspace && <div style={{ height: 400 }}></div>}
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
            onDelete={(id: string) => deleteWorkplace({ variables: { id } })}
            onDrag={handleDrag}
            onStop={handleStopDrag}
            onBook={handleCreateWorkplaceBooking}
            onBookCancel={deleteWorkplaceBooking}
            isInfoForBooked={isInfoForBooked}
            setIsInfoForBooked={setIsInfoForBooked}
            setIsBookingListOpen={setIsBookingListOpen}
            updateWorkplace={updateWorkplace}
          />
        )}
      </Spin>
    </PageContent>
  )
}
