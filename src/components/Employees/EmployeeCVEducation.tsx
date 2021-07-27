import React, { useCallback, useEffect } from 'react'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { debounce } from 'throttle-debounce'
import moment from 'moment'
import { Employee, CurriculumVitae, EducationInput } from '../../types/graphql'
import { useUpdateCvMutation } from '../../queries/cv'
import message from '../../message'
import {
  TableTitle,
  CellDateRangeYear,
  EditableColumnType,
  EditableTable,
} from './EmployeeTableEditable'

type EmployeePick = Pick<Employee, 'id'>
type CVPick = Pick<CurriculumVitae, 'id' | 'education'>

type Props = {
  editable?: boolean
  employee: EmployeePick
  cv?: CVPick | null
}

type TableItem = {
  id: string
  name?: string | null
  speciality?: string | null
  degree?: string | null
  years?: [moment.Moment | null | undefined, moment.Moment | null | undefined] | null
}

const withoutTypename = <T extends { __typename?: string }>({ __typename, ...data }: T) => data

const EmployeeCVEducationTable = ({
  education,
  editable,
  loading,
  handleDelete,
  onSubmit,
}: {
  education: TableItem[]
  editable?: boolean
  loading?: boolean
  handleDelete: (record: TableItem) => void
  onSubmit: (record: TableItem) => void
}) => {
  const columns: EditableColumnType<TableItem>[] = [
    {
      title: 'Years',
      dataIndex: 'years',
      key: 'years',
      width: '20%',
      editable,
      Cell: CellDateRangeYear,
      render: (_, record) => {
        const [start, end] = record.years || []
        if (!start && !end) return '-'
        const dateStart = start ? moment(start).format('YYYY') : '-'
        const dateEnd = end ? moment(end).format('YYYY') : 'unfinished'
        return `${dateStart} – ${dateEnd}`
      },
    },
    {
      title: 'University',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      editable,
    },
    {
      title: 'Speciality',
      dataIndex: 'speciality',
      key: 'speciality',
      width: '20%',
      editable,
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
      width: '20%',
      editable,
    },
    {
      key: 'actions',
      width: '1%',
      render: (_, record) =>
        editable ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <Button
              type="text"
              shape="circle"
              icon={<DeleteOutlined style={{ color: '#8c8c8c' }} />}
            />
          </Popconfirm>
        ) : null,
    },
  ]

  return (
    <EditableTable
      dataSource={education}
      loading={loading}
      columns={columns}
      onRowSubmit={onSubmit}
      className="low-header"
    />
  )
}

const EmployeeCVEducation = ({ editable, employee, cv }: Props) => {
  const [update, { loading }] = useUpdateCvMutation({
    onCompleted: () => message.success('Education has been updated'),
    onError: message.error,
  })

  const cvEducation = cv?.education || []

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce(500, (education?: (EducationInput & { __typename?: string })[]) =>
      update({
        variables: {
          input: {
            id: cv?.id,
            employee: employee.id,
            education: education?.map(item => withoutTypename(item)),
          },
        },
      }),
    ),
    [update],
  )

  const handleCreate = () => {
    debouncedUpdate([...cvEducation, {}])
  }
  const handleDelete = (record: TableItem) => {
    debouncedUpdate(cvEducation.filter(cert => cert.id !== record.id))
  }
  const handleEdit = ({ years, ...record }: TableItem) => {
    const [dateStart, dateEnd] = years || []
    debouncedUpdate(
      cvEducation.map(cert => {
        if (cert.id !== record.id) return cert
        return {
          ...cert,
          ...record,
          dateStart: dateStart ? moment(dateStart).startOf('year').format('YYYY-MM-DD') : null,
          dateEnd: dateEnd ? moment(dateEnd).startOf('year').format('YYYY-MM-DD') : null,
        }
      }),
    )
  }

  useEffect(() => {
    if (loading) {
      message.loading('Updating Education')
    }
  })

  return (
    <div data-cy="cvEducation" style={{ marginBottom: 24 }}>
      <TableTitle title="Education" editable={editable} onCreate={handleCreate} />
      <EmployeeCVEducationTable
        editable={editable}
        education={cvEducation
          .slice()
          .sort((a, b) => {
            if (!a.dateStart && !a.dateEnd) return -1
            if (!a.dateEnd && b.dateEnd) return -1
            if (a.dateEnd && !b.dateEnd) return 1
            return new Date(b?.dateEnd || 0).getTime() - new Date(a?.dateEnd || 0).getTime()
          })
          .map(record => ({
            ...record,
            years: [
              record.dateStart ? moment(record.dateStart, 'YYYY-MM-DD') : undefined,
              record.dateEnd ? moment(record.dateEnd, 'YYYY-MM-DD') : undefined,
            ],
          }))}
        handleDelete={handleDelete}
        onSubmit={handleEdit}
        loading={loading}
      />
    </div>
  )
}

export default EmployeeCVEducation
