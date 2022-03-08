<template>
    <v-container class="fill-height align-content-start">
        <v-row justify="start">
            <client-only>
                <v-img
                    max-width="100"
                    src="/img/logo-background-white.png"
                />
            </client-only>
        </v-row>
        <v-row justify="center" style="height: calc(80% - 100px)">
            <v-col cols="12" class="text-center mt-5">
                <h1 class="page-tittle tittle">WELCOME TO BRAINSTORM635</h1>
            </v-col>

            <v-col cols="12" class="text-center">
                <div :class="$vuetify.breakpoint.smAndDown ? 'd-flex flex-column-reverse' : ''">
                    <v-btn
                        color="secondary"
                        outlined
                        rounded
                        x-large
                        :block="$vuetify.breakpoint.smAndDown"
                        class="mt-3 about-btn"
                        :class="$vuetify.breakpoint.smAndDown ? 'mr-0' : 'mr-2'"
                        >
                            About
                    </v-btn>
                    <v-btn
                        color="primary"
                        outlined
                        rounded
                        x-large
                        :block="$vuetify.breakpoint.smAndDown"
                        class="mt-3 login-btn"
                        :class="$vuetify.breakpoint.smAndDown ? 'ml-0' : 'ml-2'"
                        @click="login()"
                    >
                        <img width="30" class="mr-2" src="/img/google.png" />         
                        Login with Google
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'LoginScreen',

    layout: 'login',

    methods: {
        async login () {
            try {
                await this.$store.dispatch('auth/login')
            } catch (error) {}
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.about-btn:hover {
    color: #fff !important;
    background-color: $secondary;
    border-color: $secondary;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%),
        0px 3px 14px 2px rgb(0 0 0 / 12%) !important;
}
.login-btn:hover {
    color: #fff !important;
    border-color: $primary;
    background-color: $primary;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%),
        0px 3px 14px 2px rgb(0 0 0 / 12%) !important;
}
</style>