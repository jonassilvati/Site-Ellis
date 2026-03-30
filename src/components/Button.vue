<script setup lang="ts">
    const props = defineProps<{
        variation?: 'button' | 'text',
        noIcon?: boolean,
        onClick?: () => void
    }>();
</script>

<template>
    <button class="ellis-button" :class="`variation-${props.variation || 'button'}`" @click="props.onClick">
        <slot/>
        <span v-show="!props.noIcon"><i class="fa-solid fa-arrow-right-long"></i></span>
    </button>
</template>

<style lang="scss" scoped>
    .ellis-button{
        padding: 9px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        white-space: nowrap;
        border-radius: 30px;
        color: #54636E;
        font-family: Sora;
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 400;
        line-height: 2.1875rem;
        background: transparent;
        transition: background .3s linear;
        border: none;
        cursor: pointer;
        
        &.variation-button{
            border: 2px solid #54636E;
        }

        &:hover{
            color: #fff;
            background-color: #5C6FEC;
            transition: background .3s linear;
            &.variation-button{
                border-color: #5C6FEC;
            }
        }
    }
</style>