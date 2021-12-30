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
        <v-row justify="center">
            <v-col cols="12" sm="5" class="text-left">
                <ListUsers />
            </v-col>
            <v-col cols="12" sm="5" class="text-center align-self-center">
                <v-btn
                    color="secondary"
                    outlined
                    class="rounded-pill"
                    @click="running = true"
                >
                    Start
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'BrainstormRoom',

    computed: {
        running: {
            get() {
                return this.$store.getters['brainstormRoom/getBrainstormInfos']
                    .running
            },
            set(newVal) {
                this.$store.commit(
                    'brainstormRoom/SET_BRAINSTORM_INFOS_FIELD',
                    {
                        field: 'running',
                        value: newVal
                    }
                )
            }
        },
        isLeader() {
            return this.$store.getters['brainstormRoom/getBrainstormInfos']
                .isLeader
        },
        currentRound() {
            return this.$store.getters['brainstormRoom/getBrainstormInfos']
                .currentRound
        },
        brainstormId() {
            return this.$store.getters['brainstormRoom/getBrainstormInfos']
                .brainstormId
        }
    },

    created() {
        this.$store.commit('brainstormRoom/SET_BRAINSTORM_INFOS_FIELD', {
            field: 'brainstormId',
            value: this.$route.params.id
        })

        this.$store.dispatch('verifyRunningAndStop')

        this.getBrainstormInfo()
    },

    methods: {
        async getBrainstormInfo() {
            try {
                await this.$store.dispatch('brainstormRoom/getRoomInfos')
            } catch (error) {
                console.error(error)
            }
        },
        async startBrainstorm() {
            let success = false
            try {
                if (this.currentRound < 1) {
                    this.$store.commit(
                        'brainstormRoom/SET_BRAINSTORM_INFOS_FIELD',
                        {
                            field: 'currentRound',
                            value: 1
                        }
                    )
                }
                await this.$store.dispatch('brainstormRoom/saveInfos')
                await this.$store.dispatch('brainstormRoom/createSheet')

                success = true
            } catch (error) {
                console.error(error)
            } finally {
                if (success) {
                    this.$router.push({
                        path: `/brainstorm/${this.brainstormId}/round${this.currentRound}`
                    })
                }
            }
        }
    },

    watch: {
        running(newVal) {
            if (newVal) {
                this.startBrainstorm()
            }
        }
    },

    destroyed() {
        this.$store.dispatch('listeners/stopListener', 'listenerGetRoomInfos')
    }
}
</script>
