export default async ({ app }) => {
  app.router.beforeEach((to, from) => {
    console.log('hello')
  })
}
