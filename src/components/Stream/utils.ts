import dayjs from 'dayjs'

export const METRICS = [
  { field: 'views', icon: 'play-circle' },
  { field: 'likes', icon: 'heart' },
  { field: 'comments', icon: 'message' },
]

export const videoDuration = (duration: string) => {
  const hours = ('0' + (/\d*(?=H)/gi.exec(duration)?.[0] || 0)).slice(-2)
  const minutes = ('0' + (/\d*(?=M)/gi.exec(duration)?.[0] || 0)).slice(-2)
  const seconds = ('0' + (/[\d/.]*(?=S)/gi.exec(duration)?.[0].split('.')[0] || 0)).slice(-2)
  return [parseInt(hours, 10) ? hours + ':' : '', minutes + ':', seconds].join('')
}

export const uploadDate = (date: string) => dayjs(date).format('DD MMM YYYY')
