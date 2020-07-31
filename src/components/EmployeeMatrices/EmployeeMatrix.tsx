import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Input } from 'antd'
import ArchiveMatrix from './ArchiveMatrix'
import DetachMatrix from './DetachMatrix'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { getArchivedMatrix } from '../../queries/archiveMatrices'
import { Employee, Matrix, ArchivedMatrixData, ArchivedMatrixRaw } from '../../types'
import EmployeeSkillExperience from '../Employees/EmployeeMatrixExperience'
import Controls from '../UI/Controls'
import MatrixWithExperiences from '../Matrices/MatrixWithExperiences'
import Skeleton from '../UI/Skeleton'

interface Props {
  matrix: Matrix
  employee: Pick<Employee, 'id' | 'isMe'>
  isCurrentTab?: boolean
  onComment?: any
}

export default function EmployeeMatrix({ employee, matrix, isCurrentTab, onComment }: Props) {
  const [isArchivedChosen, setIsArchivedChosen] = useState(false)

  // Get employee experiences
  const { data, loading } = useQuery<QueryType>(getEmployeeExperiences, {
    variables: { input: { id: employee.id } },
  })

  // Get archived matrix
  const [getMatrixVersion, { data: archivedMatrixData, loading: archiveLoading }] = useLazyQuery<{
    archivedMatrix: ArchivedMatrixData
  }>(getArchivedMatrix)

  // Select matrix version
  const onSelectVersion = (version: string) => {
    if (version === 'current') {
      setIsArchivedChosen(false)
      return
    }
    setIsArchivedChosen(true)
    getMatrixVersion({ variables: { input: { id: version } } })
  }

  // Build the new matrix structure founded on archive matrix to replace original
  let archivedMatrix, archivedExperiences, archivedComment
  if (archivedMatrixData) {
    const archivedMatrixRaw: ArchivedMatrixRaw = JSON.parse(
      archivedMatrixData?.archivedMatrix.compressedData,
    )
    const notExistingSkill = (id: string) => ({
      id,
      isMatrixOnly: true,
      name: 'NOT FOUND',
    })

    const body = {
      ...matrix.body,
      ...archivedMatrixRaw.matrix,
      skills: archivedMatrixRaw.matrix.skills.map(e => ({
        ...e,
        skill:
          archivedMatrixRaw.experiences.find(exp => e.skillId === exp.skill.id)?.skill ||
          matrix.body.skills.find(skill => e.skillId === skill.skill.id)?.skill ||
          notExistingSkill(e.skillId),
      })),
    }

    archivedExperiences = archivedMatrixRaw.experiences
    archivedMatrix = { ...matrix, body }
    archivedComment = archivedMatrixRaw.comment
  }

  // Required parameters to show archive matrix
  const showArchiveAllow = isArchivedChosen && !!archivedMatrixData && !!archivedMatrix

  return (
    <Skeleton active loading={loading}>
      <ArchiveMatrix
        employeeAzureId={data?.employees[0].id || ''}
        matrixId={matrix.id}
        employeeMatrixId={matrix.employeeMatrixId || ''}
        onSelectVersion={onSelectVersion}
        createSnapshotShown={!isArchivedChosen && employee.isMe}
      />
      <MatrixWithExperiences
        matrix={showArchiveAllow && !!archivedMatrix ? archivedMatrix : matrix}
        employee={data?.employees[0]}
        EmployeeSkillExperience={EmployeeSkillExperience}
        isCurrentTab={isCurrentTab}
        isArchivedChosen={showArchiveAllow || archiveLoading}
        archivedExperiences={archivedExperiences}
      />
      <Controls>
        <DetachMatrix matrix={matrix} employee={employee} />
      </Controls>
      <div>
        {isArchivedChosen ? (
          archivedComment && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100%',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>Comment: </div>
              {archivedComment}
            </div>
          )
        ) : (
          <Input.TextArea
            placeholder="Overall comment"
            autoSize={{ minRows: 4 }}
            defaultValue={matrix.comment}
            rows={4}
            disabled={employee.isMe}
            onBlur={e => {
              onComment({
                variables: { input: { id: matrix.employeeMatrixId, comment: e.target.value } },
              })
            }}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        )}
      </div>
    </Skeleton>
  )
}
