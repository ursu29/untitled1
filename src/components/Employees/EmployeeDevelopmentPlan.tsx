import React, { useEffect, useCallback } from 'react'
import { Employee } from '../../types'
import DevelopmentPlanForm from '../UI/DevelopmentPlanForm'
import gql from 'graphql-tag'
import getDevelopmentPlans, { QueryType } from '../../queries/getDevelopmentPlans'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'
import message from '../../message'
import { throttle, debounce } from 'throttle-debounce'

const mutation = gql`
  mutation updateDevelopmentPlan($input: UpdateDevelopmentPlanInput) {
    updateDevelopmentPlan(input: $input) {
      id
    }
  }
`

interface Props {
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeDevelopmentPlan(props: Props) {
  const { data, loading, error } = useQuery<QueryType>(getDevelopmentPlans, {
    variables: { employee: props.employee?.id },
    skip: !props.employee,
  })

  const [update, { loading: mutateLoading }] = useMutation(mutation, {
    onCompleted: () => message.success('Plan is updated'),
  })

  const debounced = useCallback(debounce(500, update), [update])

  let plan = data?.developmentPlans[0]

  useEffect(() => {
    if (mutateLoading) {
      message.loading('Updating personal plan')
    }
  })

  return (
    <div>
      <Skeleton active loading={loading}>
        <DevelopmentPlanForm
          value={plan}
          onChange={(value: any) => debounced({ variables: { input: value } })}
        />
      </Skeleton>
    </div>
  )
}
