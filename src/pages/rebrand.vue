<script setup lang="ts">
useHead({ title: 'Projeto de Rebranding — Éllis Studio & Co.' })

const MUDANCAS_OPCOES = [
  'Meu posicionamento mudou',
  'Meu público mudou',
  'Meu nicho de atuação mudou',
  'Meus produtos ou serviços evoluíram',
  'Meu negócio cresceu significativamente',
  'Meus preços e nível de mercado aumentaram',
  'Minha identidade visual foi criada sem estratégia',
  'Minha marca não representa mais quem somos hoje',
  'Outro',
]

const TERMOS_ITENS = [
  { key: 'inscricaoNaoGarante', label: 'A inscrição neste formulário não garante a seleção da marca.' },
  { key: 'iniciativaGratuita', label: 'O Projeto de Rebranding Éllis Studio é uma iniciativa gratuita para as marcas selecionadas.' },
  { key: 'colaboracaoAtiva', label: 'A participação exige colaboração ativa durante todas as etapas do processo.' },
  { key: 'metodologiaEllis', label: 'A metodologia, direcionamento estratégico e decisões criativas serão conduzidos pela equipe da Éllis Studio & Co.' },
  { key: 'autorizacaoUso', label: 'Autorizo a utilização do nome da marca, identidade visual anterior e posterior ao projeto, imagens, depoimentos, registros do processo e demais materiais produzidos durante a execução do projeto para fins institucionais, promocionais, comerciais e educacionais da Éllis Studio & Co.' },
  { key: 'divulgacaoCanais', label: 'Estou ciente de que esses materiais poderão ser divulgados em redes sociais, website, apresentações comerciais, eventos, materiais impressos, portfólio e demais canais de comunicação da empresa.' },
]

const step = ref(1)
const submitting = ref(false)
const submitError = ref('')
const submitted = ref(false)

const form = reactive({
  // 01-02
  empresaNome: '',
  responsavelNome: '',
  responsavelEmail: '',
  responsavelTelefone: '',
  cnpj: '',
  cnpjAtivo: null as boolean | null,
  jaContratou: null as boolean | null,
  // 03
  mudancas: [] as string[],
  mudancasOutro: '',
  problemaAtual: '',
  desejaComunicar: '',
  porqueRebranding: '',
  marcaAdmira: '',
  aberturaProcesso: '' as '' | 'aberto' | 'com_diretrizes',
  diretrizes: '',
  // 04
  disponibilidade: null as boolean | null,
  compromisso: null as boolean | null,
  autorizacaoDivulgacao: null as boolean | null,
  // 05
  termos: Object.fromEntries(TERMOS_ITENS.map((t) => [t.key, false])) as Record<string, boolean>,
  // 06
  lgpd: { tratamentoDados: false, infoVerdadeiras: false },
})

const naoElegivel = computed(() => form.cnpjAtivo === false || form.jaContratou === false)

const step1Valido = computed(() =>
  form.empresaNome.trim() &&
  form.responsavelNome.trim() &&
  form.responsavelEmail.trim() &&
  form.responsavelTelefone.trim() &&
  form.cnpj.trim() &&
  form.cnpjAtivo === true &&
  form.jaContratou === true,
)

const step2Valido = computed(() =>
  form.problemaAtual.trim() &&
  form.desejaComunicar.trim() &&
  form.porqueRebranding.trim() &&
  form.marcaAdmira.trim() &&
  form.aberturaProcesso !== '',
)

const step3Valido = computed(() =>
  typeof form.disponibilidade === 'boolean' &&
  typeof form.compromisso === 'boolean' &&
  typeof form.autorizacaoDivulgacao === 'boolean',
)

const todosTermos = computed(() => TERMOS_ITENS.every((t) => form.termos[t.key]))
const lgpdOk = computed(() => form.lgpd.tratamentoDados && form.lgpd.infoVerdadeiras)
const step4Valido = computed(() => todosTermos.value && lgpdOk.value)

function next() {
  if (step.value === 1 && !step1Valido.value) return
  if (step.value === 2 && !step2Valido.value) return
  if (step.value === 3 && !step3Valido.value) return
  step.value++
  scrollTop()
}
function prev() {
  step.value--
  scrollTop()
}
function scrollTop() {
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function submit() {
  if (!step4Valido.value) return
  submitting.value = true
  submitError.value = ''
  try {
    await $fetch('/api/submissions', { method: 'POST', body: { ...form } })
    submitted.value = true
    scrollTop()
  } catch (e: any) {
    submitError.value = e?.data?.message || e?.data?.statusMessage || 'Não foi possível enviar. Tente novamente.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="rebrand">
    <div class="container">
      <!-- SUCESSO -->
      <div v-if="submitted" class="card success-card">
        <h1>Inscrição enviada! 🎉</h1>
        <p>Obrigada por se inscrever no Projeto de Rebranding da Éllis Studio &amp; Co.</p>
        <p>Analisaremos as informações e entraremos em contato pelo e-mail e telefone informados.</p>
        <a href="/" class="primary-btn">Voltar ao início</a>
      </div>

      <template v-else>
        <header class="rebrand-head">
          <p class="eyebrow">Projeto de Rebranding · Éllis Studio &amp; Co.</p>
          <h1>Formulário de inscrição</h1>
          <p class="lead">Uma iniciativa exclusiva para marcas que já caminharam com a gente e estão prontas para o próximo capítulo.</p>
        </header>

        <!-- Progresso -->
        <ol class="steps" v-if="!naoElegivel || step > 1">
          <li :class="{ active: step === 1, done: step > 1 }">Identificação</li>
          <li :class="{ active: step === 2, done: step > 2 }">Diagnóstico</li>
          <li :class="{ active: step === 3, done: step > 3 }">Comprometimento</li>
          <li :class="{ active: step === 4 }">Termos</li>
        </ol>

        <!-- ETAPA 1 -->
        <div v-show="step === 1" class="card">
          <h2>01 — Identificação da empresa</h2>
          <div class="grid-2">
            <label>Nome da empresa / marca *
              <input v-model="form.empresaNome" type="text" />
            </label>
            <label>CNPJ *
              <input v-model="form.cnpj" type="text" placeholder="00.000.000/0000-00" />
            </label>
            <label>Nome do responsável *
              <input v-model="form.responsavelNome" type="text" />
            </label>
            <label>E-mail *
              <input v-model="form.responsavelEmail" type="email" />
            </label>
            <label>Telefone / WhatsApp *
              <input v-model="form.responsavelTelefone" type="tel" />
            </label>
          </div>

          <h2 class="mt">02 — Elegibilidade</h2>
          <fieldset class="yn">
            <legend>A empresa possui CNPJ ativo? *</legend>
            <label><input type="radio" :value="true" v-model="form.cnpjAtivo" /> Sim</label>
            <label><input type="radio" :value="false" v-model="form.cnpjAtivo" /> Não</label>
          </fieldset>
          <fieldset class="yn">
            <legend>A empresa já contratou a Éllis Studio antes? *</legend>
            <label><input type="radio" :value="true" v-model="form.jaContratou" /> Sim</label>
            <label><input type="radio" :value="false" v-model="form.jaContratou" /> Não</label>
          </fieldset>

          <p v-if="naoElegivel" class="block-msg">
            Esta promoção de rebranding é exclusiva para <strong>clientes atuais da Éllis Studio com CNPJ ativo</strong>.
            Se acredita que houve um engano ou quer conhecer outros serviços, fale com a gente pelo
            <a href="/">site</a>.
          </p>

          <div class="actions">
            <span></span>
            <button class="primary-btn" :disabled="!step1Valido" @click="next">Avançar</button>
          </div>
        </div>

        <!-- ETAPA 2 — 03 Diagnóstico -->
        <div v-show="step === 2" class="card">
          <h2>03 — Diagnóstico e seleção</h2>

          <fieldset class="checks">
            <legend>O que mudou desde a criação da sua marca? <small>(Marque todas que se aplicam.)</small></legend>
            <label v-for="op in MUDANCAS_OPCOES" :key="op">
              <input type="checkbox" :value="op" v-model="form.mudancas" /> {{ op }}
            </label>
            <input
              v-if="form.mudancas.includes('Outro')"
              v-model="form.mudancasOutro"
              class="outro-input"
              type="text"
              placeholder="Descreva o que mudou"
            />
          </fieldset>

          <label class="ta">Em uma frase, qual é o principal problema que sua marca comunica atualmente? *
            <textarea v-model="form.problemaAtual" rows="3"></textarea>
          </label>
          <label class="ta">O que você gostaria que sua marca passasse a comunicar daqui para frente? *
            <textarea v-model="form.desejaComunicar" rows="3"></textarea>
          </label>
          <label class="ta">Por que sua empresa acredita que precisa de um processo de rebranding neste momento? *
            <textarea v-model="form.porqueRebranding" rows="3"></textarea>
          </label>
          <label class="ta">Cite uma marca cuja identidade visual você admira e explique brevemente o motivo. *
            <small>(Não precisa ser do mesmo segmento.)</small>
            <textarea v-model="form.marcaAdmira" rows="3"></textarea>
          </label>

          <fieldset class="yn col">
            <legend>Você está aberto(a) a um processo estratégico e criativo conduzido pela Éllis Studio &amp; Co.? *</legend>
            <label><input type="radio" value="aberto" v-model="form.aberturaProcesso" /> Sim, estou aberto(a) ao processo e às recomendações da equipe</label>
            <label><input type="radio" value="com_diretrizes" v-model="form.aberturaProcesso" /> Sim, mas possuo algumas diretrizes que considero indispensáveis</label>
          </fieldset>

          <label v-if="form.aberturaProcesso === 'com_diretrizes'" class="ta">Quais são essas diretrizes?
            <textarea v-model="form.diretrizes" rows="3"></textarea>
          </label>

          <div class="actions">
            <button class="ghost-btn" @click="prev">Voltar</button>
            <button class="primary-btn" :disabled="!step2Valido" @click="next">Avançar</button>
          </div>
        </div>

        <!-- ETAPA 3 — 04 Comprometimento -->
        <div v-show="step === 3" class="card">
          <h2>04 — Comprometimento e autorizações</h2>

          <fieldset class="yn col">
            <legend>Caso sua marca seja selecionada, você possui disponibilidade para participar de reuniões, entrevistas e validações durante o projeto? *</legend>
            <label><input type="radio" :value="true" v-model="form.disponibilidade" /> Sim</label>
            <label><input type="radio" :value="false" v-model="form.disponibilidade" /> Não</label>
          </fieldset>

          <fieldset class="yn col">
            <legend>Compromete-se a fornecer informações, materiais e feedbacks dentro dos prazos acordados? *</legend>
            <label><input type="radio" :value="true" v-model="form.compromisso" /> Sim</label>
            <label><input type="radio" :value="false" v-model="form.compromisso" /> Não</label>
          </fieldset>

          <fieldset class="yn col">
            <legend>Você autoriza a divulgação pública do processo de transformação da sua marca (antes e depois, bastidores, apresentações, depoimentos e resultados)? *</legend>
            <label><input type="radio" :value="true" v-model="form.autorizacaoDivulgacao" /> Sim</label>
            <label><input type="radio" :value="false" v-model="form.autorizacaoDivulgacao" /> Não</label>
          </fieldset>

          <div class="actions">
            <button class="ghost-btn" @click="prev">Voltar</button>
            <button class="primary-btn" :disabled="!step3Valido" @click="next">Avançar</button>
          </div>
        </div>

        <!-- ETAPA 4 — 05 Termos + 06 LGPD -->
        <div v-show="step === 4" class="card">
          <h2>05 — Termos de participação</h2>
          <p class="declaro">Declaro estar ciente de que:</p>
          <fieldset class="checks">
            <label v-for="t in TERMOS_ITENS" :key="t.key">
              <input type="checkbox" v-model="form.termos[t.key]" /> {{ t.label }}
            </label>
          </fieldset>

          <h2 class="mt">06 — Consentimento LGPD</h2>
          <p class="declaro">
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), autorizo a Éllis Studio &amp; Co.
            a coletar, armazenar e tratar os dados fornecidos neste formulário exclusivamente para fins relacionados ao
            processo de seleção, comunicação e execução do Projeto de Rebranding.
          </p>
          <fieldset class="checks">
            <label><input type="checkbox" v-model="form.lgpd.tratamentoDados" /> Li e concordo com o tratamento dos meus dados pessoais para as finalidades descritas.</label>
            <label><input type="checkbox" v-model="form.lgpd.infoVerdadeiras" /> Declaro que as informações fornecidas são verdadeiras.</label>
          </fieldset>

          <p v-if="submitError" class="block-msg">{{ submitError }}</p>

          <div class="actions">
            <button class="ghost-btn" @click="prev">Voltar</button>
            <button class="primary-btn" :disabled="!step4Valido || submitting" @click="submit">
              {{ submitting ? 'Enviando…' : 'Enviar inscrição' }}
            </button>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.rebrand {
  padding: 120px 0 80px;
  background: #f7f8fb;
  min-height: 100vh;
}
.rebrand-head {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 32px;
  .eyebrow { color: #5c6fec; font-size: 0.85rem; letter-spacing: 0.04em; text-transform: uppercase; margin: 0 0 8px; }
  h1 { margin: 0 0 12px; font-size: 2rem; color: #2b333b; }
  .lead { color: #54636e; margin: 0; }
}
.steps {
  display: flex; gap: 8px; max-width: 640px; margin: 0 auto 24px; padding: 0; list-style: none; counter-reset: s;
  li {
    flex: 1; text-align: center; font-size: 0.78rem; color: #a6adb8; padding-top: 26px; position: relative;
    &::before {
      counter-increment: s; content: counter(s); position: absolute; top: 0; left: 50%; transform: translateX(-50%);
      width: 22px; height: 22px; border-radius: 50%; background: #e4e7ee; color: #fff;
      display: flex; align-items: center; justify-content: center; font-size: 0.7rem;
    }
    &.active { color: #5c6fec; font-weight: 600; &::before { background: #5c6fec; } }
    &.done::before { background: #2e9b5b; }
  }
}
.card {
  max-width: 640px; margin: 0 auto; background: #fff; border: 1px solid #e9ecf2; border-radius: 16px; padding: 32px;
  h2 { font-size: 1.15rem; color: #2b333b; margin: 0 0 18px; &.mt { margin-top: 32px; } }
}
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
label { display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem; color: #54636e; }
input[type='text'], input[type='email'], input[type='tel'], textarea {
  padding: 10px 12px; border: 1px solid #d3d8e2; border-radius: 8px; font-family: inherit; font-size: 0.97rem; color: #2b333b;
  &:focus { outline: none; border-color: #5c6fec; }
}
textarea { resize: vertical; }
small { color: #a6adb8; font-weight: 400; }
.ta { margin-top: 20px; }
fieldset { border: none; padding: 0; margin: 20px 0 0; min-width: 0; }
legend { font-size: 0.9rem; color: #54636e; padding: 0; margin-bottom: 10px; }
.yn { display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
  legend { width: 100%; }
  &.col { flex-direction: column; align-items: flex-start; gap: 10px; }
  label { flex-direction: row; align-items: center; gap: 8px; cursor: pointer; }
}
.checks {
  display: flex; flex-direction: column; gap: 12px;
  label { flex-direction: row; align-items: flex-start; gap: 10px; cursor: pointer; line-height: 1.4; }
  input { margin-top: 3px; }
}
.outro-input { margin-top: 4px; }
.declaro { color: #54636e; font-size: 0.9rem; margin: 0 0 14px; }
.block-msg {
  margin-top: 20px; background: #fdecec; border: 1px solid #f5c2c2; color: #a4343a;
  padding: 14px 16px; border-radius: 10px; font-size: 0.9rem;
  a { color: #a4343a; font-weight: 600; }
}
.actions { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; }
.primary-btn {
  border: none; background: #5c6fec; color: #fff; border-radius: 26px; padding: 11px 28px;
  font-family: inherit; font-size: 1rem; cursor: pointer; text-decoration: none; display: inline-block;
  &:disabled { opacity: 0.45; cursor: default; }
  &:not(:disabled):hover { background: #4a5cd6; }
}
.ghost-btn {
  border: 1px solid #d3d8e2; background: transparent; color: #54636e; border-radius: 26px; padding: 11px 24px;
  font-family: inherit; font-size: 1rem; cursor: pointer;
  &:hover { border-color: #5c6fec; color: #5c6fec; }
}
.success-card { text-align: center;
  h1 { color: #2b333b; }
  p { color: #54636e; }
  .primary-btn { margin-top: 16px; }
}
@media (max-width: 560px) {
  .grid-2 { grid-template-columns: 1fr; }
  .rebrand { padding: 90px 0 60px; }
  .card { padding: 24px 20px; }
}
</style>
