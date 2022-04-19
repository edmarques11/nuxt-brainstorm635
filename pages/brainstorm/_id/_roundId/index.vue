<template>
    <v-container>
        <v-row justify="center" class="mb-5">
            <h2 class="page-tittle tittle">Brainstorm 635 online</h2>
        </v-row>
        
        <v-row justify="center">
            <v-card
                min-width="80%"
                max-width="1264"
                :elevation="scrolled ? '5' : '0'"
                :class="scrolled ? 'brainstorm-infos-card-scrolled' : 'brainstorm-infos-card'"
            >
                <v-row justify="center">
                    <v-col cols="12" md="4" class="text-center d-flex justify-center align-center">
                        <v-icon
                            :color="scrolled ? '#fff' : 'primary'"
                            size="30"
                            class="mr-3"
                        >
                            mdi-clipboard-text-outline
                        </v-icon>
                        <span>{{ description }}</span>
                    </v-col>
                    
                    <v-col cols="12" md="4" class="text-center d-flex justify-center align-center">
                        <v-icon
                            :color="scrolled ? '#fff' : 'primary'"
                            size="30"
                            class="mr-3"
                        >
                            mdi-boxing-glove
                        </v-icon>
                        <span>Round {{ currentRound }}</span>
                    </v-col>

                    <v-col cols="12" md="4" class="text-center d-flex justify-center align-center">
                        <v-icon
                            :color="scrolled ? '#fff' : 'primary'"
                            size="30"
                            class="mr-3"
                        >
                            mdi-clock-time-nine-outline</v-icon>
                        <span>{{ time }}</span>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>

        <v-container v-if="oldIdeas" class="mt-15">
            <GridOldIdeas :oldIdeas="oldIdeas" />
        </v-container>
        
        <v-container>
            <RowWriteIdeas />
            <RowWriteIdeas />
        </v-container>
    </v-container>
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
        },
        scrolled: false,
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

        description () {
            return this.$store.getters['brainstorm/getBrainstorm'].description
        },

        time () {
            return this.clock.getTime()
        }
    },

    async created () {
        try {
            await this.getBrainstormInfos('writeIdeas')
        } catch (err) {
            console.error(err)
        }
    },

    beforeMount () {
        window.addEventListener('scroll', this.handleScroll);
    },

    watch: {
        async running(newVal) {
            if (!newVal) {
                try {
                    await this.saveNewIdeas()

                    this.verifyRunningAndStop()
                } catch (err) {
                    console.error(err)
                }
            }
        },

        currentRound(newVal, oldVal) {
            this.initNewRound(oldVal)
        }
    },

    beforeDestroy () {
        this.clock.stopTimer()
        this.stopListener('writeIdeas')
        window.removeEventListener('scroll', this.handleScroll);
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

        handleScroll () {
            if (window.scrollY > 115) {
                this.scrolled = true;
            } else {
                this.scrolled = false;
            }
        },

        startTimer() {
            try {
                const { roundsTime, hourOfStartRound } =
                    this.$store.getters['brainstorm/getBrainstorm']

                this.clock = new this.$clock()
                this.clock.startTimer(roundsTime, hourOfStartRound)
            } catch (err) {
                console.error(err)
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
            } catch (err) {
                console.error(err)
            }
        }
    },
}
</script>

<style scoped lang="scss">
@import '../../../../assets/variables.scss';

.brainstorm-infos-card {
    padding: 1rem 0;
    color: $terciary!important;
    font-weight: bold;
    font-size: 1.2rem;
    background-color: transparent !important;
    position: relative;
    transform: translateY(5px);
    opacity: 1;
    transition: 1s all ease;
}

.brainstorm-infos-card-scrolled {
    position: fixed;
    top: 80px;
    padding: 1rem 0;
    z-index: 2 !important;
    color: $terciary !important;
    font-weight: bold;
    border-color: $primary !important;
    background-color: $primary !important;
    transform: translateY(0);
    transition: 1s all ease;
    opacity: 1;
}

.brainstorm-infos-card-scrolled {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%),
    0px 3px 14px 2px rgb(0 0 0 / 12%) !important;
}
</style>
