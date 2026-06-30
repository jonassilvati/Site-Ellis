export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const collection = await submissionsCollection()
  const docs = await collection.find({}, { sort: { createdAt: -1 } }).toArray()

  return docs.map((d) => ({ ...d, _id: d._id.toString() }))
})
