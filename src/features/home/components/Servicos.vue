<script setup lang="ts">
    import SectionTitle from '~/components/SectionTitle.vue';
    import Accordion from '~/components/Accordion.vue';
    import AccordionItem from '~/components/AccordionItem.vue';

    const accordionItems: {title: string, icon: string, body: string}[] = [
        {
            title: 'Identidades Visuais',
            icon: 'fa-light fa-fingerprint',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem justo, blandit eget purus at, placerat sollicitudin justo. Morbi vel viverra purus. Phasellus et varius justo. Curabitur bibendum risus metus, eu mattis ex lacinia et. Cras sodales mauris a ipsum porttitor tincidunt.',
        },
        {
            title: 'Design de Interfaces',
            icon: 'fa-light fa-browser',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem justo, blandit eget purus at, placerat sollicitudin justo. Morbi vel viverra purus. Phasellus et varius justo. Curabitur bibendum risus metus, eu mattis ex lacinia et. Cras sodales mauris a ipsum porttitor tincidunt.',
        },
        {
            title: 'Design Editorial',
            icon: 'fa-light fa-book',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem justo, blandit eget purus at, placerat sollicitudin justo. Morbi vel viverra purus. Phasellus et varius justo. Curabitur bibendum risus metus, eu mattis ex lacinia et. Cras sodales mauris a ipsum porttitor tincidunt.',
        },
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
                        <i :class="item.icon"></i>
                        {{ item.title }}
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