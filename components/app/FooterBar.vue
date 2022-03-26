<template>
    <v-footer
        absolute
        app
        tile
        elevation="3"
        color="#fff"
        class="border-footer"
        :class="{
            'footer-height-mobile': $vuetify.breakpoint.xs,
            'footer-height-sm': $vuetify.breakpoint.sm,
            'footer-height-desktop': $vuetify.breakpoint.mdAndUp,
        }"
    >
        <v-container
            fluid
            class="py-0 px-5"
        >
            <v-row v-if="$vuetify.breakpoint.smAndDown" justify="center" align="center">
                <v-col cols="12" class="text-center">
                    <v-btn
                        v-for="icon in icons"
                        :key="icon.icon"
                        class="mx-4 increase-btn"
                        icon
                    >
                        <a :href="icon.link" target="_blank" class=" text-decoration-none">
                        <v-icon 
                            color="primary" size="28px">
                            {{ icon.icon }}
                        </v-icon>
                        </a>
                    </v-btn>
                </v-col>
            </v-row>

            <v-divider v-if="$vuetify.breakpoint.smAndDown" />

            <v-row
                :justify="$vuetify.breakpoint.xs ? 'center' : 'space-around'"
                align="center"
                no-gutters
            >
                <v-col
                    cols="12"
                    sm="4"
                    :class="$vuetify.breakpoint.xs ? 'text-center' : ''"
                >
                    <v-card-text class="pb-xs-0 px-0">
                        <span> &copy; CopyLeft</span>
                        <span> <strong> 2020 - 2022 </strong></span>
                    </v-card-text>
                </v-col>

                <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="4" class="text-center">
                    <v-btn
                        v-for="icon in icons"
                        :key="icon.icon"
                        class="mx-4 increase-btn"
                        icon
                    >
                        <a :href="icon.link" target="_blank" class="text-decoration-none">
                            <v-icon 
                                color="primary" size="28px">
                                {{ icon.icon }}
                            </v-icon>
                        </a>
                    </v-btn>
                </v-col>

                <v-col
                    cols="12" sm="4"
                    :class="$vuetify.breakpoint.xs ? 'text-center' : 'd-flex justify-end'"
                >
                    <img width="210" src="@/assets/img/logo-footer-transparent.png" alt="Brainstorm logo" />
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: 'FooterBar',

    data () {
        return {
            icons: [
                { icon: 'mdi-github', link: 'https://github.com/rafaelramos64' },
                { icon: 'mdi-email', link: 'mailto:<rafaelramos64@protonmail.com>' },
                { icon: 'mdi-linkedin', link: 'https://www.linkedin.com/in/rafael-ramos64' },
            ],
       } 
    },
}
</script>

<style scoped lang="scss">
@import '../../assets/variables.scss';

.increase-btn:hover {
    transform: scale(1.1) !important;
    & .v-icon {
        color: $secondary !important;
    }
}

.v-card__text {
    font-size: 1.1rem !important;
}

.footer-height-desktop {
    height: 80px !important;
}

.footer-height-sm {
    height: 100px !important;
}

.footer-height-mobile {
    height: 150px !important;
}
</style>