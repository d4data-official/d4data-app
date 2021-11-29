import moment from 'moment'

export default function getDurationFromNow(date: Date): moment.Duration {
  return moment.duration(new Date().valueOf() - date?.valueOf())
}
