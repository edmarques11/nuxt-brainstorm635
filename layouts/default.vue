<template>
    <v-app>
        <NavBar />

        <v-main class="bg-main">
            <v-layout class="ma-4">
                <Nuxt />
            </v-layout>
        </v-main>

        <FooterBar />
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',

    data() {
        return {}
    },
}
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.bg-main {
    background-color: $background !important;
}
</style>

