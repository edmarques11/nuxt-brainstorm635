import VueCookies from 'vue-cookies'

VueCookies.config('20d')

export default function ({}, inject) {
    inject('cookies', VueCookies)
}
