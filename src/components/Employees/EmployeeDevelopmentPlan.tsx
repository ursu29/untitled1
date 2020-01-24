import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useCallback, useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import message from '../../message'
import getDevelopmentPlans, { QueryType } from '../../queries/getDevelopmentPlans'
import { Employee } from '../../types'
import DevelopmentPlanForm from '../UI/DevelopmentPlanForm'
import ExportDevelopmentPlan from './ExportDevelopmentPlan'
import Skeleton from '../UI/Skeleton'
import Controls from '../UI/Controls'

const mutation = gql`
  mutation updateDevelopmentPlan($input: UpdateDevelopmentPlanInput) {
    updateDevelopmentPlan(input: $input) {
      id
    }
  }
`

interface Props {
  employee?: Pick<Employee, 'id' | 'name'>
}

export default function EmployeeDevelopmentPlan(props: Props) {
  const variables = { input: { employee: props.employee?.id } }

  const { data, loading } = useQuery<QueryType>(getDevelopmentPlans, {
    variables,
    skip: !props.employee,
  })

  const [update, { loading: mutateLoading }] = useMutation(mutation, {
    onCompleted: () => message.success('Plan is updated'),
    refetchQueries: [{ query: getDevelopmentPlans, variables }],
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
        {!plan && <div>Plan is not found</div>}
        {plan && (
          <>
            <Controls>
              <ExportDevelopmentPlan employee={props.employee!} plan={plan} />
            </Controls>
            <DevelopmentPlanForm
              value={plan}
              onChange={(value: any) => debounced({ variables: { input: value } })}
            />
          </>
        )}
      </Skeleton>
    </div>
  )
}
