import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  const admin = await requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id || !ObjectId.isValid(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  if (id === admin.id) {
    throw createError({ statusCode: 400, statusMessage: 'Você não pode remover a si mesmo' })
  }

  const users = await usersCollection()
  const target = await users.findOne({ _id: new ObjectId(id) })
  if (!target) {
    throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })
  }

  // Impede remover o último admin
  if (target.role === 'admin') {
    const adminCount = await users.countDocuments({ role: 'admin' })
    if (adminCount <= 1) {
      throw createError({ statusCode: 400, statusMessage: 'Não é possível remover o último administrador' })
    }
  }

  await users.deleteOne({ _id: new ObjectId(id) })
  return { ok: true }
})
