export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, user, fetch: fetchSession } = useUserSession()

  // Garante que a sessão foi carregada (importante em navegação client-side)
  if (!loggedIn.value) {
    await fetchSession()
  }

  if (!loggedIn.value) {
    return navigateTo(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  // Rotas exclusivas de admin
  if (to.path.startsWith('/admin/users') && (user.value as any)?.role !== 'admin') {
    return navigateTo('/admin/submissions')
  }
})
