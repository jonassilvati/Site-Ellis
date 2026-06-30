<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const route = useRoute()
const { fetch: fetchSession } = useUserSession()

function safeRedirect(): string {
  const r = route.query.redirect as string | undefined
  // só permite caminhos internos do painel (evita open-redirect)
  if (r && r.startsWith('/admin') && !r.startsWith('//')) return r
  return '/admin/submissions'
}

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await fetchSession()
    // navegação real (full load): garante que o cookie de sessão acompanha
    // a requisição SSR da página protegida, sem corrida de estado no client.
    window.location.href = safeRedirect()
  } catch (e: any) {
    error.value = e?.data?.message || e?.data?.statusMessage || 'Não foi possível entrar.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrap">
    <form class="login-card" @submit.prevent="submit">
      <h1>Entrar</h1>
      <p class="subtitle">Acesso restrito ao painel da Éllis Studio.</p>

      <label>
        E-mail
        <input v-model="email" type="email" autocomplete="username" required />
      </label>
      <label>
        Senha
        <input v-model="password" type="password" autocomplete="current-password" required />
      </label>

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit" :disabled="loading">{{ loading ? 'Entrando…' : 'Entrar' }}</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login-wrap {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  width: 100%;
  max-width: 380px;
  background: #fff;
  border: 1px solid #e4e7ee;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  h1 { margin: 0; font-size: 1.5rem; }
  .subtitle { margin: 0 0 8px; color: #8a93a0; font-size: 0.9rem; }
  label { display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem; color: #54636e; }
  input {
    padding: 10px 12px;
    border: 1px solid #d3d8e2;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    &:focus { outline: none; border-color: #5c6fec; }
  }
  button {
    margin-top: 8px;
    padding: 11px;
    border: none;
    border-radius: 24px;
    background: #5c6fec;
    color: #fff;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    &:disabled { opacity: 0.6; cursor: default; }
  }
  .error { color: #d33; font-size: 0.9rem; margin: 0; }
}
</style>
