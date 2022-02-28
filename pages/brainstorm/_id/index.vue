<template>
    <v-container>
        <v-row justify="center">
            <h1>BRAINSTORM</h1>
        </v-row>
        <v-row justify="center">
            <v-col cols="10">
                <BrainstormInfo :isLeader="isLeader" :brainstormId="brainstormId" />
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
                    :disabled="!isLeader"
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
                this.$store.commit('brainstorm/SET_BRAINSTORM_STATE', {
                    field: 'running',
                    data: newVal
                })
            }
        },
        isLeader() {
            return this.$store.getters['brainstorm/leader'] === this.$store.getters['user/getUid']
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

    async created() {
        try {
            this.$store.commit('brainstormRoom/SET_STATE', {
                field: 'brainstormId',
                data: this.$route.params.id
            })

            await this.$store.dispatch('brainstorm/verifyRunningAndStop')

            await this.getBrainstormInfo()

            await this.$store.dispatch('user/setUserInfoState')
        } catch (error) {
            console.error(error)
        }
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
                    this.$store.commit('brainstorm/SET_BRAINSTORM_STATE', {
                        field: 'currentRound',
                        data: 1
                    })
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

    beforeDestroy() {
        this.$store.dispatch('listeners/stopListener', 'listenerGetRoomInfos')
    }
}
</script>
