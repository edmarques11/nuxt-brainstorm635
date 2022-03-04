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
        </v-col>
    </v-layout>
</template>

<script>
import RowWriteIdeas from '~/components/writeIdeas/RowWriteIdeas.vue'
import GridOldIdeas from '~/components/writeIdeas/GridOldIdeas.vue'

import { mapActions, mapGetters } from 'vuex'

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
            currentRound: 'brainstorm/getCurrentRound',
            brainstormId: 'brainstorm/getBrainstormId',
            oldIdeas: 'writeIdeas/getOldIdeas'
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
        } catch (error) {
            console.error(error)
        }
    },

    methods: {
        ...mapActions({
            saveNewIdeas: 'writeIdeas/saveNewIdeas',
            verifyRunningAndStop: 'brainstorm/verifyRunningAndStop',
            stopListener: 'listeners/stopListener',
            getBrainstormInfos: 'brainstorm/getBrainstormInfos',
            chooseSheet: 'writeIdeas/chooseSheet',
            getOldIdeas: 'writeIdeas/getOldIdeas'
        }),

        startTimer() {
            try {
                const { roundsTime, hourOfStartRound } =
                    this.$store.getters['brainstorm/getBrainstorm']

                this.clock = new this.$clock()
                this.clock.startTimer(roundsTime, hourOfStartRound)
            } catch (error) {
                console.error(error)
            }
        },

        async initNewRound(roundSaveIdeas) {
            try {
                await this.chooseSheet()
                await this.getOldIdeas()

                if (
                    this.$route.params.roundId !==
                    'round' + this.currentRound
                ) {
                    this.$router.replace({
                        path: `/brainstorm/${this.brainstormId}/round${this.currentRound}`
                    })
                }

                this.clock.stopTimer()

                await this.saveNewIdeas(roundSaveIdeas)

                this.startTimer()
            } catch (error) {
                console.error(error)
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

        currentRound(newVal, oldVal) {
            this.initNewRound(oldVal)
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
