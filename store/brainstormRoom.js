import firebase from 'firebase/app'
import { getCurrentUserInfo } from '~/libs/helpFunctions'

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
            const { description, roundsTime, brainstormId } = getters['getBrainstormInfos']
            const database = this.$firebase.firestore().collection('brainstorms').doc(brainstormId)

            await database.update({
                description,
                roundsTime,
                updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            })
        } catch (error) {
            throw error
        }
    },

    async getRoomInfos({ commit, getters }) {
        try {
            const brainstormId = getters['getBrainstormInfos'].brainstormId
            const { uid } = await getCurrentUserInfo(this.$firebase)
            const currentUserId = uid

            const db = this.$firebase.firestore()
            const listenerGetRoomInfos = db.collection('brainstorms')
                .doc(brainstormId)
                .onSnapshot(doc => {
                    if (!doc.exists) {
                        throw new Error('The Brainstorm not exist!')
                    }

                    const data = doc.data()

                    commit('SET_BRAINSTORM_INFOS', {
                        listGuests: data.listGuests,
                        description: data.description,
                        currentRound: data.currentRound,
                        running: data.running,
                        roundsTime: data.roundsTime,
                        isLeader: data.leader === currentUserId
                    })
                })

            commit('listeners/ADD_LISTENER', {
                name: 'listenerGetRoomInfos',
                stop: listenerGetRoomInfos
            }, { root: true })
        } catch (error) {
            throw error
        }
    }
}

export const getters = {
    getBrainstormInfos: state => state.brainstormInfos
}
