<template>
    <v-app>
        <v-app-bar color="white" :clipped-left="clipped" fixed app height="76">
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-col cols="6" sm="4" md="3">
                <v-row>
                    <v-col cols="3">
                        <v-img
                            width="45"
                            class="rounded-pill"
                            :src="currentUser.photoURL"
                        />
                    </v-col>
                    <v-col cols="9" class="px-0">
                        <UserInfo :current-user="currentUser" />
                    </v-col>
                </v-row>
            </v-col>
        </v-app-bar>
        <v-main>
            <v-layout fill-height class="ma-4">
                <Nuxt />
            </v-layout>
        </v-main>
        <v-footer :absolute="true" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',

    data() {
        return {
            clipped: false,
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

