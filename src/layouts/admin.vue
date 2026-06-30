<script setup lang="ts">
const { user, clear } = useUserSession()
const router = useRouter()

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  router.push('/admin/login')
}
</script>

<template>
  <div class="admin">
    <header class="admin-header">
      <div class="admin-header__inner">
        <a href="/admin/submissions" class="admin-brand">Éllis · Painel</a>
        <nav class="admin-nav" v-if="user">
          <NuxtLink to="/admin/submissions">Submissões</NuxtLink>
          <NuxtLink v-if="(user as any).role === 'admin'" to="/admin/users">Usuários</NuxtLink>
          <span class="admin-user">{{ (user as any).name }}</span>
          <button class="admin-logout" @click="logout">Sair</button>
        </nav>
      </div>
    </header>
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.admin {
  min-height: 100vh;
  background: #f4f5f8;
  color: #2b333b;
}
.admin-header {
  background: #fff;
  border-bottom: 1px solid #e4e7ee;
  position: sticky;
  top: 0;
  z-index: 10;
}
.admin-header__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.admin-brand {
  font-weight: 600;
  color: #2b333b;
  text-decoration: none;
  font-size: 1.05rem;
}
.admin-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  a {
    color: #54636e;
    text-decoration: none;
    font-size: 0.95rem;
    &.router-link-active { color: #5c6fec; font-weight: 500; }
  }
}
.admin-user {
  color: #8a93a0;
  font-size: 0.9rem;
}
.admin-logout {
  border: 1px solid #d3d8e2;
  background: transparent;
  border-radius: 20px;
  padding: 6px 16px;
  cursor: pointer;
  color: #54636e;
  font-family: inherit;
  &:hover { background: #5c6fec; color: #fff; border-color: #5c6fec; }
}
.admin-main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}
</style>
