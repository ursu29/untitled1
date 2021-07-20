import { User } from '@microsoft/microsoft-graph-types'
import { FormInstance } from 'antd'
import { AAD_LOCATIONS, JOB_LEVELS, JOBS_SEPARATOR } from '../../../constants'

export const changeName = (form: FormInstance) => {
  const { givenName, surname } = form.getFieldsValue(['givenName', 'surname'])
  form.setFieldsValue({
    displayName: (givenName || '') + (givenName && surname ? ' ' : '') + (surname || ''),
    userPrincipalName:
      (givenName || '') + (givenName && surname ? '.' : '') + (surname || '') + '@syncretis.com',
    mailNickname: (givenName || '') + (givenName && surname ? '.' : '') + (surname || ''),
    mail:
      (givenName || '') + (givenName && surname ? '.' : '') + (surname || '') + '@syncretis.com',
  })
}

export const changeCity = (form: FormInstance) => {
  const city = form.getFieldValue('city')
  form.setFieldsValue({
    ...AAD_LOCATIONS.find(e => e.city === city),
  })
}

export const getUserLevel = (jobTitle: string) =>
  JOB_LEVELS.map(e => e.toLowerCase()).includes(jobTitle?.split(' ')[0].toLowerCase() || '')
    ? jobTitle?.split(' ')[0].trim()
    : undefined

export const positions = (user: User) =>
  user?.jobTitle?.split(JOBS_SEPARATOR).map(e => {
    const level = getUserLevel(e.trim())
    return {
      level,
      title: e?.replace(level || '', '').trim(),
    }
  })

export const parsePhoneNumber = (phone: string) =>
  phone.replace(/^(\+)?(7|41)/, '').replace(/\s/g, '')

export const parsePhonePrefix = (phone: string) =>
  '+' + phone.match(/^(\+)?(7|41)/)?.[0].replace('+', '')

export const strapiSyncFields = (user: User | undefined) => [
  {
    name: 'email',
    value: user?.userPrincipalName,
    adName: 'userPrincipalName',
  },
  {
    name: 'name',
    value: user?.displayName,
    adName: 'displayName',
  },
  {
    name: 'firstName',
    value: user?.givenName,
    adName: 'givenName',
  },
  {
    name: 'lastName',
    value: user?.surname,
    adName: 'surname',
  },
]

export const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
}

export const layoutWithoutLabel = {
  wrapperCol: { offset: 6, span: 17 },
}

export const changeGroupName = (form: FormInstance) => {
  const { displayName, prefixName } = form.getFieldsValue(['displayName', 'prefixName'])

  form.setFieldsValue({
    mailNickname: (prefixName || '') + (displayName || ''),
  })
}
