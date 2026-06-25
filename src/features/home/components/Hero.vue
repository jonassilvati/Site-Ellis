<script setup lang="ts">
    useHead({
        link: [
            {
                rel: 'preload',
                as: 'image',
                href: '/images/bg-home-hero.avif',
                type: 'image/avif',
                fetchpriority: 'high',
            },
        ],
    });
</script>

<template>
    <section id="begin-section" class="home-hero d-flex">
        <div class="container">
            <div class="d-flex flex-column justify-content-center h-100">
                <div class="row">
                    <div class="col-12 col-lg-7">
                        <h1>Marcas únicas e emocionantes do início ao futuro</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .home-hero{
        background-image: url(/images/bg-home-hero.avif);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom right;
        padding-top: 109px;
        transition: background .3s linear;
        min-height: 70vh;
        
        @media (min-width: 991px){
            background-position: top left;
            height: 100vh;
        }

        h1{
            color: #14222A;
            font-family: Sora;
            font-size: 3rem;
            font-style: normal;
            font-weight: 300;
            line-height: normal;

            @media (min-width: 1440px){
                font-size: 3.75rem;
            }

            @media (min-width: 1920px){
                font-size: 5.5rem;
            }
        }
    }
</style>