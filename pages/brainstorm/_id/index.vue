<template>
    <v-container>
        <v-row justify="center">
            <h1>BRAINSTORM</h1>
        </v-row>
        <v-row justify="center">
            <v-col cols="10">
                <BrainstormInfo />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'BrainstormRoom',

    created() {
        this.$store.commit('brainstormRoom/SET_BRAINSTORM_INFOS_FIELD', {
            field: 'brainstormId',
            value: this.$route.params.id
        })

        this.getBrainstormInfo()
    },

    methods: {
        getBrainstormInfo() {
            try {
                this.$store.dispatch('brainstormRoom/getRoomInfos')
            } catch (error) {
                console.error(error)
            }
        }
    },

    destroyed() {
        this.$store.dispatch('listeners/stopListener', 'listenerGetRoomInfos')
    }
}
</script>

<style>
</style>
