import dayjs from 'dayjs'

export default {
  filters: {
    friendlyTime(value, format = 'YYYY-MM-DD HH:mm:ss') {
      if (value && dayjs(value).isValid()) {
        return dayjs(value).format(format)
      }
      return '-'
    },
  },
}
