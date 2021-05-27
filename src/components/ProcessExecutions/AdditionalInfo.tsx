import { useMutation } from '@apollo/client'
import React, { useState, useRef } from 'react'
import { Input, DatePicker, Button, Tooltip } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import PageContent from '../UI/PageContent'
import updateProcessExecution from '../../queries/updateProcessExecution'
import message from '../../message'
import EmployeeSelect from '../Employees/EmployeeSelect'
import { CopyOutlined } from '@ant-design/icons'
import copyToClipboard from '../../utils/copyToClipboard'
import ProjectTag from '../Projects/ProjectTag'

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`

export default function AdditionalInfo({
  processId,
  employee,
  employeeRef,
  finishDate,
  employeePhone,
  swissReOffboardingDate,
  refetchQueries,
  isNotOnboarding,
  isSwissRe,
  projectFrom,
  projectTo,
  type,
}: {
  processId: string
  employee: string
  employeeRef: string
  finishDate: string
  employeePhone: string
  swissReOffboardingDate: string
  refetchQueries: any
  isNotOnboarding: boolean
  isSwissRe: boolean
  projectFrom?: {
    id: string
    name: string
    code: string
  }
  projectTo?: {
    id: string
    name: string
    code: string
  }
  type: 'ONBOARDING' | 'ROTATION' | 'OFFBOARDING'
}) {
  const [update] = useMutation(updateProcessExecution, {
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('Updated')
    },
    onError: message.error,
  })

  const makeUpdate = (body: any) => update({ variables: { input: { id: processId, ...body } } })

  const [employeeField, setEmployeeField] = useState(employee || '')
  const [employeeRefField, setEmployeeRefField] = useState(employeeRef || '')
  const [employeePhoneField, setEmployeePhoneField] = useState(employeePhone || '')
  const [finishDateField, setFinishDateField] = useState(
    finishDate ? moment(moment(finishDate), ['DD.MM.YYYY']) : null,
  )
  const employeeSelectRef = useRef()

  return (
    <PageContent noTop noBottom>
      {type === 'ROTATION' && (
        <MainWrapper>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontStyle: 'italic',
              marginBottom: '16px',
            }}
          >
            Rotation from
            {projectFrom ? (
              <ProjectTag
                small
                project={projectFrom}
                style={{ fontSize: '11px', padding: '2px 5px', margin: '0 8px 0 8px' }}
              />
            ) : (
              ' - '
            )}
            to
            {projectTo ? (
              <ProjectTag
                small
                project={projectTo}
                style={{ fontSize: '11px', padding: '2px 5px', margin: '0 8px 0 8px' }}
              />
            ) : (
              ' - '
            )}
          </div>
        </MainWrapper>
      )}
      <MainWrapper>
        <BlockWrapper style={{ width: '30%', minWidth: '175px' }}>
          <span style={{ paddingBottom: '8px' }}>* Employee</span>
          {isNotOnboarding ? (
            <Input.Group compact style={{ display: 'flex' }}>
              <EmployeeSelect
                wide
                keyName="id"
                //@ts-expect-error
                onChange={e => setEmployeeRefField(e)}
                value={employeeRefField}
                ref={employeeSelectRef}
              />
              <Tooltip title="Copy to clipboard">
                <Button
                  onClick={() => {
                    //@ts-ignore
                    copyToClipboard(employeeSelectRef.current?.props.value.value)
                    message.success('Copied !')
                  }}
                  icon={<CopyOutlined style={{ color: 'lightgray', cursor: 'pointer' }} />}
                ></Button>
              </Tooltip>
            </Input.Group>
          ) : (
            <Input.Group compact style={{ display: 'flex' }}>
              <Input
                id="hr-tool-employee-input"
                data-cy="name"
                placeholder="Enter employee name"
                defaultValue={employee}
                onChange={e => setEmployeeField(e.target.value)}
              />
              <Tooltip title="Copy to clipboard">
                <Button
                  onClick={() => {
                    const text = (
                      document.querySelector('#hr-tool-employee-input') as HTMLInputElement
                    ).value
                    copyToClipboard(text)
                    message.success('Copied !')
                  }}
                  icon={<CopyOutlined style={{ color: 'lightgray', cursor: 'pointer' }} />}
                ></Button>
              </Tooltip>
            </Input.Group>
          )}
          <BlockWrapper style={{ marginTop: '10px', fontStyle: 'italic', fontSize: '12px' }}>
            * fill in these fields to open 'independent' steps
          </BlockWrapper>
        </BlockWrapper>
        <BlockWrapper>
          <span style={{ paddingBottom: '8px' }}>* Date</span>
          <DatePicker
            format={['DD.MM.YYYY']}
            defaultValue={finishDate ? moment(moment(finishDate), ['DD.MM.YYYY']) : undefined}
            onChange={value => setFinishDateField(value?.utcOffset(180) || null)}
            allowClear={false}
          />
        </BlockWrapper>
        <BlockWrapper style={{ width: '20%', minWidth: '100px' }}>
          <span style={{ paddingBottom: '8px' }}>* Phone</span>
          <Input
            data-cy="phone"
            placeholder="Enter employee phone"
            defaultValue={employeePhone}
            onChange={e => setEmployeePhoneField(e.target.value)}
          />
        </BlockWrapper>
        <BlockWrapper style={{ paddingTop: '30px' }}>
          <Tooltip placement="bottom" title="Save fields and open 'independent' steps">
            <Button
              data-cy="saveEmployee"
              onClick={() => {
                const body: {
                  employee?: string
                  employeeRef?: string
                  finishDate?: moment.Moment
                  employeePhone?: string
                } = {}
                if (employeeField) body.employee = employeeField
                if (employeeRefField) body.employeeRef = employeeRefField
                if (finishDateField) body.finishDate = finishDateField
                if (employeePhoneField) body.employeePhone = employeePhoneField
                makeUpdate(body)
              }}
              disabled={
                (employeeField === '' && !isNotOnboarding) ||
                (employeeRefField === '' && isNotOnboarding) ||
                finishDateField === null ||
                employeePhoneField === '' ||
                (!!employee &&
                  !isNotOnboarding &&
                  employeeField === employee &&
                  moment(finishDateField).isSame(finishDate) &&
                  employeePhoneField === employeePhone) ||
                (!!employeeRef &&
                  isNotOnboarding &&
                  employeeRefField === employeeRef &&
                  moment(finishDateField).isSame(finishDate) &&
                  employeePhoneField === employeePhone)
              }
            >
              Save
            </Button>
          </Tooltip>
        </BlockWrapper>
        {isNotOnboarding && isSwissRe && (
          <BlockWrapper style={{ marginLeft: '32px' }}>
            <span style={{ paddingBottom: '8px' }}>SwissRe Offboarding</span>
            <DatePicker
              format={['DD.MM.YYYY']}
              defaultValue={
                swissReOffboardingDate
                  ? moment(moment(swissReOffboardingDate), ['DD.MM.YYYY'])
                  : undefined
              }
              onChange={value =>
                makeUpdate({ swissReOffboardingDate: value?.utcOffset(180) || null })
              }
            />
            <span style={{ fontStyle: 'italic', fontSize: '12px', color: 'gray' }}>optional</span>
          </BlockWrapper>
        )}
      </MainWrapper>
    </PageContent>
  )
}
