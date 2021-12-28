<template>
    <v-container class="fill-height align-content-start">
        <v-row justify="start">
            <client-only>
                <v-img
                    max-width="100"
                    src="/img/logo-background-white.png"
                ></v-img>
            </client-only>
        </v-row>
        <v-row justify="center" style="height: calc(100% - 100px)">
            <v-flex class="align-self-center">
                <v-col cols="12" class="text-center">
                    <h1>WELCOME TO BRAINSTORM635</h1>
                </v-col>
                <v-col cols="12" class="text-center">
                    <v-btn
                        color="primary"
                        outlined
                        rounded
                        class="mr-2 mt-2 mt-sm-0"
                        >about</v-btn
                    >
                    <v-btn
                        color="secondary"
                        outlined
                        rounded
                        class="ml-2 mt-2 mt-sm-0"
                        @click="login()"
                    >
                        <v-img width="30" class="mr-2" src="/img/google.png" />
                        Login with Google</v-btn
                    >
                </v-col>
            </v-flex>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'LoginScreen',

    layout: 'login',

    methods: {
        async login() {
            try {
                await this.$store.dispatch('auth/login')
            } catch (error) {}
        }
    }
}
</script>
