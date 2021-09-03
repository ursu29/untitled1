import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import message from '../../message'
import { getArchivedMatrix } from '../../queries/archiveMatrices'
import getEmployeeMatrices, { QueryType } from '../../queries/getEmployeeMatrices'
import { ArchivedMatrixData } from '../../types'
import { Access, Employee } from '../../types/graphql'
import Controls from '../UI/Controls'
import EmployeeMatricesList from './EmployeeMatricesList'
import EmployeeMatricesUpdateDate from './EmployeeMatricesUpdateDate'
import Legend from './Legend'

interface Props {
  employee?: Pick<Employee, 'id' | 'email' | 'isMe'>
  reviewersListAccess: Access
  setExportMatrices: any
}

export default function EmployeeMatrices(props: Props) {
  const { data, loading } = useQuery<QueryType>(getEmployeeMatrices, {
    variables: { input: { id: props?.employee?.id } },
    skip: !props?.employee,
  })
  const [currentTab, setCurrentTab] = useState<string>()
  const [isArchivedChosen, setIsArchivedChosen] = useState(false)

  // Get archived matrix
  const [getMatrixVersion, { data: archivedMatrixData, loading: archiveLoading }] =
    useLazyQuery<{
      archivedMatrix: ArchivedMatrixData
    }>(getArchivedMatrix)

  const employee = data?.employees?.[0]
  //Comment matrix
  const commentMutation = gql`
    mutation commentMatrix($input: CommentMatrixInput) {
      commentMatrix(input: $input) {
        id
      }
    }
  `

  const [comment] = useMutation(commentMutation, {
    onCompleted: () => message.success('Matrix is updated'),
    onError: message.error,
  })

  const onTabChange = (id: string) => {
    setCurrentTab(id)
  }

  // Select matrix version
  const onSelectVersion = (version: string) => {
    if (version === 'current') {
      setIsArchivedChosen(false)
      return
    }
    setIsArchivedChosen(true)
    getMatrixVersion({ variables: { input: { id: version } } })
  }

  // Set matrices for export. If will need to export archive version - pass setExportMatrices props to archive matrix definition
  props.setExportMatrices(employee?.matrices)

  return (
    <>
      <Controls
        back={
          <EmployeeMatricesUpdateDate
            currentTab={currentTab}
            employee={employee}
            onSelectVersion={onSelectVersion}
            isArchivedChosen={isArchivedChosen}
          />
        }
        backStyle={{
          width: '100%',
          minHeight: '88px',
          padding: '16px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FAFAFA',
        }}
      />
      <div
        style={{
          boxShadow:
            'inset -1px 0px 0px #DEDEDE, inset 0px 1px 0px #DEDEDE, inset 1px 0px 0px #DEDEDE,inset 0px -1px 0px #DEDEDE',
          borderRadius: '2px 2px 0px 0px',
          padding: '24px 24px',
          marginTop: '16px',
        }}
      >
        <Legend currentTab={currentTab} employee={employee} />
        <EmployeeMatricesList
          onTabChange={onTabChange}
          loading={loading}
          matrices={employee?.matrices}
          employee={employee}
          onComment={comment}
          archivedMatrixData={archivedMatrixData}
          archiveLoading={archiveLoading}
          isArchivedChosen={isArchivedChosen}
        />
      </div>
    </>
  )
}
