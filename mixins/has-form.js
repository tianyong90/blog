import Vue from 'vue'
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule],
  })
})

export default Vue.extend({
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data () {
    return {}
  },

  computed: {
    ...mapState({
      isSubmitting: state => state.axios.isSubmitting,
    }),

    isEditing () {
      return this.$route.name.includes('edit')
    },
  },
})
