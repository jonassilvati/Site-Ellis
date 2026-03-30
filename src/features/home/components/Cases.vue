<script setup lang="ts">
    import SectionTitle from '~/components/SectionTitle.vue';
    import CaseCard from './CaseCard.vue';
    import Button from '~/components/Button.vue';

    function openBehance(){
        window.open('https://www.behance.net/ellisstudiobr', '_BLANK')
    }
</script>

<template>
    <section id="cases" class="cases-home">
        <div class="container">
            <div class="row" style="margin-bottom: 70px;">
                <div class="col-12 col-md-2">
                    <SectionTitle>Cases</SectionTitle>
                </div>
                <div class="col-12 col-md-10">
                    <h2>Conheça as histórias por trás dos projetos que ajudamos a moldar.</h2>
                </div>
            </div>
            <div class="cases-grid">
                <div class="cases-grid__col">
                    <CaseCard img="images/sense-thumb.png" title="Sense" variation="tall"/>
                    <CaseCard img="images/boomplay-thumb.png" title="Boomplay" variation="short"/>
                </div>
                <div class="cases-grid__col">
                    <CaseCard img="images/thielen-thumb.png" title="Thielen Taveira" variation="short"/>
                    <CaseCard img="images/arcoiris-thumb.png" title="Escola Arco-íris" variation="tall"/>
                </div>
                <div class="cases-grid__col">
                    <CaseCard img="images/baru-thumb.png" title="Baru" variation="tall"/>
                    <CaseCard img="images/dionilo-costa-thumb.jpg" title="Dionilo Costa" variation="short"/>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <Button @click="openBehance()">Ver todos os cases</Button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .cases-home{
        padding-top: 70px;
        padding-bottom: 136px;

        h2{
            color: #2E3D46;
            font-family: Sora;
            font-size: 2rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            @media screen and (min-width: 992px){
                font-size: 3rem;
            }
        }

        .cases-grid{
            display: grid;
            grid-template-columns: 1fr;
            gap: 25px;
            margin-bottom: 70px;

            @media screen and (min-width: 992px){
                grid-template-columns: repeat(3, 1fr);
                gap: 48px 45px;
            }

            &__col{
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;

                @media screen and (min-width: 992px){
                    display: flex;
                    flex-direction: column;
                    gap: 45px;
                }
            }
        }
    }
</style>