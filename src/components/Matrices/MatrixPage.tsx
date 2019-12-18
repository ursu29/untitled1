import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import getMatrix, { QueryType } from '../../queries/getMatrix'
import MatrixView from '../UI/Matrix'
import PageContent from '../UI/PageContent'
import CreateMatrixGrade from './CreateMatrixGrade'
import CreateMatrixGroup from './CreateMatrixGroup'
import CreateMatrixSkill from './CreateMatrixSkill'
import DeleteMatrixSkill from './DeleteMatrixSkill'

interface Props extends RouteComponentProps<{ id: string }> {}

function MatrixPage({ match }: Props) {
  const { id } = match.params
  const { data, loading } = useQuery<QueryType>(getMatrix, {
    variables: { input: { id } },
    skip: !id,
  })

  return (
    <PageContent>
      <MatrixView
        matrix={data?.matrices?.[0]}
        loading={loading}
        CreateMatrixGrade={CreateMatrixGrade}
        CreateMatrixGroup={CreateMatrixGroup}
        CreateMatrixSkill={CreateMatrixSkill}
        DeleteMatrixSkill={DeleteMatrixSkill}
      />
    </PageContent>
  )
}

export default withRouter(MatrixPage)
