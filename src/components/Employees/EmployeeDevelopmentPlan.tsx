import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState, useCallback, useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import getDevelopmentPlans, { QueryType } from '../../queries/getDevelopmentPlans'
import {
  archivedDPVersions,
  ArchivedDPVersions,
  archiveDP,
  getArchivedDP,
} from '../../queries/archiveDP'
import { Employee, Access, ArchivedDPData } from '../../types'
import message from '../../message'
import DevelopmentPlanForm from './DevelopmentPlanForm'
import ExportDevelopmentPlan from './ExportDevelopmentPlan'
import EmployeeReviewers, { ReviewersNames } from './EmployeeReviewers'
import Skeleton from '../UI/Skeleton'
import Controls from '../UI/Controls'
import VersionSnapshot from '../UI/VersionSnapshot'
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
  const [isArchivedChosen, setIsArchivedChosen] = useState(false)
  const [resetFields, toggleResetFields] = useState(false)

  const variables = { input: { employee: props.employee?.id } }

  // Get DP versions
  const { data: dataVersions } = useQuery<ArchivedDPVersions>(archivedDPVersions, {
    variables: { input: { employeeAzureId: props.employee?.id } },
  })

  // Archive DP
  const [archive] = useMutation(archiveDP, {
    onCompleted: () => {
      message.success('Snapshot has been created')
      toggleResetFields(!resetFields)
    },
    refetchQueries: [
      { query: archivedDPVersions, variables: { input: { employeeAzureId: props.employee?.id } } },
      { query: getDevelopmentPlans, variables },
    ],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  // Get archived DP
  const [getDPVersion, { data: archivedDPData }] = useLazyQuery<{
    archivedDP: ArchivedDPData
  }>(getArchivedDP)

  // Select DP version
  const onSelectVersion = (version: string) => {
    if (version === 'current') {
      setIsArchivedChosen(false)
      return
    }
    setIsArchivedChosen(true)
    toggleResetFields(!resetFields)
    getDPVersion({ variables: { input: { id: version } } })
  }

  let archivedPlan
  if (archivedDPData) {
    archivedPlan = JSON.parse(archivedDPData.archivedDP.compressedData).plan
  }

  // Get DP
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

            <VersionSnapshot
              onSelectVersion={(value: string) => onSelectVersion(value)}
              onCreateSnapshot={() =>
                archive({
                  variables: { input: { employeeAzureId: props.employee?.id } },
                })
              }
              versionsList={dataVersions?.archivedDPVersions.map(e => ({
                id: e.id,
                createdAt: e.createdAt,
              }))}
              isButtonVisible={true}
              buttonText="Add New"
            />

            <DevelopmentPlanForm
              value={isArchivedChosen && archivedPlan ? archivedPlan : plan}
              onChange={(value: any) =>
                debounced({ variables: { input: { ...value, lastUpdatedAt: plan?.updatedAt } } })
              }
              locked={isArchivedChosen}
              resetFields={resetFields}
            />
          </>
        )}
      </Skeleton>
    </div>
  )
}
