<template>
    <v-layout fill-height align-center>
        <v-col>
            <v-container class="infos-brainstorm">
                <v-card>
                    <v-row class="px-2">
                        <v-col>{{ time }}</v-col>
                        <v-col>round</v-col>
                        <v-col>tema</v-col>
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
                return this.$store.getters['writeIdeas/getBrainstormInfos']
                    .running
            },
            set(newVal) {
                this.$store.commit(
                    'brainstorm/SET_BRAINSTORM_STATE',
                    {
                        field: 'running',
                        data: newVal
                    }
                )
            }
        },
        time() {
            return this.clock.getTime()
        }
    },

    created() {
        try {
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
