import { getCurrentUserInfo } from '~/libs/helpFunctions'

export const state = () => ({
    displayName: '',
    email: '',
    photoURL: '',
    uid: ''
})

export const mutations = {
    SET_USER_STATE(state, payload) {
        Object.assign(state, payload)
    }
}

export const actions = {
    async getUserInfo() {
        try {
            const {
                displayName,
                email,
                photoURL,
                uid
            } = await getCurrentUserInfo(this.$firebase)
            
            return {
                displayName,
                email,
                photoURL,
                uid
            }
        } catch (error) {
            throw error
        }
    },

    async setUserInfoState({ commit, dispatch }) {
        try {
            const dataUser = await dispatch('getUserInfo')
            commit('SET_USER_STATE', dataUser)
        } catch (error) {
            throw error
        }
    }
}

export const getters = {
    getUserData: state => state,
    getUid: state => state.uid
}
