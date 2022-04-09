<template>
    <v-container>
        <v-row justify="center" class="mb-5">
            <h2 class="page-tittle tittle">Brainstorm 635 online</h2>
        </v-row>
        
        <v-row justify="center">
            <v-card min-width="80%" max-width="1264" color="primary lighten-5" elevation="5" class="brainstorm-infos-card mx-aut">
                <v-row justify="center">
                    <v-col cols="12" md="4" class="text-center">{{ description }}</v-col>
                    <v-col cols="12" md="4" class="text-center">Round {{ currentRound }}</v-col>
                    <v-col cols="12" md="4" class="text-center">{{ time }}</v-col>
                </v-row>
            </v-card>
        </v-row>

        <v-container v-if="oldIdeas" class="mt-15">
            <GridOldIdeas :oldIdeas="oldIdeas" />
        </v-container>
        
        <v-container>
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

    computed: {
        verifyScroll () {
            let nav = document.getElementById('nav');
            
            window.addEventListener('scroll', function(event) {

                if (window.pageYOffset > 100) {

                    nav.style.background = '#007bff';

                }
                else{
                    nav.style.background = 'transparent';
                }
            });
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
.brainstorm-infos-card {
   /*  display: relative !important; */
    position: fixed;
    padding: 1rem 0;
    z-index: 2 !important;
}

.brainstorm-infos-card-scrolled {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%),
    0px 3px 14px 2px rgb(0 0 0 / 12%) !important;
}
</style>
