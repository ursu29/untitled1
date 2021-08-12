import { useMutation } from '@apollo/client'
import { Select, Tooltip } from 'antd'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import message from '../../message'
import { getProcessExecutionLink } from '../../paths'
import getProcessExecutions, { QueryType } from '../../queries/getProcessExecutions'
import updateProcessExecution from '../../queries/updateProcessExecution'
import getLocationName from '../../utils/getLocationName'
// import { getProcessName } from '../../utils/getProcessName'
import Avatar from '../Avatar'
import ProjectTag from '../Projects/ProjectTag'
import { useEmployee } from '../../utils/withEmployee'

//@ts-ignore
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]

    if (sourceColumn.name === 'Finished' || destColumn.name === 'Finished') {
      message.error('You cannot do this!')
      return
    }

    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    })
  }
  return true
}

export default function ProcessBoard({ items }: { items?: QueryType['processExecutions'] }) {
  const user = useEmployee()

  const isListIncludesUser = (
    employeesList: QueryType['processExecutions'][0]['activeStepEmployees'],
  ) => employeesList?.map(e => e.id).includes(user.employee.id)

  const initialColumns = {
    NEW: {
      name: 'New',
      items: items
        ?.filter(e => e.status === 'RUNNING' && (e.substatus === 'NEW' || !e.substatus))
        .sort((a, b) => (isListIncludesUser(a.activeStepEmployees) ? -1 : 1)),
    },
    ON_REVIEW: {
      name: 'On Review',
      items: items
        ?.filter(e => e.status === 'RUNNING' && e.substatus === 'ON_REVIEW')
        .sort((a, b) => (isListIncludesUser(a.activeStepEmployees) ? -1 : 1)),
    },
    SOURCING: {
      name: 'Sourcing',
      items: items
        ?.filter(e => e.status === 'RUNNING' && e.substatus === 'SOURCING')
        .sort((a, b) => (isListIncludesUser(a.activeStepEmployees) ? -1 : 1)),
    },
    OFFER_SENT: {
      name: 'Offer Sent',
      items: items
        ?.filter(e => e.status === 'RUNNING' && e.substatus === 'OFFER_SENT')
        .sort((a, b) => (isListIncludesUser(a.activeStepEmployees) ? -1 : 1)),
    },
    IN_PROGRESS: {
      name: 'Onboarding',
      items: items
        ?.filter(e => e.status === 'RUNNING' && e.substatus === 'IN_PROGRESS')
        .sort((a, b) => (isListIncludesUser(a.activeStepEmployees) ? -1 : 1)),
    },
    FINISHED: {
      name: 'Finished',
      items: items
        ?.filter(e => e.status === 'FINISHED')
        .sort((a, b) => (new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1))
        .slice(0, 10),
    },
  }

  const [columns, setColumns] = useState(initialColumns)
  const [columnsPrev, setColumnsPrev] = useState(initialColumns)

  const [update, { loading }] = useMutation(updateProcessExecution, {
    refetchQueries: [{ query: getProcessExecutions }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setTimeout(() => message.success('Updated'), 500)
      setColumnsPrev(columns)
    },
    onError: err => {
      message.error(err)
      setColumns(columnsPrev)
    },
  })

  if (loading) message.loading('Updating')

  const makeUpdate = async ({ id, ...body }: any) =>
    update({ variables: { input: { id, ...body } } })

  return (
    //wrapper
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 20px',
      }}
    >
      <DragDropContext
        onDragEnd={result => {
          if (onDragEnd(result, columns, setColumns))
            makeUpdate({ id: result.draggableId, substatus: result.destination?.droppableId })
        }}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '190px',
              }}
              key={columnId}
            >
              <div
                style={{
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 400,
                  marginTop: '16px',
                  marginBottom: '8px',
                  paddingLeft: '2px',
                }}
              >
                {column.name}
              </div>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 500,
                }}
              >
                <Droppable
                  droppableId={columnId}
                  key={columnId}
                  isDropDisabled={columnId === 'FINISHED'}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        data-cy="columnRef"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? '#e7f8fd' : 'transparent',
                          border: snapshot.isDraggingOver ? '3px solid #afeafd' : '',
                          padding: '0 5px',
                          height: '100%',
                        }}
                      >
                        {(column.items as any)?.map(
                          (item: QueryType['processExecutions'][0], index: number) => {
                            return (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      data-cy="refId"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        position: 'relative',
                                        userSelect: 'none',
                                        padding: '8px 8px 11px',
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        border:
                                          item.prio === 1
                                            ? '2px solid #F5222D'
                                            : item.prio === 2
                                            ? '2px solid #FAAD14'
                                            : '1px solid rgba(0, 0, 0, 0.09)',
                                        borderRadius: '2px',
                                        backgroundColor:
                                          item.prio === 1
                                            ? '#FFF2F3'
                                            : item.prio === 2
                                            ? '#FFFBF2'
                                            : '#FFFFFF',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontSize: '12px',
                                            minHeight: '20px',
                                            color: '#8C8C8C',
                                          }}
                                        >
                                          {item.locations.map(e => getLocationName(e)).join(', ')}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          {!!item.activeStepEmployees?.[0] && (
                                            <Avatar
                                              employee={
                                                item.activeStepEmployees.find(
                                                  e => e.id === user.employee.id,
                                                ) || item.activeStepEmployees[0]
                                              }
                                              size={20}
                                              showTooltip
                                            />
                                          )}
                                          <div
                                            style={{
                                              fontSize: '12px',
                                              color: 'rgba(0, 0, 0, 0.45)',
                                            }}
                                          >
                                            {(item.activeStepEmployees?.length || 0) > 1 && (
                                              <span style={{ marginLeft: '4px' }}>
                                                {'+' +
                                                  ((item.activeStepEmployees?.length || 0) - 1)}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div style={{ marginTop: '4px' }}>
                                        <Link
                                          style={{
                                            color: '#000000',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            lineHeight: '18px',
                                          }}
                                          to={getProcessExecutionLink(item.id)}
                                          target="_blank"
                                        >
                                          {item.vacancy?.position ||
                                            item.employeeRef?.name ||
                                            '(empty)'}
                                        </Link>
                                      </div>
                                      <div
                                        style={{
                                          marginTop: '4px',
                                        }}
                                      >
                                        {item.process.type === 'ROTATION' ? (
                                          <div style={{ display: 'flex', marginLeft: '10px' }}>
                                            <div
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '25px',
                                                fontWeight: 'bold',
                                                marginRight: '-25px',
                                                zIndex: 999,
                                              }}
                                            >
                                              ⤸
                                            </div>
                                            <div>
                                              <div>
                                                {item.projectFrom ? (
                                                  <ProjectTag
                                                    small
                                                    project={item.projectFrom}
                                                    style={{
                                                      fontSize: '11px',
                                                      padding: '2px 5px',
                                                    }}
                                                  />
                                                ) : (
                                                  '?'
                                                )}
                                              </div>
                                              <div>
                                                {item.projectTo ? (
                                                  <ProjectTag
                                                    small
                                                    project={item.projectTo}
                                                    style={{
                                                      fontSize: '11px',
                                                      padding: '2px 5px',
                                                    }}
                                                  />
                                                ) : (
                                                  '?'
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <div>
                                            <ProjectTag
                                              small
                                              project={item.project}
                                              style={{
                                                fontSize: '11px',
                                                padding: '2px 5px',
                                              }}
                                            />
                                          </div>
                                        )}
                                        <div
                                          style={{
                                            position: 'absolute',
                                            right: '2px',
                                            bottom: '8px',
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                          }}
                                        >
                                          <Tooltip placement="right" title="Prio">
                                            <Select
                                              data-cy="prioValue"
                                              defaultValue={item.prio}
                                              onChange={async prio => {
                                                const res = await makeUpdate({ id: item.id, prio })
                                                if (
                                                  res.data.updateProcessExecution.id === item.id
                                                ) {
                                                  //@ts-ignore
                                                  const columnChanged = columns[columnId]
                                                  setColumns({
                                                    ...columns,
                                                    [columnId]: {
                                                      ...columnChanged,
                                                      items: [
                                                        ...columnChanged.items.map((e: any) =>
                                                          e.id === item.id
                                                            ? {
                                                                ...e,
                                                                prio,
                                                              }
                                                            : e,
                                                        ),
                                                      ],
                                                    },
                                                  })
                                                }
                                              }}
                                              bordered={false}
                                              showArrow={false}
                                              style={{
                                                fontSize: '12px',
                                                color: 'rgba(0, 0, 0, 0.45)',
                                                paddingRight: '1px',
                                              }}
                                            >
                                              {Array(3)
                                                .fill(0)
                                                .map((_, i) => (
                                                  <Select.Option key={i} value={i + 1}>
                                                    {i + 1}
                                                  </Select.Option>
                                                ))}
                                            </Select>
                                          </Tooltip>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          },
                        )}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )
}
