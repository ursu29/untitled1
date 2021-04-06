import React, { useCallback, useEffect } from 'react'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { debounce } from 'throttle-debounce'
import moment from 'moment'
import { Employee, CurriculumVitae, CertificateInput } from '../../types/graphql'
import { useUpdateCvMutation } from '../../queries/cv'
import message from '../../message'
import { EditableTable, CellDate, TableTitle, EditableColumnType } from './EmployeeTableEditable'
import { LINK_REGEXP, makeExternalUrl } from '../../utils/links'

type EmployeePick = Pick<Employee, 'id'>
type CVPick = Pick<CurriculumVitae, 'id' | 'certificates'>

type Props = {
  editable?: boolean
  employee: EmployeePick
  cv?: CVPick | null
}

const withoutTypename = <T extends { __typename?: string }>({ __typename, ...data }: T) => data

const DATE_API_FORMAT = 'YYYY-MM-DD'
const DATE_CLIENT_FORMAT = 'DD.MM.YYYY'

type TableItem = {
  id: string
  name?: string | null
  date?: moment.Moment | null
  expirationDate?: moment.Moment | null
  link?: string | null
}

const EmployeeCVCertificatesTable = ({
  certificates,
  editable,
  loading,
  handleDelete,
  handleEdit,
}: {
  certificates: TableItem[]
  editable?: boolean
  loading?: boolean
  handleDelete: (record: TableItem) => void
  handleEdit: (record: TableItem) => void
}) => {
  const columns: EditableColumnType<TableItem>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      editable,
      Cell: CellDate,
      render: (value: TableItem['date']) => {
        return value ? moment(value).format(DATE_CLIENT_FORMAT) : '-'
      },
    },
    {
      title: 'Expiration date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      width: '15%',
      editable,
      Cell: CellDate,
      render: (value: TableItem['expirationDate']) => {
        return value ? moment(value).format(DATE_CLIENT_FORMAT) : '-'
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      editable,
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: '30%',
      editable,
      rules: [
        {
          pattern: LINK_REGEXP,
          message: 'Please enter correct link',
        },
      ],
      render(value: TableItem['link']) {
        return value ? (
          <a href={makeExternalUrl(value)} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ) : null
      },
    },
    {
      key: 'actions',
      width: '1%',
      render: (_, record) =>
        editable ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        ) : null,
    },
  ]

  return (
    <EditableTable
      dataSource={certificates}
      loading={loading}
      columns={columns}
      onRowSubmit={handleEdit}
    />
  )
}

const EmployeeCVCertificates = ({ editable, employee, cv }: Props) => {
  const [update, { loading }] = useUpdateCvMutation({
    onCompleted: () => message.success('Certificates have been updated'),
    onError: message.error,
  })

  const cvCertificates = cv?.certificates || []

  const debouncedUpdate = useCallback(
    debounce(500, (certificates?: (CertificateInput & { __typename?: string })[]) =>
      update({
        variables: {
          input: {
            id: cv?.id,
            employee: employee.id,
            certificates: certificates?.map(item => withoutTypename(item)),
          },
        },
      }),
    ),
    [update],
  )

  const handleCreate = () => {
    debouncedUpdate([...cvCertificates, {}])
  }
  const handleDelete = (record: TableItem) => {
    debouncedUpdate(cvCertificates.filter(cert => cert.id !== record.id))
  }
  const handleEdit = (record: TableItem) => {
    debouncedUpdate(
      cvCertificates.map(cert => {
        if (cert.id !== record.id) return cert
        return {
          ...cert,
          ...record,
          date: record.date ? moment(record.date).startOf('day').format(DATE_API_FORMAT) : null,
          expirationDate: record.expirationDate
            ? moment(record.expirationDate).startOf('day').format(DATE_API_FORMAT)
            : null,
        }
      }),
    )
  }

  useEffect(() => {
    if (loading) {
      message.loading('Updating certificates')
    }
  })

  return (
    <div data-cy="cvCertificates" style={{ marginBottom: 24 }}>
      <TableTitle title="Certificates & Awards" editable={editable} onCreate={handleCreate} />
      <EmployeeCVCertificatesTable
        editable={editable}
        certificates={cvCertificates.map(record => ({
          ...record,
          date: record.date ? moment(record.date, DATE_API_FORMAT) : undefined,
          expirationDate: record.expirationDate
            ? moment(record.expirationDate, DATE_API_FORMAT)
            : undefined,
        }))}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        loading={loading}
      />
    </div>
  )
}

export default EmployeeCVCertificates
