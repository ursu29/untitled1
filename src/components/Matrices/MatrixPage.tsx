import { useQuery } from '@apollo/client'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import getMatrix, { QueryType } from '../../queries/getMatrix'
import MatrixView from './EditMatrix/Matrix'
import PageContent from '../UI/PageContent'
import CreateMatrixGrade from './EditMatrix/CreateMatrixGrade'
import CreateMatrixGroup from './EditMatrix/CreateMatrixGroup'
import CreateMatrixSkill from './EditMatrix/CreateMatrixSkill'
import DeleteMatrixSkill from './EditMatrix/DeleteMatrixSkill'
import Helmet from '../Helmet'

interface Props extends RouteComponentProps<{ id: string }> {}

function MatrixPage({ match }: Props) {
  const { id } = match.params
  const { data, loading } = useQuery<QueryType>(getMatrix, {
    variables: { input: { id } },
    skip: !id,
  })

  if (!data?.matrices?.[0]) return null

  return (
    <PageContent>
      <Helmet title={data?.matrices?.[0]?.title} />
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
