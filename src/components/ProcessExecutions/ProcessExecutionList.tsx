import { CheckOutlined, CloseOutlined, PauseOutlined, PlayCircleTwoTone } from '@ant-design/icons'
import { Table, Badge, Tag, Tooltip, Select } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { getProcessExecutionLink } from '../../paths'
import { QueryType } from '../../queries/getProcessExecutions'
import { useEmployee } from '../../utils/withEmployee'
import Avatar from '../Avatar'
import ProjectTag from '../Projects/ProjectTag'
import PageContent from '../UI/PageContent'
import TableSearch from '../UI/TableSearch'
import updateProcessExecution from '../../queries/updateProcessExecution'
import getProcessExecutions from '../../queries/getProcessExecutions'
import message from '../../message'
import './styles.css'
import { LOCATION } from '../../types'
import getLocationName from '../../utils/getLocationName'

dayjs.extend(relativeTime)

interface Props {
  items?: QueryType['processExecutions']
  tabName?: string
}

function ProcessList({ items, tabName }: Props) {
  const user = useEmployee()

  const [update, { loading: updateLoading }] = useMutation(updateProcessExecution, {
    refetchQueries: [{ query: getProcessExecutions }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('Updated')
    },
    onError: message.error,
  })

  const updatePrio = (processId: string, prio: number) =>
    update({ variables: { input: { id: processId, prio } } })

  if (!items?.length) {
    return <PageContent>No processes found</PageContent>
  }

  let columns = [
    {
      key: 'status',
      width: 30,
      showSorterTooltip: false,
      render: (_: any, process: any) => {
        const getStatus = (tooltip: string, child: React.ReactChild) => (
          <Tooltip placement="left" title={tooltip}>
            {child}
          </Tooltip>
        )

        if (process.status === 'running') {
          let isPending = false
          if (
            process.status === 'running' &&
            process.process?.type === 'onboarding' &&
            !process.vacancy?.isPublished
          )
            isPending = true
          return getStatus(
            isPending ? 'Pending' : 'Running',
            <PlayCircleTwoTone
              twoToneColor={isPending ? 'orange' : '#52c41a'}
              style={{
                fontSize: '19px',
                cursor: 'pointer',
              }}
            />,
          )
        }
        if (process.status === 'holding')
          return getStatus(
            'Holding',
            <PauseOutlined style={{ fontSize: '16px', color: 'magenta', cursor: 'pointer' }} />,
          )
        if (process.status === 'cancelled')
          return getStatus(
            'Cancelled',
            <CloseOutlined style={{ color: 'red', cursor: 'pointer' }} />,
          )
        if (process.status === 'finished')
          return getStatus(
            'Completed',
            <CheckOutlined style={{ color: '#52c41a', cursor: 'pointer' }} />,
          )
      },
      sorter: (a: any, b: any) => {
        const getStatus = (processExecution: any) => {
          let status = processExecution?.status
          if (
            processExecution.status === 'running' &&
            processExecution.process?.type === 'onboarding' &&
            !processExecution.vacancy?.isPublished
          )
            status = 'pending'
          return status
        }

        return getStatus(a).localeCompare(getStatus(b))
      },
    },
    {
      key: 'title',
      dataIndex: ['process', 'title'],
      title: 'Process',
      width: 250,
      showSorterTooltip: false,
      ...TableSearch('title', 'process'),
      render: (_: any, i: any) => {
        return (
          <div style={{ whiteSpace: 'break-spaces' }}>
            <Link to={getProcessExecutionLink(i.id)} title={i.process.title} target="_blank">
              {i.process.title}
            </Link>
            <br />
            <Tag
              style={{ color: '#aaaaaa', fontSize: '13px', fontStyle: 'italic', marginTop: '3px' }}
            >
              {i.process.type}
            </Tag>
          </div>
        )
      },
      ellipsis: true,
      sorter: (a: any, b: any) => a.process?.title.localeCompare(b.process?.title),
    },
    {
      key: 'project',
      dataIndex: ['project', 'name'],
      title: 'Project',
      showSorterTooltip: false,
      filters: [
        //@ts-ignore
        ...new Set(items.filter(e => e?.project && e?.project?.name).map(e => e?.project?.name)),
      ].map(e => ({ text: e, value: e })),
      onFilter: (value: any, record: any) => record.project?.name === value,
      render: (_: any, i: any) => {
        return (
          <ProjectTag small project={i.project} style={{ fontSize: '11px', padding: '2px 5px' }} />
        )
      },
      sorter: (a: any, b: any) => (a.project?.name || '').localeCompare(b.project?.name || ''),
    },
    {
      key: 'location',
      dataIndex: 'locations',
      title: 'Location',
      showSorterTooltip: false,
      render: (_: any, process: any) => {
        const locations =
          (process?.locations as LOCATION[])
            ?.map((i: any) => (i === LOCATION.SAINT_PETERSBURG ? 'Saint-P' : getLocationName(i)))
            .join(', ') ?? '-'
        return (
          <span title={locations} style={{ whiteSpace: 'break-spaces' }}>
            {locations}
          </span>
        )
      },
      filters: [
        //@ts-ignore
        ...new Set(items.filter(e => e?.locations).flatMap(item => item.locations)),
      ].map(e => ({ text: getLocationName(e), value: e })),
      onFilter: (value: any, record: any) => record.locations && record.locations.includes(value),
      sorter: (a: any, b: any) =>
        a.locations.sort().join('').localeCompare(b.locations.sort().join('')),
    },
    {
      key: 'position',
      dataIndex: ['vacancy', 'position'],
      title: 'Position',
      width: 150,
      showSorterTooltip: false,
      ...TableSearch('position', 'vacancy'),
      sorter: (a: any, b: any) =>
        (a.vacancy?.position || '').localeCompare(b.vacancy?.position || ''),
    },
    {
      key: 'employee',
      dataIndex: 'employee',
      title: 'Employee',
      width: 150,
      showSorterTooltip: false,
      render: (_: any, process: any) => {
        return <div style={{ whiteSpace: 'break-spaces' }}>{process?.employee}</div>
      },
      ellipsis: true,
      sorter: (a: any, b: any) => (a?.employee || '').localeCompare(b?.employee || ''),
    },
    {
      key: 'finishDate',
      dataIndex: 'finishDate',
      title: 'Date',
      width: 90,
      showSorterTooltip: false,
      render: (_: any, process: any) => {
        const date = dayjs(process.finishDate).format('DD.MM.YYYY')
        return (
          process?.finishDate && (
            <div style={{ display: 'flex', flexDirection: 'column' }} title={date}>
              <span>{date}</span>
            </div>
          )
        )
      },
      sorter: (a: any, b: any, sortOrder: string) => {
        if (sortOrder === 'ascend') {
          if (!a.finishDate && b.finishDate) return 1
          if (a.finishDate && !b.finishDate) return -1
        }
        if (sortOrder === 'descend') {
          if (!a.finishDate && b.finishDate) return -1
          if (a.finishDate && !b.finishDate) return 1
        }
        //@ts-ignore
        return new Date(a.finishDate) - new Date(b.finishDate)
      },
      ellipsis: true,
    },
  ]

  if (tabName !== 'archived') {
    //@ts-ignore
    columns = columns.concat([
      {
        key: 'responsible',
        title: 'Responsible',
        showSorterTooltip: false,
        render: (_, process) => {
          const responsibleList = [
            //@ts-ignore
            ...new Set(
              process.activeStepEmployees?.sort((a: any, b: any) =>
                a?.email.toLowerCase() === user.employee?.email.toLowerCase() ? -1 : 1,
              ),
            ),
          ]
          return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {responsibleList.map((responsible: any) => {
                const count = process.activeStepEmployees.filter(
                  (e: any) => e?.email.toLowerCase() === responsible?.email.toLowerCase(),
                ).length

                return (
                  <React.Fragment key={responsible?.email}>
                    <div
                      style={{
                        margin: '3px',
                        borderRadius: '50%',
                        boxShadow:
                          user.employee?.email.toLowerCase() === responsible?.email.toLowerCase()
                            ? '#108ee9 0px 0px 0px 3px'
                            : '',
                      }}
                    >
                      <Avatar employee={responsible} size="small" showTooltip />
                    </div>
                    <Badge
                      count={count > 1 ? count : 0}
                      size="small"
                      offset={[-10, 15]}
                      style={{
                        backgroundColor: '#108ee9',
                        marginRight: '-10px',
                        position: 'absolute',
                      }}
                    />
                  </React.Fragment>
                )
              })}
            </div>
          )
        },
        filters: [
          //@ts-ignore
          ...new Set(
            items
              .filter(e => e?.activeStepEmployees)
              .flatMap(item => {
                if (item.activeStepEmployees) return item.activeStepEmployees.map(e => e?.name)
                return []
              }),
          ),
        ].map(e => ({ text: e, value: e })),
        onFilter: (value: any, record: any) =>
          record.activeStepEmployees
            ? record.activeStepEmployees.map((e: any) => e?.name).includes(value)
            : false,
        sorter: (a: any, b: any) =>
          a.activeStepEmployees
            ?.map((e: any) => e?.name)
            .sort()
            .join('')
            .localeCompare(
              b.activeStepEmployees
                ?.map((e: any) => e?.name)
                .sort()
                .join(''),
            ),
      },
      {
        key: 'prio',
        dataIndex: 'prio',
        title: 'Prio',
        width: '80px',
        showSorterTooltip: false,
        sorter: (a: any, b: any) => a.prio - b.prio,
        render: (_, process) => {
          return (
            <Select
              defaultValue={process.prio}
              onChange={prio => updatePrio(process.id, prio)}
              bordered={false}
              disabled={updateLoading}
            >
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Select.Option value={i + 1}>{i + 1}</Select.Option>
                ))}
            </Select>
          )
        },
      },
    ])
  }

  const sortedItems = items.sort((a: any, b: any) => {
    if (tabName === 'archived') return 1

    const includesUserEmail = (e: any) =>
      e?.activeStepEmployees
        ?.map((e: any) => e?.email?.toLowerCase())
        ?.includes(user?.employee?.email?.toLowerCase())
    if (includesUserEmail(a) && !includesUserEmail(b)) return -1
    else return 1
  })

  return (
    <Table<QueryType['processExecutions'][0]>
      rowKey="id"
      rowClassName={rec => (rec.prio === 1 ? 'row-highlight' : '')}
      //@ts-ignore
      columns={columns}
      dataSource={sortedItems
        .filter(e => e.status !== 'HOLDING')
        .concat(sortedItems.filter(e => e.status === 'HOLDING'))}
      size="small"
      pagination={{ showSizeChanger: true }}
    />
  )
}

export default ProcessList
