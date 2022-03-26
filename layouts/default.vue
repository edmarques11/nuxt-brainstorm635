<template>
    <v-app>
        <v-app-bar
            color="white"
            :clipped-left="clipped"
            app
            height="76"
            class="nav-shadow"
            :class="$vuetify.breakpoint.smAndDown ? '' : 'px-5'"
        >
            <NuxtLink to="/">
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

        <v-main class="bg-main">
            <v-layout fill-height class="ma-4">
                <Nuxt />
            </v-layout>
        </v-main>

        <v-footer
            app
            tile
            elevation="3"
            color="#fff"
            class="border-footer"
            :height="$vuetify.breakpoint.xs ? '150' : '80'"
        >
            <v-container fluid class="py-0 px-5">
            
                <v-row v-if="$vuetify.breakpoint.smAndDown" justify="center" align="center">
                    <v-col cols="12" class="text-center">
                        <v-btn
                            v-for="icon in icons"
                            :key="icon.icon"
                            class="mx-4 increase-btn"
                            icon
                        >
                            <a :href="icon.link" target="_blank">
                            <v-icon
                                color="primary" size="28px">
                                {{ icon.icon }}
                            </v-icon>
                            </a>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-divider v-if="$vuetify.breakpoint.smAndDown"></v-divider>

                <v-row
                    :justify="$vuetify.breakpoint.xs ? '' : 'space-around'"
                    align="center"
                    no-gutters
                    class="py-1"
                >
                    <v-col
                        cols="12"
                        sm="4"
                        :class="$vuetify.breakpoint.xs ? 'text-center' : ''"
                    >
                        <v-card-text class="text-body-4">
                            <span>&copy; CopyLeft</span>
                            <span> <strong> 2020 - 2022 </strong></span>
                        </v-card-text>
                    </v-col>

                    <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="4" class="text-center">
                        <v-btn
                            v-for="icon in icons"
                            :key="icon.icon"
                            class="mx-4 increase-btn"
                            icon
                        >
                            <a :href="icon.link" target="_blank">
                                <v-icon
                                    color="primary" size="28px">
                                    {{ icon.icon }}
                                </v-icon>
                            </a>
                        </v-btn>
                    </v-col>

                    <v-col
                        cols="12" sm="4"
                        :class="$vuetify.breakpoint.xs ? 'text-center' : 'd-flex justify-end'"
                    >
                        <img width="210" src="@/assets/img/logo-footer-transparent.png" alt="Brainstorm logo" />
                    </v-col>
                </v-row>
            </v-container>
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
            currentUser: {},
            icons: [
                { icon: 'mdi-github', link: 'https://github.com/rafaelramos64' },
                { icon: 'mdi-email', link: 'mailto:<rafaelramos64@protonmail.com>' },
                { icon: 'mdi-linkedin', link: 'https://www.linkedin.com/in/rafael-ramos64' },
            ],
        }
    },

    async mounted () {
        try {
            const { displayName, photoURL } = await this.$store.dispatch('user/getUserInfo')
            this.currentUser = { displayName, photoURL }
        } catch (err) {
            console.error(err)
        }
    }
}
</script>

<style scoped lang="scss">
.nav-shadow {
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
}

.bg-main {
    background-color: #f9faff !important;
}

.increase-btn:hover {
    transform: scale(1.1) !important;
    & .v-icon {
        color: $secondary !important;
    }
}

a {
    text-decoration: none !important;
}

.v-card__text {
    font-size: 1.1rem !important;
}

</style>

