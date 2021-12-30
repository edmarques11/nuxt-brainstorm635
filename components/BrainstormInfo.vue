<template>
    <v-layout>
        <v-row>
            <v-col cols="4">
                <p class="mb-0">
                    Theme/Description <span class="red--text">*</span>
                </p>
                <v-text-field
                    v-model="description"
                    hide-details
                    placeholder="Brainstorm desciption"
                    class="css-input-border m-0"
                    @blur="saveInfos()"
                />
            </v-col>
            <v-col cols="2">
                <p class="mb-0">Rounds time <span class="red--text">*</span></p>
                <div class="css-information-area">{{ roundsTime }}</div>
            </v-col>
            <v-col cols="3">
                <p class="mb-0">Brainstorm code</p>
                <div class="css-information-area">
                    {{ brainstormId }}
                </div>
            </v-col>
            <v-col cols="3">
                <p class="mb-0">Active members</p>
                <div class="css-information-area">{{ countMembers }}</div>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
export default {
    name: 'BrainstormInfo',

    computed: {
        brainstormId() {
            return this.$store.getters['brainstormRoom/getBrainstormInfos']
                .brainstormId
        },
        countMembers() {
            return this.$store.getters['brainstormRoom/getBrainstormInfos']
                .listGuests.length
        },
        description: {
            get() {
                return this.$store.getters['brainstormRoom/getBrainstormInfos']
                    .description
            },
            set(newVal) {
                this.$store.commit(
                    'brainstormRoom/SET_BRAINSTORM_INFOS_FIELD',
                    {
                        field: 'description',
                        value: newVal
                    }
                )
            }
        },
        roundsTime: {
            get() {
                return this.$store.getters['brainstormRoom/getBrainstormInfos']
                    .roundsTime
            },
            set(newVal) {
                this.$store.commit(
                    'brainstormRoom/SET_BRAINSTORM_INFOS_FIELD',
                    {
                        field: 'roundsTime',
                        value: newVal
                    }
                )
            }
        }
    },

    methods: {
        async saveInfos() {
            try {
                await this.$store.dispatch('brainstormRoom/saveInfos')
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>
