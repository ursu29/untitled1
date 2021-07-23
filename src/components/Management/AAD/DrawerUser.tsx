import { CopyOutlined, LockOutlined, MinusCircleOutlined, UnlockOutlined } from '@ant-design/icons'
import { Group, User } from '@microsoft/microsoft-graph-types'
import { Button, DatePicker, Drawer, Form, Input, Select, Tabs, Tooltip } from 'antd'
import MaskedInput from 'antd-mask-input'
import moment, { Moment } from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import {
  AAD_LOCATIONS,
  DATE_FORMATS,
  FORM_RULES,
  JOBS_SEPARATOR,
  JOB_LEVELS,
  LANGUAGE_CODES,
  PHONE_MASKS,
} from '../../../constants'
import message from '../../../message'
import {
  useCreateEmployeeMutation,
  useGetEmployeeDetailedQuery,
  useUpdateEmployeeMutation,
  GetEmployeeDetailedDocument,
} from '../../../queries/employees'
import getEmployeeProjects from '../../../queries/getEmployeeProjects'
import copyToClipboard from '../../../utils/copyToClipboard'
import GraphAPI from '../../../utils/GraphAPI'
import EmployeeForm from '../../Employees/EmployeeForm'
import {
  changeCity,
  changeName,
  parsePhoneNumber,
  parsePhonePrefix,
  positions,
  strapiSyncFields,
  layout,
  layoutWithoutLabel,
} from './services'
import './styles.css'

const graphAPI = new GraphAPI()
const { Option } = Select
const { TabPane } = Tabs
type ViewTypes = 'personal' | 'additional'

export default function DrawerUser({
  visible,
  handleClose,
  handleReopen,
  user,
  groups,
  type,
  getUpdatedUsers,
  getCreatedUser,
}: {
  visible?: boolean
  handleClose: () => void
  handleReopen: (user: User | undefined) => void
  user?: User
  groups?: Group[]
  type?: 'new' | 'edit'
  getUpdatedUsers: (newUsersIds: string[]) => Promise<User[]>
  getCreatedUser: (newUserId: string) => Promise<User>
}) {
  const isNew = type === 'new'
  const [form] = Form.useForm()
  const refAdditionalForm = useRef()
  const [view, setView] = useState<ViewTypes>('personal')
  const [phonePrefix, setPhonePrefix] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOptItemsClosed, setIsOptItemsClosed] = useState(true)
  const [initialUserGroups, setInitialUserGroups] = useState<string[]>([])
  const [initialProjectsOccupancy, setInitialProjectsOccupancy] = useState([])

  // Strapi get employee for the 'additional' tab
  const { data: employeeData, loading: employeeLoading } = useGetEmployeeDetailedQuery({
    variables: { email: user?.userPrincipalName?.toLowerCase() || '' },
    fetchPolicy: 'network-only',
  })
  const employee = employeeData?.employeeByEmail

  // AAD get user groups for the 'personal data' tab
  const getUserGroups = async (user: User | undefined): Promise<string[] | undefined> => {
    if (!!user && user.userPrincipalName) {
      return await graphAPI.getUserGroups(user.userPrincipalName).then(data => {
        const sorted = data?.sort((a, b) =>
          (a?.description || '').localeCompare(b?.description || ''),
        )
        const userGroups = sorted?.map((e: any) => e.id || '').filter(e => !!e)
        form.setFieldsValue({ userGroups })
        setInitialUserGroups(userGroups)
        return userGroups
      })
    }
    return
  }

  // Strapi update employee personal data query
  const [updateEmployee, { loading: loadingUpdateEmployee }] = useUpdateEmployeeMutation({
    awaitRefetchQueries: true,
    onError: e => {
      message.error(e)
    },
  })

  // Strapi create employee query
  const [createEmployee, { loading: loadingCreateEmployee }] = useCreateEmployeeMutation({
    awaitRefetchQueries: true,
    onError: e => {
      message.error(e)
    },
  })

  // Strapi update employee additional data query
  const [updateAdditional, { loading: loadingUpdateAdditional }] = useUpdateEmployeeMutation({
    onCompleted: () => message.success('Employee additional data has been updated'),
    refetchQueries: [
      {
        query: GetEmployeeDetailedDocument,
        variables: {
          email: user?.userPrincipalName?.toLowerCase(),
        },
      },
      {
        query: getEmployeeProjects,
        variables: {
          id: employee?.id,
        },
      },
    ],
    awaitRefetchQueries: true,
    onError: e => {
      message.error(e)
    },
  })

  useEffect(() => {
    form.resetFields()
    setPhonePrefix('')
    setIsOptItemsClosed(true)
    // Get user groups and insert them into the form
    getUserGroups(user)
    // Set phone prefix
    if (!!user && user.mobilePhone) {
      setPhonePrefix(parsePhonePrefix(user.mobilePhone))
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, user])

  form.setFieldsValue({ phonePrefix })

  // Save form
  const onFinish = async () => {
    setLoading(true)

    try {
      await form.validateFields()

      // Get form values from 'personal data' tab
      const id = form.getFieldValue('id')
      let {
        userGroups,
        state,
        postalCode,
        otherMails,
        positions,
        mobilePhone,
        phonePrefix,
        ...userPersonal
      }: { userGroups: string[]; [key: string]: any } = form.getFieldsValue(
        true,
        ({ touched }) => touched,
      )
      let jobTitle = form.getFieldValue('positions')
      phonePrefix = form.getFieldValue('phonePrefix')

      // Get form values from 'additional' tab
      let additionalFormFields
      if (!isNew) {
        //@ts-ignore
        additionalFormFields = refAdditionalForm.current?.getFieldsValue()
        if (!additionalFormFields.projectsOccupancy.length) {
          //@ts-ignore
          additionalFormFields.projectsOccupancy = refAdditionalForm.current?.additionalInitial
        }
      }

      // Format raw data
      state = (state as Moment)?.set('year', 1900).format('DD.MM.YYYY')
      postalCode = (postalCode as Moment)?.format('DD.MM.YYYY')
      otherMails = otherMails?.filter((e: string) => !!e)
      jobTitle = jobTitle
        ?.map((e: any) => (e.level ? e.level + ' ' : '') + (e.title || ''))
        .join(` ${JOBS_SEPARATOR} `)
      jobTitle = jobTitle === user?.jobTitle ? undefined : jobTitle
      mobilePhone =
        phonePrefix + ' ' + (document.querySelector('#aad-edit-user_mobilePhone') as any)?.value
      mobilePhone = mobilePhone === user?.mobilePhone ? undefined : mobilePhone
      if (mobilePhone?.length < 4) mobilePhone = undefined

      const restFields = {
        state,
        postalCode,
        otherMails,
        jobTitle,
        mobilePhone,
      }

      Object.keys(restFields).forEach(key =>
        //@ts-ignore
        restFields[key] === undefined ? delete restFields[key] : {},
      )

      // Final user object with only changed fields
      const userForSave: User = { ...userPersonal, ...restFields }
      Object.keys(userForSave).forEach(key => {
        //@ts-ignore
        if (userForSave[key] === '') userForSave[key] = null
      })

      // Define added/removed groups to/from user
      const addedGroups = userGroups?.filter(e => !initialUserGroups.includes(e)) || []
      const removedGroups = initialUserGroups.filter(e => !userGroups?.includes(e))

      // REQUEST: AAD create/update user
      let updatedUser = user
      let isUserWasUpdated = false
      let isUserWasCreated = false
      if (!!Object.keys(userForSave).length) {
        if (!isNew) {
          const updateUserRes = await graphAPI.updateUser(id, userForSave)
          if (updateUserRes !== 'done') {
            message.error('User has not been updated')
            return
          }
          if (updateUserRes === 'done') {
            if (user?.id) {
              updatedUser = (await getUpdatedUsers([user.id]))?.[0]
              isUserWasUpdated = true
            }
            message.success('User has been updated')
          }
        } else if (isNew) {
          const createdUser = await graphAPI.createUser(userForSave)
          if (!createdUser) {
            message.error('User has not been created')
            return
          }
          // REQUEST: Strapi create user
          if (createdUser.id) {
            isUserWasCreated = true
            updatedUser = await getCreatedUser(createdUser.id)
            message.success('User has been created')
            const updatingFields = strapiSyncFields(updatedUser)
            const updatingUser: any = {}
            for (const field of updatingFields) {
              if (!!field.value) updatingUser[field.name] = field.value
            }
            if (additionalFormFields?.agileManager)
              updatingUser.agileManager = additionalFormFields.agileManager

            if (!!Object.keys(updatingUser).length) {
              await createEmployee({
                variables: {
                  input: {
                    ...updatingUser,
                  },
                },
                refetchQueries: [
                  {
                    query: GetEmployeeDetailedDocument,
                    variables: {
                      email: updatedUser?.userPrincipalName?.toLowerCase(),
                    },
                  },
                ],
              })
            }
          }
        }
      }

      // REQUEST: Strapi update additional data
      const inputAdditionalData: {
        id?: string
        agileManager?: string
        employeeProjects?: { id: string; capacity: number; isExtraCapacity: boolean }[]
      } = {}

      if (employee?.agileManager?.id !== additionalFormFields?.agileManager)
        inputAdditionalData.agileManager = additionalFormFields?.agileManager

      const projectsOccupancySorted = additionalFormFields?.projectsOccupancy
        ?.slice()
        ?.sort((a: any, b: any) => a?.id?.localeCompare(b?.id))
        .map((e: any) => ({
          id: e.id,
          capacity: e.capacity,
          isExtraCapacity: e.isExtraCapacity,
        }))
      const initialProjectsOccupancySorted = initialProjectsOccupancy
        .slice()
        ?.sort((a: any, b: any) => a?.id?.localeCompare(b?.id))
        .map((e: any) => ({
          id: e.id,
          capacity: e.capacity,
          isExtraCapacity: e.isExtraCapacity,
        }))

      if (
        JSON.stringify(projectsOccupancySorted) !== JSON.stringify(initialProjectsOccupancySorted)
      )
        inputAdditionalData.employeeProjects = projectsOccupancySorted

      if (!!Object.keys(inputAdditionalData).length && !!employee)
        inputAdditionalData.id = employee.id

      if (inputAdditionalData.id)
        updateAdditional({
          variables: {
            //@ts-expect-error
            input: inputAdditionalData,
          },
        })

      // REQUEST: AAD add/remove groups to/from user
      const updateGroupsPromises = [...addedGroups, ...removedGroups]
        .map(e => {
          const groupId = groups?.find(group => group.displayName === e)?.id
          const userId = user?.id
          return !!groupId && !!userId
            ? addedGroups.includes(e)
              ? graphAPI.addMemberToGroup(groupId, userId)
              : graphAPI.removeMemberFromGroup(groupId, userId)
            : undefined
        })
        .filter(e => !!e)
      const updateGroupsRes = await Promise.all(updateGroupsPromises)

      if (updateGroupsRes.some(e => e !== 'done') && updateGroupsRes.some(e => e === 'done')) {
        message.warning('Projects have been updated with errors')
      } else if (updateGroupsRes.some(e => e === 'done')) {
        message.success('Projects have been updated')
      } else if (updateGroupsRes.some(e => e !== 'done')) {
        message.error('Projects have not been updated')
      }

      let updatedUserGroups: string[] | undefined
      if (!!updateGroupsRes.length) {
        updatedUserGroups = await getUserGroups(updatedUser)
      }

      // REQUEST: Strapi add/remove groups to/from user
      const addedProjects = updatedUserGroups?.filter(e => !initialUserGroups.includes(e))
      const removedProjects = initialUserGroups?.filter(e => !updatedUserGroups?.includes(e))
      if (
        (addedProjects?.length || removedProjects?.length) &&
        employee?.id &&
        updatedUserGroups !== undefined
      ) {
        await updateEmployee({
          variables: {
            input: {
              id: employee.id,
              addEmployeeProjects: addedProjects,
              removeEmployeeProjects: removedProjects,
            },
          },
        })
      }

      // REQUEST: Strapi update user
      if (!isNew) {
        const updatingFields = strapiSyncFields(updatedUser)
        const updatingUser: any = {}
        for (const field of updatingFields) {
          if (!!field.value && !!userForSave.hasOwnProperty(field.adName))
            updatingUser[field.name] = field.value
        }
        if (!!Object.keys(updatingUser).length && employee?.id) {
          await updateEmployee({
            variables: {
              input: {
                id: employee.id,
                ...updatingUser,
              },
            },
            refetchQueries: [
              {
                query: GetEmployeeDetailedDocument,
                variables: {
                  email: updatedUser?.userPrincipalName?.toLowerCase(),
                },
              },
            ],
          })
        }
      }

      if (
        !isUserWasUpdated &&
        !isUserWasCreated &&
        !updateGroupsPromises.length &&
        !Object.keys(inputAdditionalData).length
      ) {
        message.warning('Nothing to update')
      } else {
        form.resetFields()
        handleReopen(updatedUser || user)
      }
    } catch (err) {
      setLoading(false)
      console.error(err)
      message.error(`Something has gone wrong`)
    }

    setLoading(false)
  }

  const generalLoading =
    loading || loadingUpdateAdditional || loadingUpdateEmployee || loadingCreateEmployee

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        handleClose()
        setView('personal')
        form.resetFields()
      }}
      headerStyle={{ padding: 0, borderBottom: 0 }}
      title={
        <div>
          <div style={{ padding: '16px 24px' }}>{isNew ? 'New User' : 'Edit User'}</div>
          <Tabs
            defaultActiveKey={view}
            onTabClick={key => {
              setView(key as ViewTypes)
            }}
            tabBarStyle={{
              width: '100%',
              padding: '0 0 0 24px',
              marginBottom: 0,
              marginTop: '-16px',
              fontWeight: 'normal',
            }}
          >
            <TabPane tab="Personal Data" key="personal" disabled={generalLoading} />
            <TabPane tab="Additional" key="additional" disabled={isNew || generalLoading} />
          </Tabs>
        </div>
      }
      width={550}
      footer={
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={onFinish}
            type="primary"
            loading={generalLoading}
            style={{ minWidth: '100px' }}
          >
            {isNew ? 'Create' : 'Save'}
          </Button>
          {view === 'personal' && (
            <div style={{ display: 'flex', alignItems: 'center', maxHeight: '32px' }}>
              <div style={{ fontStyle: 'italic' }}>
                {isOptItemsClosed ? 'unlock fields' : 'lock fields'}
              </div>
              <Button
                icon={isOptItemsClosed ? <LockOutlined /> : <UnlockOutlined />}
                size="large"
                shape="circle"
                type="text"
                onClick={() => setIsOptItemsClosed(!isOptItemsClosed)}
              />
            </div>
          )}
        </div>
      }
      maskClosable={false}
      destroyOnClose={true}
    >
      <div
        style={{
          display: view === 'personal' ? '' : 'none',
        }}
      >
        <Form
          {...layout}
          name="aad-edit-user"
          form={form}
          initialValues={{
            ...user,
            positions: !!user?.jobTitle ? positions(user) : [{}],
            otherMails: !!user?.otherMails?.length ? user.otherMails : [''],
            postalCode:
              user?.postalCode && moment(user?.postalCode, 'DD.MM.YYYY').isValid()
                ? moment(user?.postalCode, 'DD.MM.YYYY')
                : undefined,
            state:
              user?.state && moment(user?.state, 'DD.MM.YYYY').isValid()
                ? moment(user?.state, 'DD.MM.YYYY')
                : undefined,
            mobilePhone: user?.mobilePhone ? parsePhoneNumber(user.mobilePhone) : undefined,
            phonePrefix,
          }}
        >
          {!isNew && (
            <Form.Item label="Object ID" name="id">
              <Input
                disabled
                style={{ cursor: 'default' }}
                addonAfter={
                  <div
                    onClick={() => {
                      copyToClipboard(form.getFieldValue('id'))
                      message.success('Copied !')
                    }}
                  >
                    <Tooltip title="Copy to clipboard">
                      <CopyOutlined style={{ color: 'lightgray', cursor: 'pointer' }} />
                    </Tooltip>
                  </div>
                }
              />
            </Form.Item>
          )}
          <Form.Item
            label="Projects"
            name="userGroups"
            tooltip={isNew ? 'Will be available after user creation' : ''}
          >
            <Select
              disabled={isNew}
              mode="multiple"
              options={
                groups
                  ?.sort((a, b) => (a?.description || '').localeCompare(b?.description || ''))
                  ?.map(e => ({
                    label: e.description?.split('//')?.[0].trim() || e.displayName,
                    value: e.displayName,
                  })) as any
              }
            />
          </Form.Item>
          <Form.Item label="First Name" name="givenName" rules={[FORM_RULES.REQUIRED]}>
            <Input onChange={() => changeName(form)} />
          </Form.Item>
          <Form.Item label="Last Name" name="surname" rules={[FORM_RULES.REQUIRED]}>
            <Input onChange={() => changeName(form)} />
          </Form.Item>
          <Form.Item
            label="Name"
            name="displayName"
            style={{ display: 'flex' }}
            rules={[FORM_RULES.REQUIRED]}
          >
            <Input disabled={isOptItemsClosed} />
          </Form.Item>
          <Form.Item
            label="Principal Name"
            name="userPrincipalName"
            rules={[FORM_RULES.REQUIRED, FORM_RULES.EMAIL]}
          >
            <Input disabled={isOptItemsClosed} />
          </Form.Item>
          <Form.Item label="Mail Nickname" name="mailNickname" rules={[FORM_RULES.REQUIRED]}>
            <Input disabled={isOptItemsClosed} />
          </Form.Item>
          <Form.Item label="Mail" name="mail" rules={[FORM_RULES.EMAIL]}>
            <Input disabled={isOptItemsClosed} />
          </Form.Item>
          <Form.Item label="Swiss Re Mail" name="officeLocation" rules={[FORM_RULES.EMAIL]}>
            <Input />
          </Form.Item>
          <Form.List name="otherMails">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...field}
                    rules={[FORM_RULES.EMAIL]}
                    label={
                      index === 0 ? (
                        'Other mails'
                      ) : (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          style={{ color: 'gray' }}
                        />
                      )
                    }
                    key={field.key}
                    colon={index === 0}
                    style={{ marginBottom: '12px' }}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                ))}
                <Form.Item {...layoutWithoutLabel}>
                  <Button type="dashed" onClick={() => add()} style={{ width: '100px' }}>
                    Add
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item label="City" name="city" rules={[FORM_RULES.REQUIRED]}>
            <Select
              onChange={() => {
                changeCity(form)
                setPhonePrefix(form.getFieldValue('phonePrefix'))
              }}
              allowClear
            >
              {AAD_LOCATIONS.map(e => (
                <Option key={e.city} value={e.city}>
                  {e.city}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input
              onChange={e => {
                if (e.target.value.toLowerCase() === 'russia') setPhonePrefix('+7')
                if (e.target.value.toLowerCase() === 'switzerland') setPhonePrefix('+41')
              }}
              disabled={isOptItemsClosed}
            />
          </Form.Item>
          <Form.Item label="Street Address" name="streetAddress">
            <Input disabled={isOptItemsClosed} />
          </Form.Item>
          <Form.Item label="Usage Location" name="usageLocation">
            <Input disabled={isOptItemsClosed} />
          </Form.Item>
          <Form.Item label="Company Name" name="companyName">
            <Input disabled={isOptItemsClosed} />
          </Form.Item>
          <Form.Item label="Language" name="preferredLanguage">
            <Select allowClear disabled={isOptItemsClosed}>
              {LANGUAGE_CODES.map(e => (
                <Option key={e} value={e}>
                  {e}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Phone" name="mobilePhone">
            <MaskedInput
              addonBefore={
                <Form.Item name="phonePrefix" noStyle>
                  <Select style={{ width: 70 }} onChange={(value: string) => setPhonePrefix(value)}>
                    <Option value="+7">+7</Option>
                    <Option value="+41">+41</Option>
                  </Select>
                </Form.Item>
              }
              mask={phonePrefix === '+41' ? PHONE_MASKS.SWISS : PHONE_MASKS.RUS}
            />
          </Form.Item>
          <Form.List name="positions">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <Form.Item
                    {...restField}
                    label={
                      index === 0 ? (
                        'Position'
                      ) : (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(name)}
                          style={{ color: 'gray' }}
                        />
                      )
                    }
                    key={key}
                    colon={index === 0}
                    style={{ marginBottom: '12px' }}
                  >
                    <Input.Group compact style={{ display: 'flex' }}>
                      <Form.Item
                        {...restField}
                        noStyle
                        name={[name, 'level']}
                        fieldKey={[fieldKey, 'level']}
                      >
                        <Select allowClear style={{ minWidth: '90px' }}>
                          {JOB_LEVELS.map(e => (
                            <Option key={e} value={e}>
                              {e}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        noStyle
                        name={[name, 'title']}
                        fieldKey={[fieldKey, 'title']}
                      >
                        <Input style={{ width: '100%' }} />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                ))}
                <Form.Item {...layoutWithoutLabel}>
                  <Button type="dashed" onClick={() => add()} style={{ width: '100px' }}>
                    Add
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item label="Birthday" name="state">
            <DatePicker
              style={{ width: '100%' }}
              format={DATE_FORMATS.STANDARD_NO_YEAR}
              showToday={false}
              placeholder=""
              panelRender={panelNode => <div className="date-picker-no-year">{panelNode}</div>}
            />
          </Form.Item>
          <Form.Item label="Contract Start" name="postalCode">
            <DatePicker
              style={{ width: '100%' }}
              format={DATE_FORMATS.STANDARD_FULL}
              showToday={false}
              placeholder=""
            />
          </Form.Item>
        </Form>
      </div>

      <div style={{ display: view === 'additional' ? '' : 'none' }}>
        <EmployeeForm
          loading={employeeLoading}
          //@ts-ignore
          item={employee}
          fullAccess={true}
          refForm={refAdditionalForm}
          saveInitialProjectsOccupancy={setInitialProjectsOccupancy}
        />
      </div>
    </Drawer>
  )
}
