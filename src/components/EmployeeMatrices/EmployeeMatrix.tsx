import { useQuery } from '@apollo/client'
import { Input } from 'antd'
import React from 'react'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { ArchivedMatrixData, ArchivedMatrixRaw, Employee, Matrix } from '../../types'
import EmployeeSkillExperience from '../Employees/EmployeeMatrixExperience'
import MatrixWithExperiences from '../Matrices/MatrixWithExperiences'
import Controls from '../UI/Controls'
import Skeleton from '../UI/Skeleton'

interface Props {
  matrix: Matrix
  employee: Pick<Employee, 'id' | 'isMe'>
  isCurrentTab?: boolean
  onComment?: any
  archivedMatrixData?: { archivedMatrix: ArchivedMatrixData }
  archiveLoading: boolean
  isArchivedChosen: boolean
}

export default function EmployeeMatrix({
  employee,
  matrix,
  isCurrentTab,
  onComment,
  archivedMatrixData,
  archiveLoading,
  isArchivedChosen,
}: Props) {
  // Get employee experiences
  const { data, loading } = useQuery<QueryType>(getEmployeeExperiences, {
    variables: { input: { id: employee.id } },
  })

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
      <MatrixWithExperiences
        matrix={showArchiveAllow && !!archivedMatrix ? archivedMatrix : matrix}
        employee={data?.employees[0]}
        EmployeeSkillExperience={EmployeeSkillExperience}
        isCurrentTab={isCurrentTab}
        isArchivedChosen={showArchiveAllow || archiveLoading}
        archivedExperiences={archivedExperiences}
      />
      <Controls></Controls>
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
            disabled={employee?.isMe}
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
