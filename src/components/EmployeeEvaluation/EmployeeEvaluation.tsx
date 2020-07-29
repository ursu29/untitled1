import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'
import React, { useState } from 'react'
import {
  archivedSEFVersions,
  ArchivedSEFVersions,
  archiveSEF,
  getArchivedSEF,
} from '../../queries/archiveSEF'
import VersionSnapshot from '../UI/VersionSnapshot'
import getEvaluations, { QueryType } from '../../queries/getEvaluations'
import { Employee, ArchivedSEFData } from '../../types'
import EvaluationAttributes from './EvaluationAttributes'
import message from '../../message'

interface Props {
  employee?: Pick<Employee, 'id' | 'name' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
  editable: boolean
}

function EmployeeEvaluation({ employee, editable }: Props) {
  const [isArchivedChosen, setIsArchivedChosen] = useState(false)

  const { data, loading } = useQuery<QueryType>(getEvaluations, {
    variables: {
      evaluationsInput: { employee: employee?.id },
      evaluationCommentsInput: { employee: employee?.id },
    },
    skip: !employee,
  })

  // Get SEF versions
  const { data: dataVersions } = useQuery<ArchivedSEFVersions>(archivedSEFVersions, {
    variables: { input: { employeeAzureId: employee?.id } },
  })

  // Archive SEF
  const [archive] = useMutation(archiveSEF, {
    onCompleted: () => {
      message.success('New version has been created')
    },
    refetchQueries: [
      { query: archivedSEFVersions, variables: { input: { employeeAzureId: employee?.id } } },
      {
        query: getEvaluations,
        variables: {
          evaluationsInput: { employee: employee?.id },
          evaluationCommentsInput: { employee: employee?.id },
        },
      },
    ],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  // Get archived SEF
  const [getSEFVersion, { data: archivedSEFData }] = useLazyQuery<{
    archivedSEF: ArchivedSEFData
  }>(getArchivedSEF)

  // Select SEF version
  const onSelectVersion = (version: string) => {
    if (version === 'current') {
      setIsArchivedChosen(false)
      return
    }
    setIsArchivedChosen(true)
    getSEFVersion({ variables: { input: { id: version } } })
  }

  let archivedEvaluations,
    archivedComment: string = ''
  if (archivedSEFData) {
    const dataJson = JSON.parse(archivedSEFData.archivedSEF.compressedData)
    archivedEvaluations = dataJson.plan
    archivedComment = dataJson.overallComment
  }

  if (!employee) return null

  return (
    <EvaluationAttributes
      editable={editable}
      employee={employee}
      loading={loading}
      isArchivedChosen={isArchivedChosen}
      evaluations={
        isArchivedChosen && archivedEvaluations ? archivedEvaluations : data?.evaluations
      }
      comments={
        isArchivedChosen && archivedEvaluations
          ? [
              {
                body: archivedComment,
              },
            ]
          : data?.evaluationComments
      }
      versionSnapshot={() => (
        <VersionSnapshot
          onSelectVersion={(value: string) => onSelectVersion(value)}
          onCreateSnapshot={() =>
            archive({
              variables: { input: { employeeAzureId: employee?.id } },
            })
          }
          versionsList={dataVersions?.archivedSEFVersions.map(e => ({
            id: e.id,
            createdAt: e.createdAt,
          }))}
          isButtonVisible={true}
          buttonText="Create New Version"
        />
      )}
    />
  )
}

export default EmployeeEvaluation
