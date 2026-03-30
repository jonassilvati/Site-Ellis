<script setup>
    import { onMounted, onUnmounted, ref } from "vue"
    import Logo from "~/assets/images/Logo.svg"
    import LogoColor from "~/assets/images/LogoColor.svg"
    import Nav from "./Nav.vue"

    const isScrolled = ref(false)
    const isHidden = ref(false)
    const isOffcanvasOpen = ref(false)
    const lastScrollY = ref(0)
    const hideAfterY = 140

    const updateScrollState = () => {
        const y = window.scrollY
        isScrolled.value = y > 16

        const goingDown = y > lastScrollY.value
        const shouldHide = y > hideAfterY && goingDown

        if (isOffcanvasOpen.value) {
            isHidden.value = false
        } else {
            isHidden.value = shouldHide
        }
        lastScrollY.value = y
    }

    const onOffcanvasChange = (open) => {
        isOffcanvasOpen.value = open
        if (open) {
            isHidden.value = false
        } else {
            updateScrollState()
        }
    }

    onMounted(() => {
        lastScrollY.value = window.scrollY
        updateScrollState()
        window.addEventListener("scroll", updateScrollState, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", updateScrollState)
    })
</script>

<template>
    <header :class="{ 'is-scrolled': isScrolled, 'is-hidden': isHidden }">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-9 col-md-3">
                    <a href="">
                        <div class="logo-wrapper">
                            <Logo class="logo logo-black"/>
                            <LogoColor class="logo logo-color"/>
                        </div>
                    </a>
                </div>
                <div class="col-3 col-md-9">
                    <div class="d-flex justify-content-end">
                        <Nav @offcanvas-change="onOffcanvasChange"/>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    header{
        padding-top: 26px;
        padding-bottom: 26px;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1000;
        transition:
            padding .25s ease,
            transform .25s ease,
            background-color .25s ease,
            border-color .25s ease,
            box-shadow .25s ease;
        background-color: transparent;
        border-bottom: 1px solid transparent;
        transform: translateY(0);

        &.is-hidden{
            transform: translateY(-110%);
        }

        &.is-scrolled{
            padding-top: 12px;
            padding-bottom: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, .08);

            @supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))){
                background-color: rgba(255, 255, 255, .65);
                -webkit-backdrop-filter: blur(18px) saturate(180%);
                backdrop-filter: blur(18px) saturate(180%);
                border-bottom-color: rgba(255, 255, 255, .35);
            }

            @supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))){
                background-color: rgba(255, 255, 255, .92);
                border-bottom-color: rgba(0, 0, 0, .06);
            }
        }

        .logo{
            width: 291px;
            height: auto;
        }
        
        .logo-wrapper{
            position: relative;
            z-index: 2;
            .logo-color{
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
            }

            .logo-black{
                transition: opacity .3s linear;
            }

            &:hover{
                .logo-black{
                    opacity: 0;
                    transition: opacity .3s ease-in;
                }
            }
        }
    }
</style>