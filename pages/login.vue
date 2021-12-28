<template>
    <v-container>
        <v-row>
            <client-only>
                <v-img
                    max-width="100"
                    src="/img/logo-background-white.jpg"
                ></v-img>
            </client-only>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" class="text-center">
                <v-btn color="primary" outlined rounded>about</v-btn>
                <v-btn color="secondary" outlined rounded @click="login"
                    >Login with Google</v-btn
                >
            </v-col>
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
