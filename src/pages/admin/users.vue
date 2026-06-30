<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

interface UserRow {
  id: string
  name: string
  email: string
  role: 'admin' | 'viewer'
  createdAt: string
}

const { user } = useUserSession()
const { data: users, refresh } = await useFetch<UserRow[]>('/api/users')

const form = reactive({ name: '', email: '', password: '', role: 'viewer' })
const error = ref('')
const success = ref('')
const loading = ref(false)

async function createUser() {
  error.value = ''
  success.value = ''
  loading.value = true
  try {
    await $fetch('/api/users', { method: 'POST', body: { ...form } })
    success.value = 'Usuário cadastrado com sucesso.'
    form.name = ''
    form.email = ''
    form.password = ''
    form.role = 'viewer'
    await refresh()
  } catch (e: any) {
    error.value = e?.data?.message || e?.data?.statusMessage || 'Não foi possível cadastrar.'
  } finally {
    loading.value = false
  }
}

async function removeUser(u: UserRow) {
  if (!confirm(`Remover o usuário ${u.name} (${u.email})?`)) return
  try {
    await $fetch(`/api/users/${u.id}`, { method: 'DELETE' })
    await refresh()
  } catch (e: any) {
    alert(e?.data?.message || e?.data?.statusMessage || 'Não foi possível remover.')
  }
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR')
}
</script>

<template>
  <div>
    <h1>Usuários</h1>
    <p class="muted">Cadastre quem poderá acessar o painel de submissões.</p>

    <div class="grid">
      <form class="card" @submit.prevent="createUser">
        <h2>Novo usuário</h2>
        <label>Nome<input v-model="form.name" required /></label>
        <label>E-mail<input v-model="form.email" type="email" required /></label>
        <label>Senha<input v-model="form.password" type="password" minlength="6" required /></label>
        <label>Papel
          <select v-model="form.role">
            <option value="viewer">Visualizador (só vê submissões)</option>
            <option value="admin">Administrador (gerencia usuários)</option>
          </select>
        </label>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
        <button type="submit" :disabled="loading">{{ loading ? 'Salvando…' : 'Cadastrar' }}</button>
      </form>

      <div class="card">
        <h2>Usuários cadastrados</h2>
        <table>
          <thead>
            <tr><th>Nome</th><th>E-mail</th><th>Papel</th><th>Desde</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td><span class="badge" :class="u.role">{{ u.role === 'admin' ? 'Admin' : 'Visualizador' }}</span></td>
              <td>{{ fmtDate(u.createdAt) }}</td>
              <td>
                <button
                  v-if="u.id !== (user as any)?.id"
                  class="link-danger"
                  @click="removeUser(u)"
                >Remover</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 { margin: 0 0 4px; font-size: 1.6rem; }
.muted { color: #8a93a0; margin: 0 0 24px; }
.grid { display: grid; grid-template-columns: 360px 1fr; gap: 24px; align-items: start; }
.card {
  background: #fff; border: 1px solid #e4e7ee; border-radius: 12px; padding: 24px;
  h2 { margin: 0 0 16px; font-size: 1.1rem; }
}
form { display: flex; flex-direction: column; gap: 14px; }
label { display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem; color: #54636e; }
input, select {
  padding: 9px 11px; border: 1px solid #d3d8e2; border-radius: 8px; font-family: inherit; font-size: 0.95rem;
  &:focus { outline: none; border-color: #5c6fec; }
}
button[type='submit'] {
  margin-top: 6px; padding: 10px; border: none; border-radius: 24px; background: #5c6fec; color: #fff;
  font-family: inherit; font-size: 0.95rem; cursor: pointer;
  &:disabled { opacity: 0.6; }
}
.error { color: #d33; margin: 0; font-size: 0.9rem; }
.success { color: #2e9b5b; margin: 0; font-size: 0.9rem; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 11px 8px; border-bottom: 1px solid #eef0f5; font-size: 0.9rem; }
th { color: #8a93a0; font-weight: 500; }
.badge {
  font-size: 0.78rem; padding: 3px 10px; border-radius: 12px;
  &.admin { background: #e8ebff; color: #5c6fec; }
  &.viewer { background: #eef0f5; color: #54636e; }
}
.link-danger { border: none; background: transparent; color: #d33; cursor: pointer; font-family: inherit; font-size: 0.88rem; }
@media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
</style>
