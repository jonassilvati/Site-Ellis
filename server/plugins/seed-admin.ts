export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  if (!config.mongodbUri || !config.adminEmail || !config.adminPassword) {
    console.warn('[seed-admin] MONGODB_URI/ADMIN_EMAIL/ADMIN_PASSWORD ausentes — admin não semeado')
    return
  }

  try {
    const users = await usersCollection()
    const existingAdmin = await users.findOne({ role: 'admin' })
    if (existingAdmin) return

    const passwordHash = await hashPassword(config.adminPassword)
    await users.insertOne({
      name: 'Administrador',
      email: config.adminEmail.toLowerCase().trim(),
      passwordHash,
      role: 'admin',
      createdAt: new Date(),
    })
    console.log(`[seed-admin] admin criado: ${config.adminEmail}`)
  } catch (err) {
    console.error('[seed-admin] falha ao semear admin:', err)
  }
})
