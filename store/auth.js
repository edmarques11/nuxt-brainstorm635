export const state = () => ({
    auth: {}
})

export const mutations = {
    setAuth(state, payload) {
        state.auth = payload
    }
}

export const actions = {
    async login({ commit }) {
        try {
            const {
                getAuth,
                signInWithPopup,
                GoogleAuthProvider
            } = this.$firebase.providers

            const auth = getAuth()
            const provider = new GoogleAuthProvider()

            const result = await signInWithPopup(auth, provider)

            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user

            commit('setAuth', { token, ...user })
        } catch (error) {
            console.error(error)
        }
    }
}
