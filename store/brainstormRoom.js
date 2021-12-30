import firebase from 'firebase/app'

export const state = () => ({
    brainstormInfos: {
        brainstormId: '',
        roundsTime: '5:00',
        description: null,
        listGuests: [],
        isLeader: false,
        currentRound: 1,
        running: false
    }
})

export const mutations = {
    SET_BRAINSTORM_INFOS(state, payload) {
        Object.assign(state.brainstormInfos, payload)
    },
    SET_BRAINSTORM_INFOS_FIELD(state, { field, value }) {
        state.brainstormInfos[field] = value
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
            const currentUser = await dispatch('user/getUserInfo',{}, { root: true })

            const db = this.$firebase.firestore()
            const listenerGetRoomInfos = db.collection('brainstorms')
                .doc(brainstormId)
                .onSnapshot(doc => {
                    if (!doc.exists) {
                        listenerGetRoomInfos()
                        throw new Error('The Brainstorm not exist!')
                    }

                    const data = doc.data()

                    commit('SET_BRAINSTORM_INFOS', {
                        listGuests: data.listGuests,
                        description: data.description,
                        currentRound: data.currentRound,
                        running: data.running,
                        roundsTime: data.roundsTime,
                        isLeader: data.leader === currentUser.uid
                    })
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
            const currentUser = await dispatch('user/getUserInfo',{}, { root: true })

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
    getBrainstormInfos: state => state.brainstormInfos
}
