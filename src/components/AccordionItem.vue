<script setup lang="ts">
    const open = ref(false)
</script>

<template>
    <div class="accordion-item">
        <button
            type="button"
            class="accordion-header"
            :aria-expanded="open"
            @click="open = !open"
        >
            <span class="accordion-header-wrapper"><slot name="title" /></span>
            <span v-show="!open" aria-hidden="true">
                <i class="fa-light fa-plus"></i>
            </span>
            <span v-show="open" aria-hidden="true">
                <i class="fa-light fa-minus"></i>
            </span>
        </button>
        <Transition name="fade">
            <div v-if="open" class="accordion-body"><slot/></div>
        </Transition>
    </div>
</template>

<style lang="scss">
    .accordion-item{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #DADDE0;


        .accordion-header{
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding-top: 30px;
            padding-bottom: 30px;
            color: #2E3D46;
            font-size: 2rem;
            line-height: 1.875rem;
            background: none;
            border: none;
            text-align: left;

            &-wrapper{
                display: flex;
                gap: 45px;
            }

            .accordion-item__title{
                margin: 0;
                font-size: inherit;
                font-weight: inherit;
                line-height: inherit;
            }

            svg{
                font-size: 2.1875rem;
                color: #2E3D46;
            }
        }

        .accordion-body{
            padding-top: 30px;
            padding-bottom: 30px;

            font-size: 18px;
            line-height: 32px;
        }
    }
</style>