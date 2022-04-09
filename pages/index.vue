<template>
    <v-layout justify-center column class="css-layout-newBrainstorm">
        <v-row justify="center">
            <v-col>
                <h2 class="page-tittle tittle">NEW BRAINSTORM</h2>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="8" md="6" :class="$vuetify.breakpoint.smAndDown ? 'px-0' : ''">
                <v-row justify="center">
                    <v-col class="text-center">
                        <v-btn
                            large
                            outlined
                            color="primary"
                            class="create-btn"
                            @click="createBrainstorm()"
                        >
                            <v-icon>mdi-plus</v-icon>
                            NEW BRAINSTORM
                        </v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-layout>
                            <v-text-field
                                v-model="joinCode"
                                hide-details
                                height="41.92"
                                placeholder="Join with code"
                                class="
                                    p-0
                                    m-0
                                    css-input-border
                                    css-no-border-right
                                "
                            />
                            <v-btn
                                large
                                elevation="0"
                                color="primary"
                                class="css-button-join"
                                @click="joinBrainstorm()"
                            >
                                Join
                            </v-btn>
                        </v-layout>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
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
                await this.$store.dispatch('brainstorm/createNewBrainstorm')
            } catch (error) {
                console.error(error)
            }
        },
        async joinBrainstorm() {
            try {
                await this.$store.dispatch('brainstorm/joinInBrainstorm', this.joinCode)
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.css-layout-newBrainstorm {
    height: calc(100vh - 150px) !important;
}

.css-button-join {
    border-radius: 0 5px 5px 0;
}


.css-input-border.css-no-border-right {
    border-radius: 5px 0 0 5px;
}

.create-btn:hover {
    color: #fff !important;
    background-color: $primary !important;
    border-color: $primary !important;
}
</style>
