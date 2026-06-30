import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = getRouterParam(event, 'id')
  if (!id || !ObjectId.isValid(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  const collection = await submissionsCollection()
  const doc = await collection.findOne({ _id: new ObjectId(id) })
  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Submissão não encontrada' })
  }

  return { ...doc, _id: doc._id.toString() }
})
