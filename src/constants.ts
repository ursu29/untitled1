import { Rule } from 'antd/lib/form'

export const AAD_LOCATIONS = [
  {
    city: 'Saint-Petersburg',
    streetAddress: '13A Sheremetyevskaya Street, Saint Petersburg, RU-196210',
    country: 'Russia',
    companyName: 'Syncretis LLC',
    usageLocation: 'RU',
    preferredLanguage: 'en-US',
    phonePrefix: '+7',
  },
  {
    city: 'Tomsk',
    streetAddress: '103D Frunze Avenue, Tomsk, RU-634021',
    country: 'Russia',
    companyName: 'Syncretis LLC',
    usageLocation: 'RU',
    preferredLanguage: 'en-US',
    phonePrefix: '+7',
  },
  {
    city: 'Kaliningrad',
    streetAddress: '1 Victor Hugo Street, Kaliningrad, RU-236006',
    country: 'Russia',
    companyName: 'Syncretis LLC',
    usageLocation: 'RU',
    preferredLanguage: 'en-US',
    phonePrefix: '+7',
  },
  {
    city: 'Zurich',
    streetAddress: 'Klosbachstrasse 131, CH-8032 Zurich, Switzerland',
    country: 'Switzerland',
    companyName: 'Syncretis AG',
    usageLocation: 'CH',
    preferredLanguage: 'en-US',
    phonePrefix: '+41',
  },
]

export const JOB_LEVELS = ['Junior', 'Middle', 'Senior', 'Expert']

export const JOBS_SEPARATOR = '|'

export const LANGUAGE_CODES = ['en-US', 'ru-RU', 'de-DE']

export const FORM_RULES: { [key: string]: Rule } = {
  REQUIRED: { required: true, message: 'This is required field!' },
  EMAIL: {
    type: 'email',
    message: 'The input is not valid E-mail!',
  },
  URL: {
    type: 'url',
    message: 'This field must be a valid url!',
  },
}

export const DATE_FORMATS = {
  STANDARD_FULL: 'DD.MM.YYYY',
  STANDARD_NO_YEAR: 'MMMM DD',
}

export const PHONE_MASKS = {
  RUS: '(111) 111-11-11',
  SWISS: '11 111 11 11',
}

export const GROUPS_PREFIXES = ['Academy-', 'Community-', 'az-', 'guild-', 'is-', 'sr-']

export const DEBOUNCE_DELAY = {
  FORM_INPUT: 800,
}

export enum LANGUAGES {
  russian = 'Russian',
  english = 'English',
  german = 'German',
  swiss = 'Swiss',
}

export enum LANGUAGE_LEVELS {
  elementary = 'Elementary',
  beginner = 'Beginner',
  intermediate = 'Intermediate',
  upperIntermediate = 'Upper intermediate',
  advanced = 'Advanced',
  native = 'Native',
}
