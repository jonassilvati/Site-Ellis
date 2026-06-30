import { MongoClient, type Db, type Collection } from 'mongodb'

export interface UserDoc {
  _id?: any
  name: string
  email: string
  passwordHash: string
  role: 'admin' | 'viewer'
  createdAt: Date
}

export interface SubmissionDoc {
  _id?: any
  // 01–02 Identificação
  empresaNome: string
  responsavelNome: string
  responsavelEmail: string
  responsavelTelefone: string
  cnpj: string
  cnpjAtivo: boolean
  jaContratou: boolean
  // 03 Diagnóstico
  mudancas: string[]
  mudancasOutro: string
  problemaAtual: string
  desejaComunicar: string
  porqueRebranding: string
  marcaAdmira: string
  aberturaProcesso: 'aberto' | 'com_diretrizes'
  diretrizes: string
  // 04 Comprometimento
  disponibilidade: boolean
  compromisso: boolean
  autorizacaoDivulgacao: boolean
  // 05 Termos / 06 LGPD
  termos: Record<string, boolean>
  lgpd: { tratamentoDados: boolean; infoVerdadeiras: boolean }
  createdAt: Date
}

let clientPromise: Promise<MongoClient> | null = null

async function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const { mongodbUri } = useRuntimeConfig()
    if (!mongodbUri) {
      throw createError({ statusCode: 500, statusMessage: 'MONGODB_URI não configurada' })
    }
    const client = new MongoClient(mongodbUri)
    clientPromise = client.connect().then(async (c) => {
      // Garante índice único de e-mail
      await c.db(useRuntimeConfig().mongodbDb).collection('users').createIndex({ email: 1 }, { unique: true })
      return c
    })
  }
  return clientPromise
}

export async function getDb(): Promise<Db> {
  const client = await getClient()
  return client.db(useRuntimeConfig().mongodbDb)
}

export async function usersCollection(): Promise<Collection<UserDoc>> {
  return (await getDb()).collection<UserDoc>('users')
}

export async function submissionsCollection(): Promise<Collection<SubmissionDoc>> {
  return (await getDb()).collection<SubmissionDoc>('submissions')
}
