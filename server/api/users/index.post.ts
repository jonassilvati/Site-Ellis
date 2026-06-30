export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody<{ name?: string; email?: string; password?: string; role?: string }>(event)
  const name = body?.name?.trim()
  const email = body?.email?.toLowerCase().trim()
  const password = body?.password
  const role = body?.role === 'admin' ? 'admin' : 'viewer'

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Informe nome, e-mail e senha' })
  }
  if (password.length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'A senha deve ter ao menos 6 caracteres' })
  }

  const users = await usersCollection()
  const passwordHash = await hashPassword(password)

  try {
    const result = await users.insertOne({
      name,
      email,
      passwordHash,
      role,
      createdAt: new Date(),
    })
    return { ok: true, id: result.insertedId.toString() }
  } catch (err: any) {
    if (err?.code === 11000) {
      throw createError({ statusCode: 409, statusMessage: 'Já existe um usuário com este e-mail' })
    }
    throw err
  }
})
