import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Matrix } from '../../types'
import CreateMatrixGrade from './CreateMatrixGrade'
import CreateMatrixGroup from './CreateMatrixGroup'
import CreateMatrixSkill from './CreateMatrixSkill'
import DeleteMatrixSkill from './DeleteMatrixSkill'
import MatrixView from '../UI/Matrix'
import PageContent from '../UI/PageContent'

const query = gql`
  query getMatrices($input: MatricesInput) {
    matrices(input: $input) {
      id
      title
      body {
        groups {
          id
          title
        }
        grades {
          id
          title
        }
        skills {
          skill {
            id
            name
            description
          }
          groupId
          gradeId
        }
      }
      access {
        read
        write
      }
    }
  }
`

interface Props extends RouteComponentProps<{ id: string }> {}

function MatrixPage({ match }: Props) {
  const { id } = match.params
  const { data, loading, error } = useQuery<{ matrices: Matrix[] }>(query, {
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
