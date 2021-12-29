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
            }).catch((error) => { throw error }).finally(() => {
                success ? this.$router.push('/') : ''
            })

    },

    async logout({ commit }) {
        let success = false
        try {
            await this.$firebase.auth().signOut()

            const allCookies = await this.$cookies.keys()
            if (allCookies && allCookies.length > 0) {
                allCookies.forEach(key => this.$cookies.remove(key))
            }

            commit('SET_TOKEN', '')
            success = true
        } catch (error) {
            throw error
        } finally {
            if (success) this.$router.push('/login')
        }
    }
}

export const getters = {
    getToken: state => state.token
}
