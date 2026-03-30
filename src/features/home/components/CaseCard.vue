<script setup lang="ts">
    const props = defineProps({
        variation: {
            type: String,
            default: 'short',
            validator: (v: string) => ['tall', 'short'].includes(v)
        },
        img: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: false,  
        },
        title: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <article :class="`case-card style-${props.variation}`">
        <img :src="props.img" :alt="props.alt || ''">
        <span class="case-card__title">{{ props.title }}</span>
    </article>
</template>

<style lang="scss">
    .case-card{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #DADDE0;

        img{
            width: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 8px;
        }

        &.style-short{
            img{
                height: 336px;
            }
        }

        &.style-tall{
            img{
                height: 463px;
            }
        }

        &__title{
            padding-top: 30px;
            padding-bottom: 30px;
            color: #2E3D46;
            font-family: Sora;
            font-size: 1.75rem;
            font-style: normal;
            font-weight: 400;
            line-height: 1.875rem;
        }
    
    }
</style>