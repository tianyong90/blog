import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
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
