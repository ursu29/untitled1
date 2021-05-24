import { useMutation, useQuery } from '@apollo/client'
import { Button, Drawer, Switch, Tabs as MyTicketTabs, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import message from '../../message'
import {
  completeOnboardingTicket,
  cancelOnboardingTicket,
  employeeOnboardingTickets,
  getOnboardingTickets,
  onboardingAccess,
  OnboardingTicketsQueryType,
  requestOnboardingTicket,
  EmployeeOnboardingTicketsQueryType,
} from '../../queries/onboardingTickets'
import getEmployeeProjects, {
  GetEmployeeProjectsQuery,
  GetEmployeeProjectsVariables,
} from '../../queries/getEmployeeProjects'
import { Access } from '../../types'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import { useEmployee } from '../../utils/withEmployee'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import Tabs from '../UI/Tabs'
import DrawerForm from './DrawerForm'
import MyTickets from './MyTickets'
import Ticket from './Ticket'
import PageHeader from '../UI/PageHeader'
import URLAction from '../../utils/URLAction'
import Helmet from '../Helmet'

export default function Onboarding() {
  const user = useEmployee()
  const urlAction = new URLAction()
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [isSwissreVisible, setisSwissreVisible] = useState(false)
  const [chosenTicket, setChosenTicket] = useState('')
  const [isMyTicketsView, setIsMyTicketsView] = useState(false)

  // Get all onboarding tickets
  const {
    data: ticketsData,
    loading: ticketsLoading,
    error: ticketsError,
  } = useQuery<OnboardingTicketsQueryType>(getOnboardingTickets)
  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useQuery<GetEmployeeProjectsQuery, GetEmployeeProjectsVariables>(getEmployeeProjects, {
    variables: { id: user.employee.id },
  })

  const error = ticketsError || projectsError
  const loading = ticketsLoading || projectsLoading

  useEffect(() => {
    const projects = projectsData?.employee.projects
    const isSwissreOnlyVisibleDefault = projects
      ? projects.some(p => p.code.startsWith('sr-'))
      : false
    setisSwissreVisible(isSwissreOnlyVisibleDefault)
  }, [projectsData, isMyTicketsView])

  // Tickets with me as responsible
  const writeAccess = useStrapiGroupCheck('SUPER_USER')
  const withResponsible = writeAccess ? null : user.employee.email.toLowerCase()

  const myTickets = writeAccess
    ? ticketsData?.onboardingTickets
    : ticketsData?.onboardingTickets.filter(
        ticket =>
          ticket?.responsible?.[0]?.email.toLowerCase() === user.employee.email.toLowerCase(),
      )

  // Check write access
  const { data: onboardingAccessData } = useQuery<{ onboardingAccess: Access }>(onboardingAccess)
  const isAccessWrite = onboardingAccessData?.onboardingAccess?.write || false

  // Get completed tickets
  const { data: employeeOnboardingTicketsData } =
    useQuery<EmployeeOnboardingTicketsQueryType>(employeeOnboardingTickets)
  const completedTickets = employeeOnboardingTicketsData?.employeeOnboardingTickets.map(
    ticket => ticket.id,
  )

  // Complete ticket
  const [completeTicket] = useMutation(completeOnboardingTicket, {
    refetchQueries: [{ query: employeeOnboardingTickets }],
    awaitRefetchQueries: true,
    onCompleted: () => message.success('Ticket has been completed'),
    onError: message.error,
  })

  // Cancel ticket
  const [cancelTicket] = useMutation(cancelOnboardingTicket, {
    refetchQueries: [{ query: getOnboardingTickets }],
    awaitRefetchQueries: true,
    onCompleted: () => message.success('Ticket has been cancelled'),
    onError: message.error,
  })

  // Request ticket
  const [requestTicket] = useMutation(requestOnboardingTicket, {
    refetchQueries: [{ query: getOnboardingTickets }],
    onCompleted: () => message.success('Ticket has been requested'),
    onError: message.error,
  })

  const ticketList = ({
    isOptional,
    isCompleted,
  }: {
    isOptional: boolean
    isCompleted: boolean
  }) => {
    const list = ticketsData?.onboardingTickets
      .filter(ticket => {
        if (isCompleted || isSwissreVisible) return true
        return !ticket.isSwissre
      })
      .filter(ticket => ticket.isOptional === isOptional)
      .filter(ticket =>
        isCompleted
          ? completedTickets?.includes(ticket.id)
          : !completedTickets?.includes(ticket.id),
      )
      .slice()
      .sort((a, b) => (completedTickets?.includes(a.id) ? 1 : -1))

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {list?.length ? (
          list.map(ticket => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              isCompleted={completedTickets?.includes(ticket.id) || false}
              isAccessWrite={isAccessWrite}
              onClick={() => {
                if (!isAccessWrite) return
                setChosenTicket(ticket.id)
                setDrawerVisibility(true)
              }}
              completeTicket={() => completeTicket({ variables: { input: { id: ticket.id } } })}
              cancelTicket={() => cancelTicket({ variables: { input: { id: ticket.id } } })}
              requestTicket={() => requestTicket({ variables: { id: ticket.id } })}
            />
          ))
        ) : (
          <div style={{ color: 'gray', fontStyle: 'italic' }}>nothing here</div>
        )}
      </div>
    )
  }

  const tabs = ({ isOptional }: { isOptional: boolean }) => [
    {
      title: 'Available',
      key: 'available',
      body: ticketList({ isOptional, isCompleted: false }),
    },
    {
      title: 'Completed',
      key: 'completed',
      body: ticketList({ isOptional, isCompleted: true }),
    },
  ]

  if (loading) {
    return <Skeleton withOffset active loading={loading} />
  }

  const headerExtra = (
    <div style={{ display: 'flex' }}>
      {!isMyTicketsView && (
        <div style={{ fontSize: '14px', fontWeight: 'normal' }}>
          Show SwissRe Trainings
          <Switch
            size="small"
            checked={isSwissreVisible}
            onChange={() => {
              setisSwissreVisible(value => !value)
            }}
            style={{ marginLeft: '10px' }}
          />
        </div>
      )}
      {isAccessWrite && (
        <Button
          data-cy="create"
          onClick={() => {
            setChosenTicket('')
            setDrawerVisibility(true)
          }}
          style={{ marginLeft: '60px' }}
        >
          Create New Ticket
        </Button>
      )}
    </div>
  )

  return (
    <>
      <Helmet title="Trainings" />
      <PageHeader title="Trainings" subTitle={isAccessWrite ? 'editing' : ''} extra={headerExtra} />
      <PageContent
        error={error}
        loading={loading}
        notFound={!ticketsData?.onboardingTickets && !isAccessWrite}
        notFoundMessage="Sorry, onboarding tickets were not found"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {!!myTickets?.length && (
          <MyTicketTabs
            type="card"
            onTabClick={key => {
              setIsMyTicketsView(key === 'mine')
              urlAction.paramsClear()
            }}
            tabBarStyle={{ padding: '0 24px' }}
          >
            <MyTicketTabs.TabPane tab="All" key="all" />
            <MyTicketTabs.TabPane tab="My Trainings" key="mine" />
          </MyTicketTabs>
        )}

        {!isMyTicketsView && (
          <>
            <Typography.Title level={5} style={{ fontSize: '18px', paddingLeft: '60px' }}>
              Optional
            </Typography.Title>
            <Tabs
              tabs={tabs({ isOptional: true })}
              tab={urlAction.paramsGet('opt_tab') || tabs({ isOptional: true })[0].key}
              controlled
              tabsProps={{
                onTabClick: key => urlAction.paramsSet('opt_tab', key),
              }}
            />

            <Typography.Title level={5} style={{ fontSize: '18px', paddingLeft: '60px' }}>
              Mandatory
            </Typography.Title>
            <Tabs
              tabs={tabs({ isOptional: false })}
              tab={urlAction.paramsGet('man_tab') || tabs({ isOptional: false })[0].key}
              controlled
              tabsProps={{
                onTabClick: key => urlAction.paramsSet('man_tab', key),
              }}
            />
          </>
        )}

        {isMyTicketsView && myTickets && (
          <MyTickets tickets={myTickets} withResponsible={withResponsible} />
        )}

        <Drawer
          maskClosable={false}
          title={!chosenTicket ? 'Create New Ticket' : 'Edit Ticket'}
          width="400"
          onClose={() => setDrawerVisibility(false)}
          visible={drawerVisibility}
          destroyOnClose
        >
          <DrawerForm
            ticket={
              chosenTicket
                ? ticketsData?.onboardingTickets.find(e => e.id === chosenTicket) || null
                : null
            }
            handleClose={() => setDrawerVisibility(false)}
            withResponsible={withResponsible}
          />
        </Drawer>
      </PageContent>
    </>
  )
}
