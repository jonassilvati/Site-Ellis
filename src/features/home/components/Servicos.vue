<script setup lang="ts">
    import SectionTitle from '~/components/SectionTitle.vue';
    import Accordion from '~/components/Accordion.vue';
    import AccordionItem from '~/components/AccordionItem.vue';

    const accordionItems: {title: string, icon: string, body: string}[] = [
        {
            title: 'Design Gráfico',
            icon: 'fa-light fa-fingerprint',
            body: 'Marcas existem para diferenciar o seu negócio no mercado — e é exatamente isso que fazemos. Identidades visuais que constroem marcas reconhecíveis, editoriais que valorizam cada página e apresentações que convencem na primeira slide. Cada projeto com conceito próprio, execução cuidada e resultado que aparece.',
        },
        {
            title: 'Design de Interface',
            icon: 'fa-light fa-browser',
            body: 'Projetamos interfaces com base em pesquisa, arquitetura de informação e testes de usabilidade. Do wireframe ao protótipo navegável, cada decisão — hierarquia visual, fluxo de interação, comportamento dos componentes — é pensada para reduzir fricção e entregar uma experiência que funciona.',
        },
        {
            title: 'Tecnologia',
            icon: 'fa-light fa-book',
            body: 'Desenvolvemos sistemas web sob medida, sites robustos com CMS headless ou tradicional, one pages e landing pages otimizadas para conversão. Trabalhamos com stack moderna, código limpo e arquitetura escalável — para que a solução cresça junto com o negócio sem virar um problema no futuro.',
        },
        {
            title: 'Consultoria 360',
            icon: 'fa-light fa-chart-line',
            body: 'Organizamos processos, ferramentas e estratégias de marketing para negócios que querem crescer com clareza e consistência. Uma visão integrada de gestão e marketing — do diagnóstico à execução.',
        }
    ]
</script>

<template>
    <section id="services" class="servicos-home">
        <div class="container">
            <div class="row justify-content-start">
                <div class="col-auto"><SectionTitle style="margin-bottom:30px;">Serviços</SectionTitle></div>
            </div>
            <Accordion>
                <AccordionItem v-for="item in accordionItems">
                    <template #title>
                        <h3 class="accordion-item__title">
                            <i :class="item.icon" aria-hidden="true"></i>
                            {{ item.title }}
                        </h3>
                    </template>
                    <template #default>
                        {{ item.body }}
                    </template>
                </AccordionItem>
            </Accordion>
        </div>
    </section>
</template>

<style lang="scss">
    .servicos-home{
        padding-top: 26px;
        padding-bottom: 70px;
    }
</style>