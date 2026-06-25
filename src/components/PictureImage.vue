<script setup lang="ts">
    const props = withDefaults(defineProps<{
        src: string;
        alt?: string;
        loading?: 'lazy' | 'eager';
        fetchPriority?: 'high' | 'low' | 'auto';
    }>(), {
        loading: 'lazy',
        fetchPriority: 'auto',
    });

    const avifSrc = computed(() =>
        props.src.endsWith('.avif')
            ? props.src
            : props.src.replace(/\.(jpe?g|png)$/i, '.avif'),
    );
</script>

<template>
    <picture>
        <source :srcset="avifSrc" type="image/avif">
        <img
            :src="src"
            :alt="alt || ''"
            :loading="loading"
            decoding="async"
            :fetchpriority="fetchPriority"
        >
    </picture>
</template>
