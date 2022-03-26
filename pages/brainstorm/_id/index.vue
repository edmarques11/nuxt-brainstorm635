<template>
    <v-container>
        <v-row justify="center">
            <h2 class="page-tittle tittle">BRAINSTORM</h2>
        </v-row>
        <v-row justify="center" class="mt-8">
            <v-col cols="10">
                <BrainstormInfo
                    :isLeader="isLeader"
                    :brainstormId="brainstormId"
                />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" sm="5" class="text-left pl-0">
                <ListUsers />
            </v-col>
            <v-col cols="12" sm="5" class="text-center align-self-center">
                <v-btn
                    color="primary"
                    outlined
                    listGuests
                    large
                    width="150"
                    class="rounded-pill start-btn"
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
                return this.$store.getters['brainstorm/getRunning']
            },
            set(newVal) {
                this.$store.commit('brainstorm/SET_BRAINSTORM_STATE', {
                    field: 'running',
                    data: newVal
                })
            }
        },
        isLeader() {
            return (
                this.$store.getters['brainstorm/leader'] ===
                this.$store.getters['user/getUid']
            )
        },
        currentRound() {
            return this.$store.getters['brainstorm/getCurrentRound']
        },
        brainstormId() {
            return this.$store.getters['brainstorm/getBrainstormId']
        }
    },

    async created() {
        try {
            await this.$store.dispatch('brainstorm/verifyRunningAndStop')

            await this.$store.dispatch(
                'brainstorm/getBrainstormInfos',
                'RoomSale'
            )

            await this.$store.dispatch('user/setUserInfoState')
        } catch (error) {
            console.error(error)
        }
    },

    methods: {
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

                if (this.isLeader) {
                    await this.$store.dispatch(
                        'brainstorm/setHourStartRound',
                        this.brainstormId
                    )
                }

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

<style scoped lang="scss">
@import '@/assets/variables.scss';

.start-btn:hover {
    color: #fff !important;
    background-color: $primary;
    border-color: $primary;
}
</style>
