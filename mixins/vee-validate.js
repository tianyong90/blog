import {
  configure,
  ValidationObserver,
  ValidationProvider,
  extend,
} from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/zh_CN.json'

configure({
  mode: 'eager',
})

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule],
  })
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
}
