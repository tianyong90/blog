import { Post } from 'blog/types'
import posts from '~/posts/posts.json'
import metaData from '~/posts/meta.json'

export default ({ app, store }) => {
  // 过滤掉草稿
  const publishedPosts = (posts as Array<Post>).filter((post) => {
    return !post.draft
  })

  store.commit('UPDATE_POST_COUNT', publishedPosts.length)
  store.commit('UPDATE_UPDATED_AT', metaData.updatedAt)

  const datetime = new Date()

  if (datetime.getFullYear() === 2020 && datetime.getMonth() === 3 && datetime.getDate() === 4) {
    window.document.body.classList.add('grayscale')
  }

  app.router.beforeEach((to, from, next) => {
    // 页面切换时收起下拉菜单
    store.commit('UPDATE_DROPDOWN_MENU_VISIBLE', false)

    next()
  })
}
