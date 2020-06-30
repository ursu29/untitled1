import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useCallback, useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import getDevelopmentPlans, { QueryType } from '../../queries/getDevelopmentPlans'
import { Employee, Access } from '../../types'
import message from '../../message'
import DevelopmentPlanForm from './DevelopmentPlanForm'
import ExportDevelopmentPlan from './ExportDevelopmentPlan'
import EmployeeReviewers, { ReviewersNames } from './EmployeeReviewers'
import Skeleton from '../UI/Skeleton'
import Controls from '../UI/Controls'
import { Typography } from 'antd'
import dayjs from 'dayjs'

const mutation = gql`
  mutation updateDevelopmentPlan($input: UpdateDevelopmentPlanInput) {
    updateDevelopmentPlan(input: $input) {
      id
    }
  }
`

interface Props {
  employee?: Pick<Employee, 'id' | 'name' | 'email' | 'isMe'>
  reviewersListAccess: Access
}

export default function EmployeeDevelopmentPlan(props: Props) {
  const variables = { input: { employee: props.employee?.id } }

  const { data, loading } = useQuery<QueryType>(getDevelopmentPlans, {
    variables,
    skip: !props.employee,
  })

  const [update, { loading: mutateLoading }] = useMutation(mutation, {
    onCompleted: () => message.success('Plan has been updated'),
    refetchQueries: [{ query: getDevelopmentPlans, variables }],
    onError: message.error,
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
            <Controls
              back={
                plan?.updatedAt ? (
                  <Typography.Text disabled>
                    Last updated: {dayjs(plan.updatedAt).format('DD MMM YYYY HH:mm')}
                  </Typography.Text>
                ) : null
              }
            >
              {props.reviewersListAccess.read && (
                <EmployeeReviewers
                  employee={props.employee!}
                  reviewersName={ReviewersNames.developmentPlanReviewers}
                  reviewersListAccess={props.reviewersListAccess}
                />
              )}
              <ExportDevelopmentPlan employee={props.employee!} plan={plan} />
            </Controls>

            <DevelopmentPlanForm
              value={plan}
              onChange={(value: any) =>
                debounced({ variables: { input: { ...value, lastUpdatedAt: plan?.updatedAt } } })
              }
            />
          </>
        )}
      </Skeleton>
    </div>
  )
}
