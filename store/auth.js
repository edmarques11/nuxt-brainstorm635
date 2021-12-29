export const state = () => ({
    token: ''
})

export const mutations = {
    SET_TOKEN(state, payload) {
        state.token = payload
    }
}

export const actions = {
    async login({ commit }) {
        const provider = new this.$firebase.auth.GoogleAuthProvider();

        let success = false
        this.$firebase.auth().signInWithPopup(provider)
            .then(async ({ user: { refreshToken } }) => {
                commit('SET_TOKEN', refreshToken)
                success = true
                this.$cookies.set('Authorization', refreshToken)
            }).catch(() => { }).finally(() => {
                success ? this.$router.push('/') : ''
            })

    },

    async logout() {
        try {
            await this.$firebase.auth().signOut()

            const allCookies = this.$cookies.keys()
            if (Array.isArray(allCookies) && allCookies.length > 0)
                allCookies.forEach(key => this.$cookies.remove(key))
        } catch (error) { }
    }
}

export const getters = {
    getToken: state => state.token
}
