<template>
    <v-row>
        <v-col cols="12" sm="4" v-for="col in 3" :key="col">
            <IdeaAreaInput />
        </v-col>
    </v-row>
</template>

<script>
import IdeaAreaInput from './IdeaAreaInput.vue'

export default {
    name: 'RowWriteIdeas',

    components: { IdeaAreaInput }
}
</script>

<style>
</style>
