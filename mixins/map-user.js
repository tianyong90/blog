import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
  },
}
