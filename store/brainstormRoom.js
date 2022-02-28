import firebase from 'firebase/app'

export const state = () => ({})

export const mutations = {}

export const actions = {
    async saveInfos({ rootGetters }) {
        try {
            const {
                description,
                roundsTime,
                brainstormId,
                running,
                currentRound
            } = rootGetters['brainstorm/getBrainstorm']

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

    async createSheet({ rootGetters, dispatch }) {
        try {
            const { listGuests, brainstormId } = rootGetters['brainstorm/getBrainstorm']
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

export const getters = {}
