import firebase from 'firebase/app'
import { codeGenerator, pushToBrainstorm } from '~/libs/helpFunctions'

export const state = () => ({
    brainstormDate: '',
    concluded: false,
    currentRound: 0,
    description: '',
    hourOfStartRound: '',
    leader: '',
    listFinishWriteIdeas: [],
    listGuests: [{
        displayName: '',
        photoURL: '',
        uid: ''
    }],
    roundsTime: '5:00',
    running: false
})

export const mutations = {
    SET_BRAINSTORM_STATE(state, { field, data }) {
        state[field] = data
    },
    SET_STATE(state, payload) {
        Object.assign(state, payload)
    }
}

export const actions = {
    async createNewBrainstorm({ dispatch }) {
        let success = false
        const brainstormId = codeGenerator(6)
        try {
            const { displayName, photoURL, uid } = await dispatch('user/getUserInfo', {}, { root: true })
            const user = {
                displayName,
                photoURL,
                uid
            }

            await this.$firebase
                .firestore()
                .collection('brainstorms')
                .doc(brainstormId.toString())
                .set({
                    roundsTime: '5:00',
                    running: false,
                    leader: user.uid,
                    description: 'Brainstorm description',
                    listGuests: [user],
                    currentRound: 0,
                    brainstormDate: firebase.firestore.FieldValue.serverTimestamp()
                })

            success = true
        } catch (error) {
            throw error
        } finally {
            if (success) {
                pushToBrainstorm(this.$router, brainstormId)
            }
        }
    },

    async joinInBrainstorm({ dispatch }, codeRoom) {
        if (!codeRoom) return

        codeRoom = codeRoom.trim()
        codeRoom = codeRoom.toUpperCase()

        const brainstorm = this.$firebase
            .firestore()
            .collection('brainstorms')
            .doc(codeRoom)

        let success = false
        try {
            const doc = await brainstorm.get()

            if (!doc.exists) {
                throw new Error('Brainstorm not existent!')
            }

            const { displayName, photoURL, uid } = await dispatch('user/getUserInfo', {}, { root: true })

            const userGuest = { displayName, photoURL, uid }

            const userAlreadyExists = doc.data().listGuests
                .find(user => user.uid === userGuest.uid)

            if (userAlreadyExists) {
                return pushToBrainstorm(this.$router, codeRoom)
            }

            if (doc.data().listGuests.length > 6) {
                throw new Error('The Brainstorm is full!')
            }

            await brainstorm.update({
                updated_at: firebase.firestore.FieldValue.serverTimestamp(),
                listGuests: firebase.firestore.FieldValue.arrayUnion(userGuest)
            })

            success = true
        } catch (error) {
            throw error
        } finally {
            if (success) {
                pushToBrainstorm(this.$router, codeRoom)
            }
        }
    },

    verifyRunningAndStop({ getters, rootGetters }) {
        const { running, currentRound } = getters['getBrainstorm']
        const { brainstormId } = rootGetters['brainstormRoom/getBrainstormInfos']
        const currentRouteName = this.$router.currentRoute.name

        if (!running && currentRouteName !== 'brainstorm-id') {
            return this.$router.push({ path: `/brainstorm/${brainstormId}` })
        }

        if (running && currentRouteName !== 'brainstorm-id-roundId') {
            return this.$router.push({ path: `/brainstorm/${brainstormId}/round${currentRound}` })
        }
    },

    async getBrainstormInfos({ commit, getters }, localListener) {
        try {
            const brainstormId = getters['getBrainstormInfos'].brainstormId

            const db = this.$firebase.firestore()
            const listenerInfos = db.collection('brainstorms')
                .doc(brainstormId)
                .onSnapshot(doc => {
                    if (!doc.exists) {
                        listenerInfos()
                        throw new Error('The Brainstorm not exist!')
                    }

                    const data = doc.data()

                    commit('brainstorm/SET_STATE', data, { root: true })
                })

            commit('listeners/ADD_LISTENER', {
                name: localListener,
                listener: listenerInfos
            }, { root: true })
        } catch (error) {
            throw error
        }
    },
}

export const getters = {
    getBrainstorm: state => state,
    getListGuests: state => state.listGuests,
    leader: state => state.leader,
    getListFinishWriteIdeas: state => state.listFinishWriteIdeas
}
