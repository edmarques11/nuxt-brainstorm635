<template>
    <v-layout justify="center">
        <v-list min-width="100%" color="transparent">
            <v-list-item
                v-for="(user, index) in listGuests"
                :key="index"
                :class="$vuetify.breakpoint.smAndDown ? '' : 'px-0'"
            >
                <v-list-item-content>
                    <v-row>
                        <v-col cols="4" sm="2" md="3">
                            <v-img
                                v-if="user.photoURL"
                                min-width="40"
                                min-height="40"
                                max-width="40"
                                max-height="40"
                                :src="user.photoURL"
                                class="rounded-pill ml-auto"
                            />
                            <v-icon v-else size="35">mdi-account</v-icon>
                        </v-col>
                        <v-col
                            cols="8"
                            sm="10"
                            md="9"
                            class="align-self-center"
                            :class="$vuetify.breakpoint.smAndDown ? '' : 'pl-0'"
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
