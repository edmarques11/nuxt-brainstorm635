<template>
    <v-app-bar
        color="white"
        :clipped-left="$vuetify.breakpoint.smAndDown"
        app
        height="76"
        class="nav-shadow"
        :class="$vuetify.breakpoint.smAndDown ? '' : 'px-5'"
    >
        <NuxtLink to="/" class="d-flex align-center">
            <img
                width="70"
                src="@/assets/img/logo-transparent.png"
                to="/"
            />
        </NuxtLink>

        <v-spacer />

        <img
            width="45"
            class="rounded-pill"
            :src="currentUser.photoURL"
        />
        <UserInfo :current-user="currentUser" />
    </v-app-bar>
</template>

<script>
export default {
    name: 'NavBAr',

    data () {
        return {
            title: 'Brainstorm635',
            currentUser: {}
        }
    },

    async mounted() {
        try {
            const { displayName, photoURL } = await this.$store.dispatch(
                'user/getUserInfo'
            )
            this.currentUser = { displayName, photoURL }
        } catch (error) {}
    }
}
</script>

<style scoped lang="scss">
.nav-shadow {
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
}
</style>