<script setup></script>

<template>
    <section class="ellis-marquee">
        <div class="ellis-marquee__viewport" aria-label="Mensagem em rolagem">
            <div class="ellis-marquee__track">
                <div class="ellis-marquee__content" aria-hidden="true">
                    <span class="ellis-marquee__item">
                        <strong>Design</strong> é o ponto de encontro entre função, forma e significado.
                    </span>
                    <span class="ellis-marquee__item">
                        <strong>Design</strong> é o ponto de encontro entre função, forma e significado.
                    </span>
                    <span class="ellis-marquee__item">
                        <strong>Design</strong> é o ponto de encontro entre função, forma e significado.
                    </span>
                    <span class="ellis-marquee__item">
                        <strong>Design</strong> é o ponto de encontro entre função, forma e significado.
                    </span>
                </div>
                <div class="ellis-marquee__content" aria-hidden="true">
                    <span class="ellis-marquee__item">
                        <strong>Design</strong> é o ponto de encontro entre função, forma e significado.
                    </span>
                    <span class="ellis-marquee__item">
                        <strong>Design</strong> é o ponto de encontro entre função, forma e significado.
                    </span>
                    <span class="ellis-marquee__item">
                        <strong>Design</strong> é o ponto de encontro entre função, forma e significado.
                    </span>
                    <span class="ellis-marquee__item">
                        <strong>Design</strong> é o ponto de encontro entre função, forma e significado.
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .ellis-marquee{
        padding-top: 42px;
        padding-bottom: 42px;
        background-color: #EDF1F8;

        &__viewport{
            overflow: hidden;
            width: 100%;
        }

        &__track{
            display: flex;
            width: max-content;
            animation: ellis-marquee-scroll 90s linear infinite;
            will-change: transform;
        }

        &__content{
            display: inline-flex;
            align-items: baseline;
            gap: 2.5rem;
            padding-right: 2.5rem;
            white-space: nowrap;
        }

        &__item{
            color: #54636E;
            font-family: Sora;
            font-size: 4.875rem;
            font-style: normal;
            font-weight: 300;
            line-height: 6.5rem;
        }

        strong{
            color: #0F50CF;
        }
    }

    @keyframes ellis-marquee-scroll{
        from{ transform: translateX(0); }
        to{ transform: translateX(-50%); }
    }

    @media (prefers-reduced-motion: reduce){
        .ellis-marquee__track{
            animation: none;
        }
    }
</style>