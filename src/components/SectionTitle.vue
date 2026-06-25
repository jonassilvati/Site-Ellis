<script setup lang="ts">
    const props = defineProps({
        variant: {
            type: String,
            default: 'dark',
            validator: (value: string) => ['dark', 'light'].includes(value)
        }
    });

    const hover = ref(false);
</script>

<template>
    <div class="section-title-wrapper" :class="`variant-${props.variant}`" @mouseleave="hover = false" @mouseenter="hover = true">
        <span v-show="hover" aria-hidden="true">
            <i class="fa-sharp fa-regular fa-arrow-up-right"></i>
        </span>
        <span v-show="!hover" aria-hidden="true">
            <i class="fa-sharp fa-regular fa-arrow-down-right"></i>
        </span>
        <h2 class="section-title"><slot/></h2>
    </div>
</template>

<style lang="scss">
    .section-title-wrapper{
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: 1.125rem;

        svg{
            font-size: 1.5rem;
        }

        &.variant-dark{
            svg{
                fill:#2E3D46;
                color: #2E3D46;
            }

            h2.section-title,
            .section-title{
                color: #2E3D46;
            }
        }

        &.variant-light{
            svg{
                color: #fff;
                fill: #fff;
            }

            h2.section-title,
            .section-title{
                color: #fff;
            }
        }


        h2.section-title,
        .section-title{
            font-family: Sora;
            font-style: normal;
            font-weight: 400;
            line-height: 2.1875rem; 
        }
    }
</style>