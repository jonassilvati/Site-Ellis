import type { H3Event } from 'h3'

export interface SessionUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'viewer'
}

export async function requireAdmin(event: H3Event): Promise<SessionUser> {
  const { user } = await requireUserSession(event)
  if (!user || (user as SessionUser).role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Acesso restrito a administradores' })
  }
  return user as SessionUser
}
