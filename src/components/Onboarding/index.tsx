import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Drawer, Typography } from 'antd'
import React, { useState } from 'react'
import message from '../../message'
import {
  completeOnboardingTicket,
  employeeOnboardingTickets,
  getOnboardingTickets,
  onboardingAccess,
  OnboardingTicketsQueryType,
} from '../../queries/onboardingTickets'
import { Access } from '../../types'
import Back from '../UI/Back'
import Controls from '../UI/Controls'
import PageContent from '../UI/PageContent'
import DrawerForm from './DrawerForm'
import Ticket from './Ticket'

export default function Onboarding() {
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [chosenTicket, setChosenTicket] = useState('')

  // Get all onboarding tickets
  const { data, loading, error } = useQuery<OnboardingTicketsQueryType>(getOnboardingTickets)

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

  return (
    <PageContent
      error={error}
      loading={loading}
      notFound={!data?.onboardingTickets && !isAccessWrite}
      notFoundMessage="Sorry, onboarding tickets were not found"
    >
      <Controls back={<Back />} />
      <Typography.Title style={{ display: 'flex', alignItems: 'baseline', marginBottom: '40px' }}>
        Onboarding
        {isAccessWrite && (
          <div
            style={{ color: '#40A9FF', fontSize: '20px', fontStyle: 'italic', marginLeft: '10px' }}
          >
            editing
          </div>
        )}
      </Typography.Title>

      {isAccessWrite && (
        <Button
          onClick={() => {
            setChosenTicket('')
            setDrawerVisibility(true)
          }}
          style={{ marginBottom: '30px' }}
        >
          Create New Ticket
        </Button>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data?.onboardingTickets
          .sort((a, b) => (completedTickets?.includes(a.id) ? 1 : -1))
          .map(ticket => (
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
            />
          ))}
      </div>

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
