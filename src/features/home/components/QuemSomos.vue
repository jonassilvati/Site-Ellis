<script setup>
    import SectionTittle from '~/components/SectionTitle.vue';

</script>

<template>
    <section id="about-us" class="section-quemSomos-home">
        <div class="container">
            <div class="row justify-content-start">
                <div class="col-auto">
                    <SectionTittle style="margin-bottom: 30px;">Sobre nós</SectionTittle>
                </div>
            </div>
            <div class="row align-items-center justify-content-between" style="margin-bottom: 60px;">
                <div class="col-12 col-md-5">
                    <h2>Somos um estúdio criativo que faz design com propósito.</h2>
                </div>
                <div class="col-12 col-md-4">
                    <p>Projetamos experiências visuais e funcionais que impactam, transformam e conectam</p>
                </div>
            </div>
            <div class="video-panel">
                <video
                    autoplay
                    muted
                    loop
                    controls
                    src="https://res.cloudinary.com/dvctq5ba9/video/upload/v1774880806/VIDEO_INSTITUCIONAL_ELLIS_STUDIO_Final_jq2v0h.mp4"
                    preload="metadata"
                ></video>
            </div>
        </div>
    </section>
    
</template>

<style lang="scss">
    .section-quemSomos-home{
        padding-top: 99px;
        padding-bottom: 99px;
        

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

        p{
            color: #2E3D46;
            font-family: Sora;
            font-size: 1rem;
            font-style: normal;
            font-weight: 400;
            line-height: 1.875rem; /* 150% */
            
            @media screen and (min-width: 992px){
                font-size: 1.25rem;                
            }
        }

        .video-panel{
            background-color: #EBEBEB;
            width: 100%;
            aspect-ratio: 16 / 9;
            max-height: 642px;
            overflow: hidden;

            video{
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
            }
        }
    }
</style>