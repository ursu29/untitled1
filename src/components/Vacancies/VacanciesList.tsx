import React from 'react'
import { QueryType } from '../../queries/getVacancies'
import { FormOutlined } from '@ant-design/icons'
import { Table, Button, Divider } from 'antd'
import Rotate from './Rotate'
import { getVacancyLink } from '../../paths'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import PageContent from '../UI/PageContent'

interface Props {
  items?: QueryType['vacancies']
}

function ProcessList({ items = [], history }: Props & RouteComponentProps) {
  if (!items.length) {
    return <PageContent noTop>No active vacancies</PageContent>
  }

  return (
    <Table<QueryType['vacancies'][0]>
      rowKey="id"
      columns={[
        {
          key: 'position',
          dataIndex: 'position',
          title: 'Position',
          render: (_, i) => {
            return (
              <Button
                type="link"
                onClick={() => {
                  history.push(getVacancyLink(i.id))
                }}
              >
                {i.position}
              </Button>
            )
          },
        },
        {
          key: 'client',
          dataIndex: 'customer',
          title: 'Client',
          filters: [
            //@ts-ignore
            ...new Set(items.filter(e => e.project).map(e => e.customer)),
          ].map(e => ({ text: e, value: e })),
          onFilter: (value: any, record: any) => record.customer && record.customer === value,
        },
        {
          key: 'team',
          dataIndex: 'project.name',
          title: 'Team',
          render: (_, i) => {
            return <span>{i.project?.name}</span>
          },
          filters: [
            //@ts-ignore
            ...new Set(items.filter(e => e.project).map(e => e.project.name)),
          ].map(e => ({ text: e, value: e })),
          onFilter: (value: any, record: any) => record.project && record.project.name === value,
        },
        {
          key: 'location',
          dataIndex: '.location.name',
          title: 'Location',
          render: (_, i) => {
            return <span>{i.locations.join(', ') ?? '-'}</span>
          },
          filters: [
            //@ts-ignore
            ...new Set(items.filter(e => e.locations).flatMap(item => item.locations)),
          ].map(e => ({ text: e, value: e })),
          onFilter: (value: any, record: any) =>
            record.locations && record.locations.map((e: any) => e.name).includes(value),
        },
        {
          key: 'actions',
          align: 'right',
          render: (_, vacancy) => {
            return (
              <>
                <Rotate vacancy={vacancy} />
                <Divider type="vertical" />
                <a
                  href={`https://outlook.office.com/owa/?path=/mail/action/compose&to=HR1@sidenis.com&subject=Suggest a candidate to ${vacancy.project?.name}&body=I want to recommend my friend to this vacancy. His  CV is attached.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ paddingRight: 8 }}
                >
                  <Button icon={<FormOutlined />}>Suggest a Friend</Button>
                </a>
              </>
            )
          },
        },
      ]}
      dataSource={items}
      pagination={false}
    />
  )
}

export default withRouter(ProcessList)
