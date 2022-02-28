<template>
    <v-row>
        <v-col cols="12" sm="4" v-for="col in 3" :key="col">
            <IdeaAreaInput v-model="newIdeas[`idea${col}`]" />
        </v-col>
    </v-row>
</template>

<script>
import IdeaAreaInput from './IdeaAreaInput.vue'

export default {
    name: 'RowWriteIdeas',

    components: { IdeaAreaInput },

    data: () => ({
        newIdeas: {
            idea1: {
                description: '',
                id: '',
                idContinueIdea: ''
            },
            idea2: {
                description: '',
                id: '',
                idContinueIdea: ''
            },
            idea3: {
                description: '',
                id: '',
                idContinueIdea: ''
            }
        }
    }),

    watch: {
        newIdeas: {
            handler(newVal) {
                const data = JSON.parse(JSON.stringify(newVal))
                this.$store.commit('writeIdeas/SET_IDEAS', data)
            },
            deep: true
        }
    }
}
</script>

<style>
</style>
