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
            <v-container class="mt-8">
                <RowWriteIdeas />
            </v-container>
        </v-col>
    </v-layout>
</template>

<script>
import RowWriteIdeas from '~/components/writeIdeas/RowWriteIdeas.vue'
export default {
    name: 'WriteIdeas',

    components: { RowWriteIdeas },

    data: () => ({
        clock: {
            getTime: () => '0:0'
        }
    }),

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
        description() {
            return this.$store.getters['brainstorm/getBrainstorm'].description
        },
        currentRound() {
            return this.$store.getters['brainstorm/getCurrentRound']
        },
        time() {
            return this.clock.getTime()
        }
    },

    async created() {
        try {
            await this.$store.dispatch(
                'brainstorm/getBrainstormInfos',
                'writeIdeas'
            )

            this.clock = new this.$clock()
            this.clock.startTimer()
        } catch (error) {
            console.error(error)
        }
    },

    watch: {
        running(newVal) {
            if (!newVal) {
                this.$store.dispatch('brainstorm/verifyRunningAndStop')
            }
        }
    },

    beforeDestroy() {
        this.clock.stopTimer()
        this.$store.dispatch('listeners/stopListener', 'writeIdeas')
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
