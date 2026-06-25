<script setup lang="ts">
    import type { SlideItem, CustomerTestimonialPage } from "~/types/customerTestimonials.ts";

    const props = defineProps<{ item: SlideItem }>();
    const item = computed(() => props.item as CustomerTestimonialPage);
</script>

<template>
    <div class="slide-item">
        <PictureImage :src="item.img" />
    </div>
</template>
