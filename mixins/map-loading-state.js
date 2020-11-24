import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isLoading: state => state.axios.isLoading,
      isSubmitting: state => state.axios.isSubmitting,
      axiosTriggerId: state => state.axios.triggerId,
    }),
  },
}
