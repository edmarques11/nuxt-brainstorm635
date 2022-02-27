import firebase from 'firebase/app'

export const state = () => ({
    brainstormId: ''
})

export const mutations = {
    SET_STATE(state, { field, data }) {
        state[field] = data
    }
}

export const actions = {
    async saveInfos({ getters }) {
        try {
            const {
                description,
                roundsTime,
                brainstormId,
                running,
                currentRound
            } = getters['getBrainstormInfos']

            const database = this.$firebase.firestore().collection('brainstorms').doc(brainstormId)

            await database.update({
                description,
                roundsTime,
                running,
                currentRound,
                updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            })
        } catch (error) {
            throw error
        }
    },

    async getRoomInfos({ commit, getters, dispatch }) {
        try {
            const brainstormId = getters['getBrainstormInfos'].brainstormId

            const db = this.$firebase.firestore()
            const listenerGetRoomInfos = db.collection('brainstorms')
                .doc(brainstormId)
                .onSnapshot(doc => {
                    if (!doc.exists) {
                        listenerGetRoomInfos()
                        throw new Error('The Brainstorm not exist!')
                    }

                    const data = doc.data()

                    commit('brainstorm/SET_STATE', {
                        listGuests: data.listGuests,
                        description: data.description,
                        currentRound: data.currentRound,
                        running: data.running,
                        roundsTime: data.roundsTime,
                        listGuests: data.listGuests,
                        leader: data.leader
                    }, { root: true })
                })

            commit('listeners/ADD_LISTENER', {
                name: 'listenerGetRoomInfos',
                listener: listenerGetRoomInfos
            }, { root: true })
        } catch (error) {
            throw error
        }
    },

    async createSheet({ getters, dispatch }) {
        try {
            const { listGuests, brainstormId } = getters['getBrainstormInfos']
            const currentUser = await dispatch('user/getUserInfo', {}, { root: true })

            const indexUser = listGuests.findIndex(guest => {
                return guest.uid === currentUser.uid
            })

            const dataSheet = {
                owner: currentUser.uid
            }
            const sheet = 'sheet' + (indexUser + 1)

            const brainstorm = this.$firebase.
                firestore()
                .collection('brainstorms')
                .doc(brainstormId)

            await brainstorm.collection('sheets').doc(sheet).set(dataSheet, { merge: true })
        } catch (error) {
            throw error
        }
    }
}

export const getters = {
    getBrainstormInfos: (state, getters, rootState, rootGetters) => {
        const brainstormId = state.brainstormId

        const {
            roundsTime,
            description,
            listGuests,
            currentRound,
            running
        } = rootGetters['brainstorm/getBrainstorm']

        return {
            brainstormId,
            roundsTime,
            description,
            listGuests,
            currentRound,
            running
        }
    }
}
