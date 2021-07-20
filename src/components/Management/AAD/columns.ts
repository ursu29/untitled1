import { Group, User } from '@microsoft/microsoft-graph-types'
import { AAD_LOCATIONS, GROUPS_PREFIXES, LANGUAGE_CODES } from '../../../constants'

export const allUserColumns = [
  {
    title: 'Name',
    key: 'displayName',
    dataIndex: 'displayName',
  },
  {
    title: 'Principal Name',
    key: 'userPrincipalName',
    dataIndex: 'userPrincipalName',
  },
  {
    title: 'Object ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Phone',
    key: 'mobilePhone',
    dataIndex: 'mobilePhone',
  },
  {
    title: 'Position',
    key: 'jobTitle',
    dataIndex: 'jobTitle',
  },
  {
    title: 'First Name',
    key: 'givenName',
    dataIndex: 'givenName',
  },
  {
    title: 'Last Name',
    key: 'surname',
    dataIndex: 'surname',
  },
  {
    title: 'Mail Nickname',
    key: 'mailNickname',
    dataIndex: 'mailNickname',
  },
  {
    title: 'Mail',
    key: 'mail',
    dataIndex: 'mail',
  },
  {
    title: 'Swiss Re Mail',
    key: 'officeLocation',
    dataIndex: 'officeLocation',
  },
  {
    title: 'Other Mails',
    key: 'otherMails',
    dataIndex: 'otherMails',
  },
  {
    title: 'City',
    key: 'city',
    dataIndex: 'city',
    ...getLocationFilters('city'),
  },
  {
    title: 'Country',
    key: 'country',
    dataIndex: 'country',
    ...getLocationFilters('country'),
  },
  {
    title: 'Street Address',
    key: 'streetAddress',
    dataIndex: 'streetAddress',
  },
  {
    title: 'Usage Location',
    key: 'usageLocation',
    dataIndex: 'usageLocation',
    ...getLocationFilters('usageLocation'),
  },
  {
    title: 'Company Name',
    key: 'companyName',
    dataIndex: 'companyName',
    ...getLocationFilters('companyName'),
  },
  {
    title: 'Language',
    key: 'preferredLanguage',
    dataIndex: 'preferredLanguage',
    ...getLocationFilters('preferredLanguage'),
  },
  {
    title: 'Birthday',
    key: 'state',
    dataIndex: 'state',
  },
  {
    title: 'Contract Start',
    key: 'postalCode',
    dataIndex: 'postalCode',
  },
].map(e => ({
  ...e,
  sorter: (a: any, b: any) => a[e.dataIndex]?.localeCompare(b[e.dataIndex]),
}))

export const allGroupColumns = [
  {
    title: 'Name',
    key: 'displayName',
    dataIndex: 'displayName',
    filters: GROUPS_PREFIXES.sort((a, b) => a.localeCompare(b)).map(e => {
      const value = e.replace('-', '')
      return { text: value, value }
    }),
    onFilter: (value: any, record: Group) =>
      record.displayName?.toLowerCase().startsWith(value.toLowerCase()) || false,
  },
  {
    title: 'Mail',
    key: 'mail',
    dataIndex: 'mail',
  },
  {
    title: 'Object ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'Mail Nickname',
    key: 'mailNickname',
    dataIndex: 'mailNickname',
  },
].map(e => ({
  ...e,
  sorter: (a: any, b: any) => a[e.dataIndex]?.localeCompare(b[e.dataIndex]),
}))

function getLocationFilters(key: keyof Omit<typeof AAD_LOCATIONS[0], 'phonePrefix'>) {
  return {
    filters: (key !== 'preferredLanguage'
      ? Array.from(new Set(AAD_LOCATIONS.map(e => e[key])))
      : LANGUAGE_CODES
    )
      .map(e => ({ text: e, value: e }))
      .concat([
        {
          text: '... other',
          value: 'other',
        },
      ]),
    onFilter: (value: any, record: User) =>
      value !== 'other'
        ? record[key] === value
        : !AAD_LOCATIONS.map(e => e[key]).includes(record[key] || ''),
  }
}
