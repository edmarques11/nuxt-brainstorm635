<template>
    <v-layout>
        <v-row>
            <v-col cols="12" sm="4" md="3">
                <p class="mb-0">
                    Theme/Description <span class="red--text">*</span>
                </p>
                <v-text-field
                    v-model="description"
                    hide-details
                    placeholder="Brainstorm desciption"
                    class="css-input-border m-0"
                    :disabled="!isLeader"
                    @blur="saveInfos()"
                />
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <p class="mb-0">Rounds time <span class="red--text">*</span></p>
                <div class="css-information-area">{{ roundsTime }}</div>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <p class="mb-0">Brainstorm code</p>
                <div class="css-information-area">
                    {{ brainstormId }}
                </div>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <p class="mb-0">Active members</p>
                <div class="css-information-area">{{ countMembers }}</div>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
export default {
    name: 'BrainstormInfo',

    props: {
        isLeader: {
            type: Boolean,
            default: false
        },
        brainstormId: {
            type: String,
            default: ''
        },
    },

    computed: {
        countMembers() {
            return this.$store.getters['brainstorm/getListGuests'].length
        },
        description: {
            get() {
                return this.$store.getters['brainstorm/getBrainstorm']
                    .description
            },
            set(newVal) {
                this.$store.commit(
                    'brainstorm/SET_BRAINSTORM_STATE',
                    {
                        field: 'description',
                        data: newVal
                    }
                )
            }
        },
        roundsTime: {
            get() {
                return this.$store.getters['brainstorm/getBrainstorm']
                    .roundsTime
            },
            set(newVal) {
                this.$store.commit(
                    'brainstorm/SET_BRAINSTORM_STATE',
                    {
                        field: 'roundsTime',
                        data: newVal
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
