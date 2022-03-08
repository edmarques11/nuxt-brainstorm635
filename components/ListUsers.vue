<template>
    <v-layout justify-center>
        <v-list min-width="100%">
            <v-list-item v-for="(user, index) in listGuests" :key="index" class="px-0">
                <v-list-item-content>
                    <v-row>
                        <v-col cols="4" sm="2" md="3">
                            <v-img
                                width="40"
                                height="40"
                                :src="user.photoURL"
                                class="rounded-pill ml-auto"
                            />
                        </v-col>
                        <v-col
                            cols="8"
                            sm="10"
                            md="9"
                            class="align-self-center pl-0"
                        >
                            <span>{{ user.displayName }}</span>
                        </v-col>
                    </v-row>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-layout>
</template>

<script>
export default {
    name: 'ListUsers',

    computed: {
        listGuests() {
            return this.$store.getters['brainstorm/getBrainstorm']
                .listGuests
        }
    }
}
</script>

<style>
</style>
