<template>
    <v-layout>
        <v-row>
            <v-col cols="12" sm="4">
                <!-- <p class="mb-0">
                    Theme/Description <span class="red--text">*</span>
                </p> -->
                <v-text-field
                    v-model="description"
                    hide-details
                    dense
                    outlined
                    label="Theme/Description"
                    placeholder="Brainstorm desciption"
                    :disabled="!isLeader"
                    @blur="saveInfos()"
                    prepend-inner-icon="mdi-clipboard-text-outline"
                />
            </v-col>
            <v-col cols="12" sm="3">
                <!-- <p class="mb-0">Rounds Time <span class="red--text">*</span></p> -->

                <v-select
                    v-model="roundsTime"
                    outlined
                    dense
                    :items="times"
                    label="Rounds Time"
                    :disabled="!isLeader"
                    prepend-inner-icon="mdi-clock-outline"
                />
            </v-col>
            <v-col cols="12" sm="3">
                <!-- <p class="mb-0">Brainstorm code</p> -->
                
                <v-layout>
                    <v-text-field
                        v-model="brainstormId"
                        hide-details
                        outlined
                        disabled
                        filled
                        dense
                        label="Brainstorm Code"
                        prepend-inner-icon="mdi-lock-outline"
                    />
                    <v-tooltip top outlined color="primary">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                elevation="0"
                                v-bind="attrs"
                                v-on="on"
                                class="copy-button mr-0"
                                @click.stop.prevent="copyCodeToClipboad(brainstormId)"
                            >
                                <v-icon dark>
                                    mdi-content-copy
                                </v-icon>
                            </v-btn>
                        </template>
                        Copy code
                    </v-tooltip>
                </v-layout>
            </v-col>
            <v-col cols="12" sm="2">
                <!-- <p class="mb-0">Active members</p> -->

                <v-text-field
                    v-model="countMembers"
                    hide-details
                    outlined
                    disabled
                    filled
                    dense
                    label="Active members"
                    prepend-inner-icon="mdi-account-group"
                />
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
import Swal from 'sweetalert2'

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

    data: () => ({
        times: [
            { value: '3:00', text: '3:00 min' },
            { value: '4:00', text: '4:00 min' },
            { value: '5:00', text: '5:00 min' },
            { value: '6:00', text: '6:00 min' },
            { value: '10:00', text: '10:00 min' },
        ]
    }),

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
                        data: newVal,
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
        codeSelect () {
            const copyText = document.getElementById('copyCode')
            copyText.select()
            copyText.setSelectionRange(0, 99999) /* For mobile devices */
        },

        async copyCodeToClipboad (text) {
            if (process.client) {
                try {
                    await this.$copyText(text)
                    
                    Swal.fire({
                        title: 'Code copied!',
                        text: 'You cant alread sent it to your friends!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#3BB5E0',
                        timer: 1200
                    })
                } catch (err) {
                    console.error(err)
                }
            }
        },

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

<style scoped lang="scss">
@import '../assets/variables.scss';

.copy-button {
    border: none !important;
    padding: 0 !important;
    background-color: #fff !important;
    color: $primary !important;
}
.copy-button:hover {
    background-color: #fff !important;
    box-shadow: none !important;
}
.copy-button:focus {
    background-color: #fff !important;
    border: none !important;
    box-shadow: none !important;
}
</style>