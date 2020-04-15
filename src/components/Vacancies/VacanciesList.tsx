import React from 'react'
import { QueryType } from '../../queries/getVacancies'
import { Table, Button, Divider } from 'antd'
import Rotate from './Rotate'
import { getVacancyLink } from '../../paths'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props {
  items?: QueryType['vacancies']
}

function ProcessList({ items, history }: Props & RouteComponentProps) {
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
        { key: 'client', dataIndex: 'customer', title: 'Client' },
        { key: 'team', dataIndex: 'project.name', title: 'Team' },
        {
          key: 'location',
          dataIndex: '.location.name',
          title: 'Location',
          render: (_, i) => {
            return <span>{i.locations?.map(i => i.name).join(' ,') ?? '-'}</span>
          },
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
                  href={`https://outlook.office.com/owa/?path=/mail/action/compose&to=Stepan.Krychkov@Sidenis.com&subject=Rotate to ${vacancy.project.name}&body=I want to apply this vacancy. My CV is attached`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ paddingRight: 8 }}
                >
                  <Button icon="form">Send CV</Button>
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
