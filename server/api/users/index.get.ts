export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const users = await usersCollection()
  const docs = await users.find({}, { sort: { createdAt: 1 } }).toArray()

  return docs.map((u) => ({
    id: u._id.toString(),
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
  }))
})
