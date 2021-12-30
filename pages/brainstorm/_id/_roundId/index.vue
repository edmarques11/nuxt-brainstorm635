<template>
    <h1>aqui mermo</h1>
</template>

<script>
export default {
    name: 'WriteIdeas',

    computed: {
        running: {
            get() {
                return this.$store.getters['brainstormRoom/getBrainstormInfos']
                    .running
            },
            set(newVal) {
                this.$store.commit(
                    'brainstormRoom/SET_BRAINSTORM_INFOS_FIELD',
                    {
                        field: 'running',
                        value: newVal
                    }
                )
            }
        }
    },

    created() {
        // this.$store.dispatch('verifyRunningAndStop')
    },

    watch: {
        running(newVal) {
            if (!newVal) {
                this.$store.dispatch('verifyRunningAndStop')
            }
        }
    }
}
</script>
