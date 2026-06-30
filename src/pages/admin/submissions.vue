<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

interface Submission {
  _id: string
  empresaNome: string
  responsavelNome: string
  responsavelEmail: string
  responsavelTelefone: string
  cnpj: string
  cnpjAtivo: boolean
  jaContratou: boolean
  mudancas: string[]
  mudancasOutro: string
  problemaAtual: string
  desejaComunicar: string
  porqueRebranding: string
  marcaAdmira: string
  aberturaProcesso: 'aberto' | 'com_diretrizes'
  diretrizes: string
  disponibilidade: boolean
  compromisso: boolean
  autorizacaoDivulgacao: boolean
  termos: Record<string, boolean>
  lgpd: { tratamentoDados: boolean; infoVerdadeiras: boolean }
  createdAt: string
}

const { data: submissions, pending, error, refresh } = await useFetch<Submission[]>('/api/submissions')

const selected = ref<Submission | null>(null)

function fmtDate(d: string) {
  return new Date(d).toLocaleString('pt-BR')
}

const aberturaLabel: Record<string, string> = {
  aberto: 'Aberto(a) ao processo e às recomendações da equipe',
  com_diretrizes: 'Aberto(a), mas com diretrizes indispensáveis',
}

const termosLabels: Record<string, string> = {
  inscricaoNaoGarante: 'A inscrição não garante a seleção da marca.',
  iniciativaGratuita: 'O projeto é uma iniciativa gratuita para as marcas selecionadas.',
  colaboracaoAtiva: 'A participação exige colaboração ativa em todas as etapas.',
  metodologiaEllis: 'Metodologia e decisões criativas conduzidas pela Éllis Studio & Co.',
  autorizacaoUso: 'Autoriza o uso do nome, identidade, imagens e materiais do projeto.',
  divulgacaoCanais: 'Ciente de que os materiais podem ser divulgados nos canais da empresa.',
}
</script>

<template>
  <div>
    <div class="page-head">
      <h1>Submissões</h1>
      <button class="ghost" @click="refresh()">Atualizar</button>
    </div>

    <p v-if="pending">Carregando…</p>
    <p v-else-if="error" class="error">Erro ao carregar submissões.</p>
    <p v-else-if="!submissions?.length" class="empty">Nenhuma submissão ainda.</p>

    <div v-else class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Empresa / Marca</th>
            <th>Responsável</th>
            <th>Contato</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in submissions" :key="s._id">
            <td>{{ s.empresaNome }}</td>
            <td>{{ s.responsavelNome }}</td>
            <td>
              <div>{{ s.responsavelEmail }}</div>
              <div class="muted">{{ s.responsavelTelefone }}</div>
            </td>
            <td>{{ fmtDate(s.createdAt) }}</td>
            <td><button class="ghost sm" @click="selected = s">Ver</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detalhe -->
    <div v-if="selected" class="modal-backdrop" @click.self="selected = null">
      <div class="modal">
        <button class="modal-close" @click="selected = null" aria-label="Fechar">×</button>
        <h2>{{ selected.empresaNome }}</h2>
        <p class="muted">Enviado em {{ fmtDate(selected.createdAt) }}</p>

        <section>
          <h3>Identificação</h3>
          <dl>
            <div><dt>Responsável</dt><dd>{{ selected.responsavelNome }}</dd></div>
            <div><dt>E-mail</dt><dd>{{ selected.responsavelEmail }}</dd></div>
            <div><dt>Telefone</dt><dd>{{ selected.responsavelTelefone }}</dd></div>
            <div><dt>CNPJ</dt><dd>{{ selected.cnpj }}</dd></div>
            <div><dt>CNPJ ativo</dt><dd>{{ selected.cnpjAtivo ? 'Sim' : 'Não' }}</dd></div>
            <div><dt>Já contratou a Éllis</dt><dd>{{ selected.jaContratou ? 'Sim' : 'Não' }}</dd></div>
          </dl>
        </section>

        <section>
          <h3>Diagnóstico e seleção</h3>
          <dl>
            <div><dt>O que mudou</dt><dd>
              <ul v-if="selected.mudancas.length">
                <li v-for="m in selected.mudancas" :key="m">{{ m }}</li>
              </ul>
              <span v-else>—</span>
              <div v-if="selected.mudancasOutro"><em>Outro:</em> {{ selected.mudancasOutro }}</div>
            </dd></div>
            <div><dt>Problema atual da marca</dt><dd>{{ selected.problemaAtual }}</dd></div>
            <div><dt>O que deseja comunicar</dt><dd>{{ selected.desejaComunicar }}</dd></div>
            <div><dt>Por que rebranding agora</dt><dd>{{ selected.porqueRebranding }}</dd></div>
            <div><dt>Marca que admira</dt><dd>{{ selected.marcaAdmira }}</dd></div>
            <div><dt>Abertura ao processo</dt><dd>{{ aberturaLabel[selected.aberturaProcesso] }}</dd></div>
            <div v-if="selected.diretrizes"><dt>Diretrizes indispensáveis</dt><dd>{{ selected.diretrizes }}</dd></div>
          </dl>
        </section>

        <section>
          <h3>Comprometimento</h3>
          <dl>
            <div><dt>Disponibilidade p/ reuniões</dt><dd>{{ selected.disponibilidade ? 'Sim' : 'Não' }}</dd></div>
            <div><dt>Compromisso com prazos</dt><dd>{{ selected.compromisso ? 'Sim' : 'Não' }}</dd></div>
            <div><dt>Autoriza divulgação pública</dt><dd>{{ selected.autorizacaoDivulgacao ? 'Sim' : 'Não' }}</dd></div>
          </dl>
        </section>

        <section>
          <h3>Termos &amp; LGPD</h3>
          <ul class="checks">
            <li v-for="(label, key) in termosLabels" :key="key">
              <span :class="selected.termos[key] ? 'yes' : 'no'">{{ selected.termos[key] ? '✓' : '✕' }}</span> {{ label }}
            </li>
            <li><span :class="selected.lgpd.tratamentoDados ? 'yes' : 'no'">{{ selected.lgpd.tratamentoDados ? '✓' : '✕' }}</span> Concorda com o tratamento dos dados (LGPD).</li>
            <li><span :class="selected.lgpd.infoVerdadeiras ? 'yes' : 'no'">{{ selected.lgpd.infoVerdadeiras ? '✓' : '✕' }}</span> Declara que as informações são verdadeiras.</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-head {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
  h1 { margin: 0; font-size: 1.6rem; }
}
.error { color: #d33; }
.empty { color: #8a93a0; }
.table-wrap { background: #fff; border: 1px solid #e4e7ee; border-radius: 12px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 14px 16px; border-bottom: 1px solid #eef0f5; font-size: 0.92rem; }
th { background: #fafbfc; color: #8a93a0; font-weight: 500; }
tbody tr:last-child td { border-bottom: none; }
.muted { color: #8a93a0; font-size: 0.85rem; }
.ghost {
  border: 1px solid #d3d8e2; background: transparent; border-radius: 20px; padding: 7px 16px;
  cursor: pointer; color: #54636e; font-family: inherit;
  &:hover { background: #5c6fec; color: #fff; border-color: #5c6fec; }
  &.sm { padding: 5px 14px; font-size: 0.85rem; }
}
.modal-backdrop {
  position: fixed; inset: 0; background: rgba(20, 24, 30, 0.5); display: flex;
  align-items: flex-start; justify-content: center; padding: 40px 16px; z-index: 50; overflow-y: auto;
}
.modal {
  position: relative; width: 100%; max-width: 680px; background: #fff; border-radius: 16px; padding: 32px;
  h2 { margin: 0 0 4px; }
  section { margin-top: 24px; }
  h3 { font-size: 1rem; color: #5c6fec; margin: 0 0 12px; border-bottom: 1px solid #eef0f5; padding-bottom: 6px; }
  dl { margin: 0; display: flex; flex-direction: column; gap: 12px; }
  dl > div { display: grid; grid-template-columns: 200px 1fr; gap: 12px; }
  dt { color: #8a93a0; font-size: 0.85rem; }
  dd { margin: 0; white-space: pre-wrap; }
  ul { margin: 4px 0 0; padding-left: 18px; }
}
.checks { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;
  li { font-size: 0.9rem; }
  .yes { color: #2e9b5b; font-weight: 700; }
  .no { color: #d33; font-weight: 700; }
}
.modal-close {
  position: absolute; top: 14px; right: 18px; border: none; background: transparent;
  font-size: 1.6rem; line-height: 1; cursor: pointer; color: #8a93a0;
}
@media (max-width: 560px) {
  .modal dl > div { grid-template-columns: 1fr; gap: 2px; }
}
</style>
