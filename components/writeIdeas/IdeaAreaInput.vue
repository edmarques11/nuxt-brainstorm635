<template>
    <div>
        <v-textarea
            v-model="value.description"
            outlined
            counter="250"
            maxlength="250"
        />
        <v-row no-gutters justify="center">
            <v-select outlined dense class="col-4" />
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'IdeaAreaInput',

    props: {
        value: {
            type: Object,
            default: () => ({
                description: '',
                id: '',
                idContinueIdea: ''
            })
        }
    }
}
</script>

<style scoped lang="scss" >
::v-deep.v-input.v-textarea {
    textarea {
        min-height: 250px !important;
    }
}
</style>
