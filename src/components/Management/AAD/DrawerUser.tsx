import React, { useEffect } from 'react'
import { Form, Input, Button, Drawer, Select } from 'antd'
import { User } from '@microsoft/microsoft-graph-types'
// import { azureClient } from '../../App/Oauth'
import { AAD_LOCATIONS, JOB_LEVELS } from '../../../constants'
import { MinusCircleOutlined } from '@ant-design/icons'

const { Option } = Select

export default function DrawerUser({
  visible,
  handleClose,
  user,
  type,
}: {
  visible?: boolean
  handleClose: () => void
  user?: User
  type?: 'new' | 'edit'
}) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 },
  }
  const layoutWithoutLabel = {
    wrapperCol: { offset: 6, span: 17 },
  }

  const isNew = type === 'new'

  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [form, user])

  // const { id, ...newUser } = form.getFieldsValue()

  // const req = (id: any, user: any) => azureClient.api(`/users/${id}`).update(user)

  //   const { isLoading, data } = useFetch("https://swapi.co/api/people/1", {
  //     depends: [!!authToken, someState] // don't call request, if haven't authToken OR someState: false
  // });

  const changeName = () => {
    const { givenName, surname } = form.getFieldsValue(['givenName', 'surname'])
    form.setFieldsValue({
      displayName: (givenName || '') + (givenName && surname ? ' ' : '') + (surname || ''),
      userPrincipalName:
        (givenName || '') + (givenName && surname ? '.' : '') + (surname || '') + '@syncretis.com',
      officeLocation:
        (givenName || '') + (givenName && surname ? '_' : '') + (surname || '') + '@swissre.com',
      mailNickname: (givenName || '') + (givenName && surname ? '.' : '') + (surname || ''),
      mail:
        (givenName || '') + (givenName && surname ? '.' : '') + (surname || '') + '@syncretis.com',
    })
  }

  const changeCity = () => {
    const city = form.getFieldValue('city')
    form.setFieldsValue({
      ...AAD_LOCATIONS.find(e => e.city === city),
    })
  }

  const getUserLevel = (jobTitle: string) =>
    JOB_LEVELS.map(e => e.toLowerCase()).includes(jobTitle?.split(' ')[0].toLowerCase() || '')
      ? jobTitle?.split(' ')[0].trim()
      : undefined

  const positions = user?.jobTitle?.split('/').map(e => {
    const level = getUserLevel(e)
    return {
      level,
      title: e?.replace(level || '', '').trim(),
    }
  })

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        handleClose()
        form.resetFields()
      }}
      title={isNew ? 'New User' : 'Edit User'}
      width={550}
      footer={
        <Button
          onClick={() => {
            const { id, ...newUser } = form.getFieldsValue() //TODO: positions and other arrays
            console.log(newUser)
            // req(id, { newUser })
            handleClose()
            form.resetFields()
          }}
          type="primary"
          style={{ minWidth: '100px' }}
        >
          {isNew ? 'Create' : 'Save'}
        </Button>
      }
      maskClosable={false}
    >
      <Form
        {...layout}
        name="aad-edit-user"
        form={form}
        initialValues={{
          ...user,
          positions,
        }}
      >
        {!isNew && (
          <Form.Item label="Object ID" name="id">
            <Input disabled style={{ cursor: 'default' }} />
          </Form.Item>
        )}
        <Form.Item label="First Name" name="givenName">
          <Input onChange={changeName} />
        </Form.Item>
        <Form.Item label="Last Name" name="surname">
          <Input onChange={changeName} />
        </Form.Item>
        <Form.Item label="Name" name="displayName">
          <Input />
        </Form.Item>
        <Form.Item label="Principal Name" name="userPrincipalName">
          <Input />
        </Form.Item>
        <Form.Item label="Mail Nickname" name="mailNickname">
          <Input />
        </Form.Item>
        <Form.Item label="Mail" name="mail">
          <Input />
        </Form.Item>
        <Form.Item label="Swiss Re Mail" name="officeLocation">
          <Input />
        </Form.Item>

        <Form.Item label="Other Mails" name="otherMails">
          <Input />
        </Form.Item>

        <Form.Item label="City" name="city">
          <Select onChange={changeCity} allowClear>
            {AAD_LOCATIONS.map(e => (
              <Option value={e.city}>{e.city}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input />
        </Form.Item>
        <Form.Item label="Street Address" name="streetAddress">
          <Input />
        </Form.Item>
        <Form.Item label="Usage Location" name="usageLocation">
          <Input />
        </Form.Item>
        <Form.Item label="Company Name" name="companyName">
          <Input />
        </Form.Item>

        <Form.Item label="Language" name="preferredLanguage">
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="mobilePhone">
          <Input />
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
                          <Option value={e}>{e}</Option>
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
          <Input />
        </Form.Item>
        <Form.Item label="Contract Start" name="postalCode">
          <Input />
        </Form.Item>
        <Form.Item label="Department" name="department">
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
