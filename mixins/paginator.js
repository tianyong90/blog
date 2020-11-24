export default {
  created() {
    if (this.query.page) {
      // paginator current_page 绑定必须为 number
      this.query.page = parseInt(this.query.page)
    }

    if (this.query.per_page) {
      // paginator page_size 绑定必须为 number
      this.query.per_page = parseInt(this.query.per_page)
    }
  },

  computed: {
    paginatorVisible() {
      return this.items.data.length > 0
    },
  },
}
