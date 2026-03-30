<script setup>
    import { ref, onUnmounted } from 'vue';
    import Button from './Button.vue';

    const emit = defineEmits(['offcanvas-change']);

    const menuOffcanvasRef = ref(null);

    const setOffcanvasOpen = (open) => {
        emit('offcanvas-change', open);
    };

    const lockBodyScroll = () => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    };

    const unlockBodyScroll = () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    };

    const menuItems = [
        {
            title: 'Início',
            href: '#begin-section'
        },
        {
            title: 'Sobre Nós',
            href: '#about-us'
        },
        {
            title: 'Cases',
            href: '#cases'
        }
    ]

    const openModal = () => {
        window.open('https://wa.me/5548991414050', '_blank');
    }

    const openMenuOffcanvas = () => {
        menuOffcanvasRef.value?.classList.add('active');
        lockBodyScroll();
        setOffcanvasOpen(true);
    }

    const closeMenuOffcanvas = () => {
        menuOffcanvasRef.value?.classList.remove('active');
        unlockBodyScroll();
        setOffcanvasOpen(false);
    }

    const cbAfterOpenMenuOffcanvas = () => {
        setTimeout(() => {
            menuOffcanvasRef.value?.classList.remove('active');
            unlockBodyScroll();
            setOffcanvasOpen(false);
        }, 100);
    }

    onUnmounted(() => {
        unlockBodyScroll();
        setOffcanvasOpen(false);
    });
</script>

<template>
    <nav>
        <ul class="d-none d-lg-flex menu-desktop">
            <li v-for="item in menuItems" :key="item.title"><a :href="item.href" @click="cbAfterOpenMenuOffcanvas()">{{ item.title }}</a></li>
            <li><Button v-on:click="openModal()">Solicite uma proposta</Button></li>
        </ul>
        <button v-on:click="openMenuOffcanvas()" class="menu-mobile-toggle open d-block d-lg-none"></button>
    </nav>
    <div ref="menuOffcanvasRef" class="menu-offcanvas">
        <div class="d-flex align-items-center justify-content-between menu-offcanvas__header">
            <h4>Menu</h4>
            <button v-on:click="closeMenuOffcanvas()" class="menu-mobile-toggle close d-block d-lg-none"></button>
        </div>
        <div class="d-flex align-items-start justify-content-start" style="gap: 40px;">
            <ul class="">
                <li v-for="item in menuItems" :key="item.title"><a :href="item.href" @click="cbAfterOpenMenuOffcanvas()">{{ item.title }}</a></li>
                <li><Button v-on:click="openModal()">Solicite uma proposta</Button></li>
            </ul>            
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .menu-offcanvas{
        position: fixed;
        padding: 26px 10.5px 26px;
        left: auto;
        right: -70vw;
        width: 70vw;
        top: 0;
        height: 100vh;
        background-color: #fff;
        transition: right .3s linear;
        z-index: 1000;

        h4{
            font-size: 1.8rem;
        }
        
        &.active{
            right: 0;
            transition: right .3s linear;
        }

        ul{
            padding: 0;
            list-style: none;
            margin-bottom: 40px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;

            & > li:last-child{
                padding-top: 40px;
            }

            a{
                padding: 9px 0;
                text-decoration: none;
                color: #2E3D46;
                font-family: Sora;
                font-size: 1.125rem;
                font-style: normal;
                font-weight: 400;
                line-height: normal; 
            }

            button{
                width: 100%;
                justify-content: center;
            }
        }

        &__header{
            margin-bottom: 40px;
        }

    }

    .is-scrolled .menu-offcanvas{
        padding: 12px 10.5px 12px;
    }

    ul.menu-desktop{
        display: flex;
        flex-direction: row;
        gap: 40px;
        align-items: center;
        margin: 0;
        padding: 0;
        list-style: none;
        
        a{
            padding: 9px 0;
            text-decoration: none;
            color: #2E3D46;
            font-family: Sora;
            font-size: 1.125rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            &:hover{
                border-bottom: 1px solid #5C6FEC;
            }
        }
    }

    .menu-mobile-toggle.open{
        display: block;
        width: 40px;
        height: 40px;
        background: url('images/menu-bar.svg') no-repeat center center / 35px 35px;
        border: none;
    }
    
    .menu-mobile-toggle.close{
        display: block;
        width: 40px;
        height: 40px;
        background: url('images/close.svg') no-repeat center center / 25px 25px;
        border: none;
    }
</style>