import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    ssr: false,
    head: {
        titleTemplate: '%s - Ferramenta colaborativa de criatividade.',
        title: 'Brainstorm635.com',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/logo-transparent.png' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/main.css',
        '~/assets/customized.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/firebase' },
        { src: '~/plugins/vue-cookies' },
        { src: '~/plugins/auth-access' },
        { src: '~/plugins/clock' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: [
        '~/components',
        '~/components/app',
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        'nuxt-sweetalert2',
        'nuxt-clipboard',
    ],

    clipboard: {
        autoSetContainer: true,
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            light: true,
            themes: {
                light: {
                    primary: '#3bb5e0',
                    accent: colors.grey.lighten3,
                    secondary: '#4e4d4d',
                    info: colors.teal.darken1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    // Router configs
    router: {
        middleware: ['redirect-router']
    }
}
