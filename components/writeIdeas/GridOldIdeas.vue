<template>
    <div>
        <v-row v-for="(round, index) in oldIdeas" :key="index">
            <v-col cols="4" v-for="(idea, idx) in round" :key="idx">
                <v-card :color="idea.color" height="250">
                    <v-card-text>
                        {{ idea.description }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'GridOldIdeas',

    props: {
        oldIdeas: {
            type: Array,
            default: () => ([])
        }
    },

    watch: {
        oldIdeas: {
            handler() {
                this.$nextTick()
            },
            deep: true
        }
    }
}
</script>

<style>
</style>
