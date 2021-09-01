//@ts-ignore
import { CopyOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { Group, User } from '@microsoft/microsoft-graph-types'
import { Button, Drawer, Form, Input, Select, Tabs, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FORM_RULES, GROUPS_PREFIXES } from '../../../constants'
import message from '../../../message'
import {
  useCreateEmployeeProjectsMutation,
  useRemoveEmployeeProjectsMutation,
  useUpdateEmployeeProjectsMutation,
} from '../../../queries/employees'
import { useCreateGuildMutation, useUpdateGuildMutation } from '../../../queries/guild'
import {
  GetProjectByCodeDocument,
  useCreateProjectMutation,
  useGetProjectByCodeQuery,
  useUpdateProjectMutation,
} from '../../../queries/projects'
import copyToClipboard from '../../../utils/copyToClipboard'
import GraphAPI from '../../../utils/GraphAPI'
import EmployeeSelect from '../../Employees/EmployeeSelect'
import { changeGroupName, layout } from './services'
import { EmployeesAllocations } from '../../Projects/EmployeesAllocations'

const graphAPI = new GraphAPI()
const { Option } = Select
const { TabPane } = Tabs
type ViewTypes = 'personal' | 'additional'

export default function DrawerGroup({
  visible,
  handleClose,
  handleReopen,
  group,
  users,
  type,
  getUpdatedGroups,
  getCreatedGroup,
}: {
  visible?: boolean
  handleClose: () => void
  handleReopen: (group: Group | undefined) => void
  group?: Group
  users?: User[]
  type?: 'new' | 'edit'
  getUpdatedGroups: (newGroupsIds: string[]) => Promise<Group[]>
  getCreatedGroup: (newGroupId: string) => Promise<Group>
}) {
  const isNew = type === 'new'
  const [form] = Form.useForm()
  const [formAdditional] = Form.useForm()
  const [view, setView] = useState<ViewTypes>('personal')
  const [isOptItemsClosed, setIsOptItemsClosed] = useState(true)
  const [loading, setLoading] = useState(false)
  const [membersLoading, setMembersLoading] = useState(false)
  const [initialGroupMembers, setInitialGroupMembers] = useState<string[]>([])
  const [scrumMasters, setScrumMasters] = useState<string[]>()
  const [employeeProjects, setEmployeeProjects] =
    useState<{ [id: string]: { capacity?: number; isExtraCapacity?: boolean } }>()
  const [employeeIDsErrors, setEmployeeIDsErrors] = useState<string[]>([])

  // Strapi get project for the 'additional' tab
  const { data: projectData, loading: projectLoading } = useGetProjectByCodeQuery({
    variables: { code: group?.displayName?.toLowerCase() || '' },
    fetchPolicy: 'network-only',
  })
  const project = projectData?.projectByCode
  const initialScrumMasters = project?.scrumMasters?.map(i => i.id)
  formAdditional.setFieldsValue({ scrumMasters: initialScrumMasters })

  // Strapi create project query
  const [createProject, { loading: loadingCreateProject }] = useCreateProjectMutation({
    awaitRefetchQueries: true,
    onError: e => {
      message.error(e)
    },
  })

  // Strapi create guild query
  const [createGuild, { loading: loadingCreateGuild }] = useCreateGuildMutation({
    awaitRefetchQueries: true,
    onError: e => {
      message.error(e)
    },
  })

  // Strapi update project query
  const [updateProject, { loading: loadingUpdateProject }] = useUpdateProjectMutation({
    awaitRefetchQueries: true,
    onError: e => {
      message.error(e)
    },
  })

  // Strapi update guild query
  const [updateGuild, { loading: loadingUpdateGuild }] = useUpdateGuildMutation({
    awaitRefetchQueries: true,
    onError: e => {
      message.error(e)
    },
  })

  // Strapi update employee projects query
  const [updateEmployeeProjects, { loading: loadingUpdateEmployeeProjects }] =
    useUpdateEmployeeProjectsMutation({
      awaitRefetchQueries: true,
      onError: e => {
        message.error(e)
      },
    })

  // Strapi remove employee projects query
  const [removeEmployeeProjects, { loading: loadingRemoveEmployeeProjects }] =
    useRemoveEmployeeProjectsMutation({
      awaitRefetchQueries: true,
      onError: e => {
        message.error(e)
      },
    })

  // Strapi create employee projects query
  const [createEmployeeProjects, { loading: loadingCreateEmployeeProjects }] =
    useCreateEmployeeProjectsMutation({
      awaitRefetchQueries: true,
      onError: e => {
        message.error(e)
      },
    })

  // Get group users
  const getGroupUsers = async (group: Group | undefined): Promise<string[] | undefined> => {
    setMembersLoading(true)
    if (!!group && group.displayName) {
      return await graphAPI.getGroupUsers(group.displayName).then(data => {
        const sorted = data?.sort((a, b) =>
          (a?.displayName || '').localeCompare(b?.displayName || ''),
        )
        const groupMembers = sorted?.map(e => e.userPrincipalName || '').filter(e => !!e)
        form.setFieldsValue({ members: groupMembers })
        setInitialGroupMembers(groupMembers)
        setMembersLoading(false)
        return groupMembers
      })
    }
    setMembersLoading(false)
    return
  }

  useEffect(() => {
    form.resetFields()
    formAdditional.resetFields()
    setIsOptItemsClosed(true)
    // Get user groups and insert them into the form
    getGroupUsers(group)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, group])

  const onFinish = async () => {
    const isGuild = form.getFieldValue('prefixName')?.toLowerCase().startsWith('community')
    setLoading(true)

    try {
      await formAdditional.validateFields()

      // Get form values
      const id = form.getFieldValue('id')
      let {
        members,
        prefixName,
        displayName,
        ...groupRest
      }: { members: string[]; [key: string]: any } = form.getFieldsValue(
        true,
        ({ touched }) => touched,
      )
      if (prefixName || displayName)
        groupRest.displayName = form.getFieldValue('prefixName') + form.getFieldValue('displayName')

      // Final group object with only changed fields
      const groupForSave = { ...groupRest }
      if (initialGroupMembers?.join() !== members?.join() && isNew) groupForSave.members = members
      Object.keys(groupForSave).forEach(key => {
        //@ts-ignore
        if (groupForSave[key] === '' || !groupForSave[key]?.length) groupForSave[key] = null
      })

      // REQUEST: AAD create/update group
      let updatedGroup = group
      let isGroupWasUpdated = false
      let isGroupWasCreated = false

      if (!!Object.keys(groupForSave)?.length) {
        if (isNew) {
          const createdGroup = await graphAPI.createGroup(groupForSave)
          if (!createdGroup) {
            message.error('Group has not been created')
            return
          }
          // REQUEST: Strapi create group
          if (createdGroup.displayName) {
            isGroupWasCreated = true
            updatedGroup = await getCreatedGroup(createdGroup.displayName)
            message.success('Group has been created')
            if (updatedGroup.displayName) {
              if (!isGuild) {
                await createProject({
                  variables: {
                    input: {
                      displayName: updatedGroup.displayName,
                      description: updatedGroup.description,
                      email: updatedGroup.mail,
                      members,
                    },
                  },
                })
              } else {
                await createGuild({
                  variables: {
                    input: {
                      displayName: updatedGroup.displayName,
                      description: updatedGroup.description,
                      members,
                    },
                  },
                })
              }
            }
          }
        } else if (!isNew) {
          // REQUEST: AAD update group
          const updateGroupRes = await graphAPI.updateGroup(id, groupForSave)
          if (updateGroupRes !== 'done') {
            message.error('Group has not been updated')
            setLoading(false)
            return
          }
          if (updateGroupRes === 'done') {
            if (group?.displayName) {
              updatedGroup = (
                await getUpdatedGroups([groupForSave?.displayName || group?.displayName])
              )?.[0]
              isGroupWasUpdated = true
            }
            message.success('Group has been updated')
          }
        }
      }

      // REQUEST: AAD add/remove users to/from group
      const addedUsers = members?.filter(e => !initialGroupMembers.includes(e)) || []
      const removedUsers = initialGroupMembers.filter(e => !members?.includes(e))

      const updateGroupMembersPromises = [...addedUsers, ...removedUsers]
        .map(e => {
          const userId = users?.find(
            user => user.userPrincipalName?.toLowerCase() === e.toLowerCase(),
          )?.id
          return group?.id && userId
            ? addedUsers.includes(e)
              ? graphAPI.addMemberToGroup(group.id, userId)
              : graphAPI.removeMemberFromGroup(group.id, userId)
            : undefined
        })
        .filter(e => !!e)
      const updateGroupMembersRes = await Promise.all(updateGroupMembersPromises)

      if (
        updateGroupMembersRes.some(e => e !== 'done') &&
        updateGroupMembersRes.some(e => e === 'done')
      ) {
        message.warning('Members have been updated with errors')
      } else if (updateGroupMembersRes.some(e => e === 'done')) {
        message.success('Members have been updated')
      } else if (updateGroupMembersRes.some(e => e !== 'done')) {
        message.error('Members have not been updated')
      }

      let updatedGroupMembers: string[] | undefined
      if (!!updateGroupMembersRes.length) {
        updatedGroupMembers = await getGroupUsers(updatedGroup)
      }

      // REQUEST: Strapi add/remove users to/from group
      const addedMembers = updatedGroupMembers?.filter(e => !initialGroupMembers.includes(e)) || []
      const removedMembers = initialGroupMembers.filter(e => !updatedGroupMembers?.includes(e))
      if (
        !isNew &&
        !isGuild &&
        (addedMembers?.length || removedMembers?.length) &&
        updatedGroupMembers !== undefined
      ) {
        if (addedMembers.length) {
          await createEmployeeProjects({
            variables: {
              input: addedMembers.map(e => ({ employeeMail: e, projectId: project?.id })),
            },
          })
          isGroupWasUpdated = true
        }
        if (
          removedMembers.length &&
          project?.employeeProjects &&
          updatedGroupMembers !== undefined
        ) {
          const removedMembersLC = removedMembers.map(e => e.toLowerCase())
          await removeEmployeeProjects({
            variables: {
              ids: project?.employeeProjects
                .filter(
                  e =>
                    e.employee?.email && removedMembersLC.includes(e.employee?.email.toLowerCase()),
                )
                .map(e => e.id),
            },
          })
          isGroupWasUpdated = true
        }
      }

      // REQUEST: Strapi update project
      if (!isNew && !isGuild && project?.id && isGroupWasUpdated) {
        const body: any = {}
        if (scrumMasters !== undefined && scrumMasters?.join('') !== initialScrumMasters?.join(''))
          body.scrumMasters = scrumMasters
        if (groupForSave.description !== undefined) body.description = groupForSave.description
        if (groupForSave.displayName !== undefined) body.displayName = groupForSave.displayName

        await updateProject({
          variables: {
            input: {
              id: project?.id,
              ...body,
            },
          },
          refetchQueries: [
            {
              query: GetProjectByCodeDocument,
              variables: {
                code: (groupForSave?.displayName || group?.displayName)?.toLowerCase() || '',
              },
            },
          ],
        })
        isGroupWasUpdated = true
      }

      // REQUEST: Strapi update guild
      if (!isNew && isGuild && project?.id && isGroupWasUpdated && group?.displayName) {
        const body: any = {}
        if (groupForSave.description !== undefined) body.description = groupForSave.description
        if (groupForSave.displayName !== undefined) body.displayName = groupForSave.displayName
        await updateGuild({
          variables: {
            input: {
              azureDisplayName: group.displayName,
              ...body,
            },
          },
        })
        isGroupWasUpdated = true
      }

      // REQUEST: Strapi update employee projects (occupancy percent)
      if (
        !isNew &&
        !isGuild &&
        project?.id &&
        employeeProjects &&
        Object.keys(employeeProjects)?.length
      ) {
        await updateEmployeeProjects({
          variables: {
            input: Object.keys(employeeProjects).map(key => ({
              id: key,
              ...employeeProjects[key],
            })),
          },
        })
        isGroupWasUpdated = true
        setEmployeeProjects({})
        message.success('Project allocation has been updated')
      }

      if (!isGroupWasUpdated && !isGroupWasCreated && !updateGroupMembersPromises.length) {
        message.warning('Nothing to update')
      } else {
        form.resetFields()
        formAdditional.resetFields()
        setLoading(false)
        handleReopen(updatedGroup || group)
      }
    } catch (err) {
      setLoading(false)
      console.error(err)
      message.error(`Something has gone wrong`)
    }

    setLoading(false)
  }

  const isGroupGuild = group?.displayName?.toLowerCase().startsWith('community')

  const generalLoading =
    loading ||
    loadingCreateGuild ||
    loadingCreateProject ||
    loadingUpdateProject ||
    loadingUpdateGuild ||
    projectLoading ||
    loadingUpdateEmployeeProjects ||
    loadingRemoveEmployeeProjects ||
    loadingCreateEmployeeProjects

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        handleClose()
        setView('personal')
        form.resetFields()
        formAdditional.resetFields()
      }}
      headerStyle={{ padding: 0, borderBottom: 0 }}
      title={
        <div>
          <div style={{ padding: '16px 24px' }}>{isNew ? 'New Group' : 'Edit Group'}</div>
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
            <TabPane tab="Group Data" key="personal" disabled={generalLoading} />
            {!isGroupGuild && (
              <TabPane tab="Additional" key="additional" disabled={isNew || generalLoading} />
            )}
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
          name="aad-edit-group"
          form={form}
          initialValues={{
            ...group,
            prefixName: isNew
              ? undefined
              : group?.displayName
              ? group?.displayName?.split('-')?.[0] + '-'
              : undefined,
            displayName: group?.displayName?.split('-').slice(1).join('-'),
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
            label="Members"
            name="members"
            tooltip={isGroupGuild ? 'If edited - will appear in the database on the next day' : ''}
          >
            <Select
              mode="multiple"
              options={
                users?.map(e => ({
                  label: e.displayName,
                  value: e.userPrincipalName,
                })) as any
              }
              loading={membersLoading}
            />
          </Form.Item>
          <Form.Item label="Name" name="displayName" rules={[FORM_RULES.REQUIRED]}>
            <Input
              onChange={() => changeGroupName(form)}
              addonBefore={
                <Form.Item name="prefixName" noStyle rules={[FORM_RULES.REQUIRED]}>
                  <Select style={{ width: 120 }} onChange={() => changeGroupName(form)}>
                    {GROUPS_PREFIXES?.sort((a, b) => a.localeCompare(b)).map(e => (
                      <Option value={e}>{e}</Option>
                    ))}
                  </Select>
                </Form.Item>
              }
            />
          </Form.Item>
          <Form.Item label="Mail Nickname" name="mailNickname" rules={[FORM_RULES.REQUIRED]}>
            <Input disabled={isOptItemsClosed} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ max: 1024 }]}
            tooltip={isGroupGuild ? 'If edited - will rewrite description from the guild page' : ''}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 20 }} />
          </Form.Item>
        </Form>
      </div>

      <div style={{ display: view === 'additional' ? '' : 'none' }}>
        <Form {...layout} name="aad-edit-group-additional" form={formAdditional}>
          <Form.Item label="Scrum Masters">
            <EmployeeSelect
              wide
              mode="multiple"
              keyName="id"
              value={scrumMasters !== undefined ? scrumMasters : initialScrumMasters}
              onChange={(ids: any) => setScrumMasters(ids)}
            />
          </Form.Item>
          <Form.Item label="Allocation:" name="projectsOccupancy">
            <EmployeesAllocations
              form={formAdditional}
              projectCode={group?.displayName?.toLowerCase() || ''}
              onChange={setEmployeeProjects}
              errors={employeeIDsErrors}
              onError={setEmployeeIDsErrors}
            />
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  )
}
