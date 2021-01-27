import { Button, Typography, Spin, Modal } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { OnboardingTicket } from '../../types'
import EmployeesList from '../Employees/EmployeesList'
import {
  getEmployeesOnboardingTickets,
  EmployeesOnboardingTicketsQueryType,
} from '../../queries/onboardingTickets'

const TicketCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 304px;
  min-height: 169px;
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 24px;
  margin: 0 36px 32px 0;
`

const ViewAttendees = styled.div`
  color: #1890ff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export default function MyTickets({
  tickets,
  withResponsible,
}: {
  tickets: OnboardingTicket[]
  withResponsible: string | null
}) {
  const [attendeesModal, setAttendeesModal] = useState<{
    isOpen: boolean
    ticketTitle: string
    attendees: EmployeesOnboardingTicketsQueryType['employees']
  }>({
    isOpen: false,
    ticketTitle: '',
    attendees: [],
  })

  // Get all employees
  const { data, loading } = useQuery<EmployeesOnboardingTicketsQueryType>(
    getEmployeesOnboardingTickets,
    {
      variables: withResponsible ? { withResponsible } : {},
    },
  )

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '0 60px' }}>
        {tickets.map(ticket => {
          const requestedEmployees = data?.employees.filter(e =>
            e.requestedOnboardingTickets.map(e => e.id).includes(ticket.id),
          )

          return (
            <TicketCard key={ticket.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <Typography.Title level={4} style={{ fontSize: '18px' }}>
                    {ticket.title || 'no title'}
                  </Typography.Title>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ marginRight: '5px' }}>Attendees:</div>
                <div style={{ marginRight: '15px' }} data-cy="count">
                  {loading ? <Spin size="small" /> : requestedEmployees?.length}
                </div>
                {!loading && !!requestedEmployees?.length && (
                  <ViewAttendees
                    onClick={() =>
                      setAttendeesModal({
                        isOpen: true,
                        ticketTitle: ticket.title,
                        attendees: requestedEmployees,
                      })
                    }
                  >
                    View
                  </ViewAttendees>
                )}
              </div>

              <div data-cy="sendEmail">
                {!loading && requestedEmployees?.length ? (
                  <a
                    href={`https://outlook.office.com/owa/?path=/mail/action/compose&to=${requestedEmployees
                      .map(e => e.email)
                      .join(',')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button type="primary">Send Email</Button>
                  </a>
                ) : (
                  <Button type="primary" disabled={true}>
                    Send Email
                  </Button>
                )}
              </div>
            </TicketCard>
          )
        })}
      </div>

      <Modal
        centered
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        width={1000}
        title={<div>Attendees of {attendeesModal.ticketTitle}</div>}
        visible={attendeesModal.isOpen}
        onOk={() => setAttendeesModal({ ...attendeesModal, isOpen: false })}
        onCancel={() => setAttendeesModal({ ...attendeesModal, isOpen: false })}
        destroyOnClose={true}
        footer={null}
      >
        <EmployeesList employees={attendeesModal.attendees} loading={false} />
      </Modal>
    </>
  )
}
