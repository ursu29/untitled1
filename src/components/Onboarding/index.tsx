import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Drawer, Typography, Tabs as MyTicketTabs, Switch } from 'antd'
import React, { useState } from 'react'
import message from '../../message'
import {
  completeOnboardingTicket,
  employeeOnboardingTickets,
  getOnboardingTickets,
  onboardingAccess,
  OnboardingTicketsQueryType,
  requestOnboardingTicket,
} from '../../queries/onboardingTickets'
import { Access } from '../../types'
import Back from '../UI/Back'
import Controls from '../UI/Controls'
import Tabs from '../UI/Tabs'
import PageContent from '../UI/PageContent'
import DrawerForm from './DrawerForm'
import Ticket from './Ticket'
import MyTickets from './MyTickets'
import { useEmployee } from '../../utils/withEmployee'

export default function Onboarding() {
  const user = useEmployee()

  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [isSwissReOnlyVisible, setIsSwissReOnlyVisible] = useState(false)
  const [chosenTicket, setChosenTicket] = useState('')
  const [isMyTicketsView, setIsMyTicketsView] = useState(false)

  // Get all onboarding tickets
  const { data, loading, error } = useQuery<OnboardingTicketsQueryType>(getOnboardingTickets)

  // Tickets with me as responsible
  const myTickets = data?.onboardingTickets.filter(
    ticket => ticket?.responsible?.[0]?.email.toLowerCase() === user.employee.email.toLowerCase(),
  )

  // Check write access
  const { data: onboardingAccessData } = useQuery<{ onboardingAccess: Access }>(onboardingAccess)
  const isAccessWrite = onboardingAccessData?.onboardingAccess?.write || false

  // Get completed tickets
  const { data: employeeOnboardingTicketsData } = useQuery<{ employeeOnboardingTickets: string[] }>(
    employeeOnboardingTickets,
  )
  const completedTickets = employeeOnboardingTicketsData?.employeeOnboardingTickets

  // Complete ticket
  const [completeTicket] = useMutation(completeOnboardingTicket, {
    refetchQueries: [{ query: employeeOnboardingTickets }],
    onCompleted: () => message.success('Ticket has been completed'),
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
    const list = data?.onboardingTickets
      .filter(ticket => {
        if (isCompleted || isSwissReOnlyVisible) return true
        return !ticket.isSwissRe
      })
      .filter(ticket => ticket.isOptional === isOptional)
      .filter(ticket =>
        isCompleted
          ? completedTickets?.includes(ticket.id)
          : !completedTickets?.includes(ticket.id),
      )
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

  return (
    <PageContent
      error={error}
      loading={loading}
      notFound={!data?.onboardingTickets && !isAccessWrite}
      notFoundMessage="Sorry, onboarding tickets were not found"
      style={{ padding: 0 }}
    >
      <Controls back={<Back />} style={{ padding: '20px 0 10px 30px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: '40px',
            fontSize: '20px',
            paddingLeft: '60px',
          }}
        >
          Trainings
          {isAccessWrite && (
            <div
              style={{
                color: '#40A9FF',
                fontSize: '20px',
                fontStyle: 'italic',
                marginLeft: '10px',
              }}
            >
              editing
            </div>
          )}
        </Typography.Title>
        {!isMyTicketsView && (
          <div style={{ fontSize: '14px', fontWeight: 'normal', marginRight: '30px' }}>
            Show SwissRe Trainings
            <Switch
              size="small"
              onChange={() => {
                setIsSwissReOnlyVisible(!isSwissReOnlyVisible)
              }}
              style={{ marginLeft: '10px' }}
            />
          </div>
        )}
      </div>

      {isAccessWrite && (
        <Button
          onClick={() => {
            setChosenTicket('')
            setDrawerVisibility(true)
          }}
          style={{ marginBottom: '30px', marginLeft: '60px' }}
        >
          Create New Ticket
        </Button>
      )}

      {!!myTickets?.length && (
        <MyTicketTabs
          type="card"
          onTabClick={key => {
            setIsMyTicketsView(key === 'mine')
            setIsSwissReOnlyVisible(false)
          }}
          tabBarStyle={{ padding: '0 60px' }}
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
          <Tabs tabs={tabs({ isOptional: true })} />

          <Typography.Title level={5} style={{ fontSize: '18px', paddingLeft: '60px' }}>
            Mandatory
          </Typography.Title>
          <Tabs tabs={tabs({ isOptional: false })} />
        </>
      )}

      {isMyTicketsView && myTickets && <MyTickets tickets={myTickets} />}

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
            chosenTicket ? data?.onboardingTickets.find(e => e.id === chosenTicket) || null : null
          }
          handleClose={() => setDrawerVisibility(false)}
        />
      </Drawer>
    </PageContent>
  )
}
