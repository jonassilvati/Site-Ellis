<script setup>
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'
    import '@/assets/styles/main.scss';
</script>

<template>
    <div>
    <Header />
    <main>
        <NuxtPage />
    </main>
    <Footer />
    </div>
</template>