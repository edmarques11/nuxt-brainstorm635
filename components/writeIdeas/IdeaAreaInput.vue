<template>
    <v-textarea
        outlined
        counter="250"
        maxlength="250"
    ></v-textarea>
</template>

<script>
export default {
    name: 'IdeaAreaInput'
}
</script>

<style scoped lang="scss" >
::v-deep.v-input.v-textarea {
    textarea {
        min-height: 250px !important;
    }
}
</style>
