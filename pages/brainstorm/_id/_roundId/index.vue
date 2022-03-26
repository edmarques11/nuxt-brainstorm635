<template>
    <v-layout fill-height align-center>
        <v-col>
            <v-container class="infos-brainstorm">
                <v-card>
                    <v-row class="px-2">
                        <v-col class="text-center">{{ description }}</v-col>
                        <v-col class="text-center"
                            >Round {{ currentRound }}</v-col
                        >
                        <v-col class="text-center">{{ time }}</v-col>
                    </v-row>
                </v-card>
            </v-container>
            <v-container class="mt-10">
                <GridOldIdeas :oldIdeas="oldIdeas" />
            </v-container>
            <v-container>
                <RowWriteIdeas />
            </v-container>
            <v-container v-if="isLeader">
                <v-row justify="center">
                    <v-row class="col-12 col-md-4" justify="space-around">
                        <v-btn color="warning">Pause</v-btn>
                        <v-btn class="primary" @click="pushNewPage"
                            >Next round</v-btn
                        >
                    </v-row>
                </v-row>
            </v-container>
        </v-col>
    </v-layout>
</template>

<script>
import RowWriteIdeas from '~/components/writeIdeas/RowWriteIdeas.vue'
import GridOldIdeas from '~/components/writeIdeas/GridOldIdeas.vue'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'WriteIdeas',

    components: { RowWriteIdeas, GridOldIdeas },

    data: () => ({
        clock: {
            getTime: () => '0:0',
            stopTimer: () => {}
        }
    }),

    computed: {
        ...mapGetters({
            brainstormId: 'brainstorm/getBrainstormId',
            oldIdeas: 'writeIdeas/getOldIdeas',
            leader: 'brainstorm/leader',
            userUid: 'user/getUid',
            currentRound: 'brainstorm/getCurrentRound',
            listGuests: 'brainstorm/getListGuests'
        }),
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
            return this.userUid === this.leader
        },
        description() {
            return this.$store.getters['brainstorm/getBrainstorm'].description
        },
        time() {
            return this.clock.getTime()
        }
    },

    async created() {
        try {
            await this.getBrainstormInfos('writeIdeas')
            const dataUser = await this.getCurrentUserInfos()
            this.SET_USER_STATE(dataUser)
        } catch (error) {
            console.error(error)
        }
    },

    async mounted() {
        try {
            await this.getDataToChangeRound()
            this.startTimer()
        } catch (err) {
            console.error(err)
        }
    },

    methods: {
        ...mapActions({
            saveNewIdeas: 'writeIdeas/saveNewIdeas',
            verifyRunningAndStop: 'brainstorm/verifyRunningAndStop',
            stopListener: 'listeners/stopListener',
            getBrainstormInfos: 'brainstorm/getBrainstormInfos',
            chooseSheet: 'writeIdeas/chooseSheet',
            getOldIdeas: 'writeIdeas/getOldIdeas',
            changeRound: 'writeIdeas/changeRound',
            getCurrentUserInfos: 'user/getUserInfo'
        }),

        ...mapMutations({
            SET_USER_STATE: 'user/SET_USER_STATE'
        }),

        async getDataToChangeRound() {
            try {
                await this.chooseSheet()
                await this.getOldIdeas()
            } catch (err) {
                console.error(err)
            }
        },

        startTimer() {
            try {
                const { roundsTime, hourOfStartRound } =
                    this.$store.getters['brainstorm/getBrainstorm']

                this.clock = new this.$clock(
                    roundsTime,
                    new Date(hourOfStartRound)
                )

                this.clock.startTimer()
            } catch (error) {
                console.error(error)
            }
        },

        async changeRouteRound() {
            try {
                await this.getDataToChangeRound()

                const pathRound = `/brainstorm/${this.brainstormId}/round${this.currentRound}`

                if (this.$route.path != pathRound) {
                    this.$router.replace({
                        path: pathRound
                    })
                }
            } catch (err) {
                console.error(err)
            }
        },

        async initNewRound() {
            try {
                await this.saveNewIdeas(this.currentRound)
                await this.changeRound()

                this.clock.stopTimer()

                await this.getDataToChangeRound()
                this.startTimer()

                if (
                    this.$route.params.roundId !==
                    'round' + this.currentRound
                ) {
                    this.changeRouteRound()
                }
            } catch (error) {
                console.error(error)
            }
        },

        async setConcludedBrainstorm() {
            try {
                this.$router.replace({
                    path: `/brainstorm/${this.brainstormId}/list-ideas`
                })
            } catch (err) {
                console.error(err)
            }
        },

        async pushNewPage() {
            try {
                if (this.currentRound < this.listGuests.length) {
                    await this.initNewRound()
                } else {
                    this.setConcludedBrainstorm()
                }
            } catch (err) {
                console.error(err)
            }
        }
    },

    watch: {
        async running(newVal) {
            if (!newVal) {
                try {
                    await this.saveNewIdeas()

                    this.verifyRunningAndStop()
                } catch (error) {
                    console.error(error)
                }
            }
        },
        async currentRound() {
            try {
                this.changeRouteRound()
            } catch (err) {
                console.error(err)
            }
        }
    },

    beforeDestroy() {
        this.clock.stopTimer()
        this.stopListener('writeIdeas')
    }
}
</script>

<style scoped lang="scss">
.infos-brainstorm {
    display: relative !important;
    position: fixed;
    top: 100px;
    left: 80px;
    right: 80px;

    z-index: 2 !important;

    .v-card {
        background-color: #f1f1f1 !important;
    }
}
</style>
