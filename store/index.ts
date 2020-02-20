export const state = () => ({
  dropdownMenuVisible: false,
  postCount: 0,
  updatedAt: '',
})

export const mutations = {
  UPDATE_DROPDOWN_MENU_VISIBLE(state, value: boolean) {
    state.dropdownMenuVisible = value
  },

  UPDATE_POST_COUNT(state, value: boolean) {
    state.postCount = value
  },

  UPDATE_UPDATED_AT(state, value: boolean) {
    state.updatedAt = value
  },
}
