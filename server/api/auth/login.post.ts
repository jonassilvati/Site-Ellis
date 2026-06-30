export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)
  const email = body?.email?.toLowerCase().trim()
  const password = body?.password

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Informe e-mail e senha' })
  }

  const users = await usersCollection()
  const user = await users.findOne({ email })

  if (!user || !(await verifyPassword(user.passwordHash, password))) {
    throw createError({ statusCode: 401, statusMessage: 'E-mail ou senha inválidos' })
  }

  await setUserSession(event, {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  })

  return { ok: true }
})
