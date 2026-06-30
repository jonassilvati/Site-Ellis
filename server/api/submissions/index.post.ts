import type { SubmissionDoc } from '../../utils/db'

const TERMOS_KEYS = [
  'inscricaoNaoGarante',
  'iniciativaGratuita',
  'colaboracaoAtiva',
  'metodologiaEllis',
  'autorizacaoUso',
  'divulgacaoCanais',
] as const

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, any>>(event)

  // Gating: CNPJ ativo e nunca foi cliente da Éllis
  if (body?.cnpjAtivo !== true || body?.jaContratou !== false) {
    throw createError({
      statusCode: 422,
      statusMessage: 'O projeto é destinado a marcas com CNPJ ativo que ainda não foram clientes da Éllis Studio & Co.',
    })
  }

  // Campos de identificação obrigatórios
  const empresaNome = str(body.empresaNome)
  const responsavelNome = str(body.responsavelNome)
  const responsavelEmail = str(body.responsavelEmail)
  const responsavelTelefone = str(body.responsavelTelefone)
  const cnpj = str(body.cnpj)

  if (!empresaNome || !responsavelNome || !responsavelEmail || !responsavelTelefone || !cnpj) {
    throw createError({ statusCode: 422, statusMessage: 'Preencha todos os campos de identificação.' })
  }

  // Diagnóstico
  const problemaAtual = str(body.problemaAtual)
  const desejaComunicar = str(body.desejaComunicar)
  const porqueRebranding = str(body.porqueRebranding)
  const marcaAdmira = str(body.marcaAdmira)
  const aberturaProcesso = body.aberturaProcesso === 'com_diretrizes' ? 'com_diretrizes' : 'aberto'

  if (!problemaAtual || !desejaComunicar || !porqueRebranding || !marcaAdmira) {
    throw createError({ statusCode: 422, statusMessage: 'Responda todas as perguntas do diagnóstico.' })
  }

  // Comprometimento (precisa de resposta booleana explícita)
  if (
    typeof body.disponibilidade !== 'boolean' ||
    typeof body.compromisso !== 'boolean' ||
    typeof body.autorizacaoDivulgacao !== 'boolean'
  ) {
    throw createError({ statusCode: 422, statusMessage: 'Responda as perguntas de comprometimento.' })
  }

  // Termos: todos os 6 obrigatórios
  const termos: Record<string, boolean> = {}
  for (const key of TERMOS_KEYS) {
    if (body?.termos?.[key] !== true) {
      throw createError({ statusCode: 422, statusMessage: 'É necessário aceitar todos os termos de participação.' })
    }
    termos[key] = true
  }

  // LGPD: ambos obrigatórios
  if (body?.lgpd?.tratamentoDados !== true || body?.lgpd?.infoVerdadeiras !== true) {
    throw createError({ statusCode: 422, statusMessage: 'É necessário aceitar o consentimento LGPD.' })
  }

  const doc: SubmissionDoc = {
    empresaNome,
    responsavelNome,
    responsavelEmail,
    responsavelTelefone,
    cnpj,
    cnpjAtivo: true,
    jaContratou: false,
    mudancas: Array.isArray(body.mudancas) ? body.mudancas.map(str).filter(Boolean) : [],
    mudancasOutro: str(body.mudancasOutro),
    problemaAtual,
    desejaComunicar,
    porqueRebranding,
    marcaAdmira,
    aberturaProcesso,
    diretrizes: str(body.diretrizes),
    disponibilidade: body.disponibilidade,
    compromisso: body.compromisso,
    autorizacaoDivulgacao: body.autorizacaoDivulgacao,
    termos,
    lgpd: { tratamentoDados: true, infoVerdadeiras: true },
    createdAt: new Date(),
  }

  const collection = await submissionsCollection()
  const result = await collection.insertOne(doc)

  return { ok: true, id: result.insertedId.toString() }
})
