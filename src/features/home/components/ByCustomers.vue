<script setup lang="ts">
    import type { SlideItem } from "~/types/customerTestimonials.ts";
    const slide1Ref = ref(null);
    const slide2Ref = ref(null);

    

    const slides1: SlideItem[] = [
        {
            logo: '/images/testimonials/sense-logo.svg',
            text: '"Parabéns mais uma vez! Eu estou muito emocionada lendo o manifesto. Vocês conseguiram descrever exatamente o que sinto, o que busco, o que estou trabalhando nesses 11 anos de formada para construir. E que agora, juntando nossas forças e corações com meus sócios, estamos tornando realidade com o auxílio de vocês"',
            backgroundColor: '#506346',
            author: 'Jossane Candeira',
            authorLegend: 'Sócia'
        },
        {
            img: 'images/testimonials/sense-page-1.jpg',
            arrowColor: '#2E3D46'
        },
        {
            img: 'images/testimonials/sense-page-2.jpg',
            arrowColor: '#2E3D46'
        }
    ];
    
    const slides2: SlideItem[] = [
        {
            logo: '/images/testimonials/lirion-logo.svg',
            text: '"Parabéns mais uma vez! Eu estou muito emocionada lendo o manifesto. Vocês conseguiram descrever exatamente o que sinto, o que busco, o que estou trabalhando nesses 11 anos de formada para construir. E que agora, juntando nossas forças e corações com meus sócios, estamos tornando realidade com o auxílio de vocês"',
            backgroundColor: '#0694D3',
            author: 'Maria Santos',
            authorLegend: 'CEO'
        },
        {
            img: 'images/testimonials/lirion-page-1.jpg',
        },
        {
            img: 'images/testimonials/lirion-page-2.jpg',
        }
    ];
</script>

<template>
    <section class="by-customers">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-3">
                    <h2>A Éllis pelas palavras dos clientes</h2>
                </div>
                <div class="col-12 col-lg-9">

                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .by-customers{
        h2{
            color:#2E3D46;
            font-family: Sora;
            font-size: 3rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }
</style>