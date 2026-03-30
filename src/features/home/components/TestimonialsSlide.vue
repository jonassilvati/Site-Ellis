<script setup lang="ts">
    import TestimonialsSlideCover from './TestimonialsSlideCover.vue';
    import TestimonialsSlidePage from './TestimonialsSlidePage.vue';
    import type { SlideItem } from "~/types/customerTestimonials.ts";

    const props = defineProps<{
        items: SlideItem[]
    }>()
</script>

<template>
    <swiper-container>
        <swiper-slide v-for="(item, index) in props.items">
            <TestimonialsSlideCover :item="item" v-if="index == 0"/>
            <TestimonialsSlidePage :item="item" v-else/>
        </swiper-slide>
    </swiper-container>
</template>