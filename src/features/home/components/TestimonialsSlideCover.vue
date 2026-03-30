<script setup lang="ts">
    import type { SlideItem, CustomerTestimonialCover } from "~/types/customerTestimonials.ts";
    const props = defineProps<{ item: SlideItem }>();

    const item = ref(props.item as CustomerTestimonialCover);
</script>

<template>
    <div class="slide-item" :style="`background-color: ${item.backgroundColor}`">
        
    </div>
</template>