import dayjs from 'dayjs'

export default function parseStrapiDateFormat(strapiDate: string | undefined | null) {
  if (!strapiDate) return ''
  return dayjs(strapiDate, 'YYYY-MM-DD').format('DD.MM.YYYY')
}
