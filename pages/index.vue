<template>
    <v-layout justify-center column class="css-layout-newBrainstorm">
        <v-container>
            <v-row justify="center">
                <h1 class="my-8">NEW BRAINSTORM</h1>
            </v-row>
            <v-row justify="center">
                <v-col cols="8" md="6">
                    <v-row justify="center">
                        <v-col class="text-center">
                            <v-btn
                                outlined
                                color="secondary"
                                @click="createBrainstorm()"
                            >
                                <span> NEW BRAINSTORM</span>
                                <v-icon>mdi-plus</v-icon></v-btn
                            >
                        </v-col>
                        <v-col class="text-center">
                            <v-layout>
                                <v-text-field
                                    v-model="joinCode"
                                    hide-details
                                    placeholder="Join with code"
                                    class="
                                        p-0
                                        m-0
                                        css-input-border
                                        css-no-border-right
                                    "
                                />
                                <v-btn
                                    color="secondary"
                                    elevation="0"
                                    class="css-button-join"
                                    @click="joinBrainstorm()"
                                    >Join</v-btn
                                >
                            </v-layout>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
export default {
    name: 'Home',

    data: () => ({
        joinCode: null
    }),

    methods: {
        async createBrainstorm() {
            try {
                await this.$store.dispatch('createNewBrainstorm')
            } catch (error) {
                console.error(error)
            }
        },
        async joinBrainstorm() {
            try {
                await this.$store.dispatch('joinInBrainstorm', this.joinCode)
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

<style lang="css">
.css-layout-newBrainstorm {
    height: calc(100vh - 150px) !important;
}

.css-button-join {
    border-radius: 0 5px 5px 0;
}

.css-input-border.css-no-border-right {
    border-radius: 5px 0 0 5px;
}
</style>
