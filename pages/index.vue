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
                                    hide-details
                                    placeholder="Join with code"
                                    class="p-0 m-0 css-input-code"
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

    methods: {
        createBrainstorm() {},
        joinBrainstorm() {}
    }
}
</script>

<style lang="scss">
.css-layout-newBrainstorm {
    height: calc(100vh - 150px) !important;
}

.css-input-code {
    padding-top: 0;
    margin-top: 0;

    border: solid 1px #ced4da;
    border-radius: 5px 0 0 5px;

    .v-input__control > .v-input__slot:before,
    .v-input__control > .v-input__slot:after {
        display: none !important;
    }

    .v-input__append-inner {
        margin-top: 0;
    }

    input {
        margin-left: 4px;
    }
}

.css-button-join {
    border-radius: 0 5px 5px 0;
}
</style>
