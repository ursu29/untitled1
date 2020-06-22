import React from 'react'
import { QueryType } from '../../queries/getProcessExecutions'
import { Table, Tag } from 'antd'
import { Button, Popconfirm } from 'antd'
import PageContent from '../UI/PageContent'
import AbortProcessExecution from './AbortProcessExecution'
import { getProcessExecutionLink } from '../../paths'
import { Link } from 'react-router-dom'

const OffboardingIcon = () => (
  <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1222 21.6476C14.5052 22.0978 13.0425 22.5031 11.5805 22.9108C9.80351 23.4063 8.02729 23.9027 6.24973 24.3957C6.08562 24.4414 5.88031 24.55 5.75765 24.4921C5.45769 24.3502 5.07584 24.1868 4.94478 23.9248C4.76815 23.5691 5.02255 23.2308 5.39115 23.0578C5.62927 22.9458 5.87909 22.8585 6.19747 22.7304C5.83722 22.2224 5.50612 21.7441 5.16377 21.2736C4.35179 20.1589 3.53893 19.0449 2.71993 17.936C2.24679 17.2947 2.33383 16.9644 3.00981 16.5646C3.76547 16.1177 4.41758 16.0793 5.20933 16.6089C6.50905 17.4795 7.91374 18.1891 9.2458 19.0148C9.72045 19.3088 10.0867 19.3325 10.5997 19.0972C15.4163 16.881 20.2718 14.7505 25.0621 12.4813C27.0338 11.5476 29.0777 11.4163 31.1739 11.4331C31.6273 11.4363 32.1267 11.5855 32.5252 11.8098C33.2369 12.2114 33.4201 13.0096 32.8811 13.6125C32.3887 14.1645 31.7742 14.6717 31.1143 14.9982C28.7985 16.1414 26.4306 17.1813 24.1029 18.3031C23.515 18.5858 22.9504 18.9675 22.4694 19.4067C20.7971 20.9321 19.153 22.4879 17.5277 24.0625C16.7451 24.8209 15.7313 25.1029 14.779 25.5118C14.6126 25.5834 14.2199 25.471 14.1442 25.3305C14.0432 25.1437 14.0684 24.7946 14.1848 24.6046C14.657 23.8253 15.1855 23.0799 15.6916 22.3217C15.804 22.1499 15.9117 21.9761 16.1222 21.6476Z"
      fill="#F5222D"
    />
  </svg>
)

const OnboardingIcon = () => (
  <svg width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.2206 12.1418C8.7989 11.47 7.51411 10.8607 6.22821 10.2537C4.66541 9.5158 3.10259 8.779 1.54089 8.03899C1.3966 7.97079 1.18459 7.9219 1.13311 7.80575C1.00752 7.52137 0.83707 7.17159 0.904763 6.90562C0.997615 6.54529 1.38519 6.4615 1.75242 6.56477C1.9898 6.63134 2.22033 6.72257 2.52444 6.82691C2.58044 6.24621 2.63899 5.70433 2.68472 5.16116C2.7925 3.87366 2.8992 2.58614 2.99842 1.29849C3.05618 0.554094 3.32028 0.373377 4.04428 0.50435C4.85359 0.650798 5.33918 1.02325 5.5757 1.88367C5.96312 3.29712 6.52361 4.66078 6.96152 6.06217C7.11763 6.56143 7.36268 6.80263 7.87034 6.95034C12.6416 8.33168 17.3878 9.79767 22.1728 11.1254C24.1421 11.6721 25.6709 12.8316 27.146 14.1281C27.4653 14.4083 27.7277 14.82 27.8726 15.2232C28.1308 15.9439 27.7715 16.6217 27.02 16.7186C26.3329 16.808 25.5866 16.7909 24.9189 16.6178C22.5774 16.0087 20.2622 15.2944 17.9253 14.6628C17.3355 14.5029 16.7015 14.4273 16.0915 14.4437C13.9717 14.4998 11.8533 14.5947 9.73661 14.7144C8.71735 14.7722 7.82615 14.3507 6.90066 14.0569C6.73896 14.0056 6.52949 13.6853 6.56196 13.5394C6.60488 13.3452 6.83671 13.1133 7.03568 13.0499C7.84776 12.7871 8.67916 12.5827 9.5024 12.3557C9.68728 12.3028 9.8701 12.2457 10.2206 12.1418Z"
      fill="#1890FF"
    />
  </svg>
)

const RotationIcon = () => (
  <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.45313 14.8519H5.06797C5.17969 14.8519 5.27109 14.7605 5.27109 14.6488V8.16659H18.6926V10.0099C18.6926 10.0582 18.7078 10.1039 18.7383 10.142C18.7554 10.1639 18.7767 10.1822 18.8009 10.1959C18.8251 10.2096 18.8518 10.2183 18.8794 10.2216C18.907 10.2249 18.935 10.2227 18.9618 10.2152C18.9886 10.2076 19.0136 10.1948 19.0354 10.1775L22.6738 7.32108C22.783 7.19412 22.7652 7.05955 22.6738 6.98592L19.0354 4.13201C18.9979 4.10206 18.9513 4.08592 18.9033 4.08631C18.7865 4.08631 18.69 4.18279 18.69 4.29959V6.14295H5.07051C4.06758 6.14295 3.25 6.96053 3.25 7.966V14.6488C3.25 14.7605 3.34141 14.8519 3.45313 14.8519ZM22.5469 12.8207H20.932C20.8203 12.8207 20.7289 12.9121 20.7289 13.0238V19.506H7.30742V17.6627C7.30742 17.6144 7.29219 17.5687 7.26172 17.5307C7.24461 17.5087 7.22334 17.4904 7.19911 17.4767C7.17489 17.4631 7.1482 17.4543 7.12059 17.451C7.09297 17.4477 7.06497 17.4499 7.03821 17.4575C7.01145 17.465 6.98645 17.4778 6.96465 17.4951L3.32617 20.3515C3.21699 20.4785 3.23477 20.6131 3.32617 20.6867L6.96465 23.5406C7.00273 23.5711 7.04844 23.5863 7.09668 23.5863C7.21348 23.5863 7.30996 23.4898 7.30996 23.373V21.5297H20.9346C21.9375 21.5297 22.7551 20.7121 22.7551 19.7066V13.0238C22.75 12.9121 22.6586 12.8207 22.5469 12.8207Z"
      fill="#52C41A"
    />
  </svg>
)

interface Props {
  items?: QueryType['processExecutions']
}

function ProcessList({ items }: Props) {
  if (!items?.length) {
    return <PageContent>No processes found</PageContent>
  }

  return (
    <Table<QueryType['processExecutions'][0]>
      rowKey="id"
      columns={[
        {
          key: 'type',
          title: 'Type',
          width: 70,
          render: (_, i) => {
            if (i.process.type === 'offboarding') return <OffboardingIcon />
            if (i.process.type === 'onboarding') return <OnboardingIcon />
            if (i.process.type === 'rotation') return <RotationIcon />
            return <div>{i.process.type}</div>
          },
        },
        { key: 'title', dataIndex: 'process.title', title: 'Name' },
        { key: 'project', dataIndex: 'project.name', title: 'Project' },
        {
          key: 'location',
          dataIndex: 'locations',
          title: 'Location',
          render: (_, process) => {
            return <span>{process?.locations?.map(i => i.name).join(' ,') ?? '-'}</span>
          },
        },
        {
          key: 'position',
          dataIndex: 'position',
          title: 'Position',
          render: (_, process) => {
            return <span>{process?.vacancy?.position}</span>
          },
        },
        {
          key: 'actions',
          align: 'right',
          render: (_, process) => {
            return (
              <>
                {process.status === 'cancelled' && <Tag color="volcano">Cancelled</Tag>}
                {process.status === 'finished' && <Tag color="green">Completed</Tag>}
                <Link to={getProcessExecutionLink(process.id)}>
                  <Button
                    onClick={() => {
                      window.scrollTo(0, 0)
                    }}
                  >
                    Open
                  </Button>
                </Link>{' '}
                {process.status === 'running' && (
                  <AbortProcessExecution id={process.id}>
                    {(abort: any) => {
                      return (
                        <Popconfirm
                          placement="top"
                          title={'Are you sure?'}
                          onConfirm={abort}
                          okText="Yes"
                          cancelText="No"
                        >
                          <span>
                            <Button>Abort</Button>
                          </span>
                        </Popconfirm>
                      )
                    }}
                  </AbortProcessExecution>
                )}
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

export default ProcessList