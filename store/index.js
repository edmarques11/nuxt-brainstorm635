import firebase from 'firebase/app'
import { codeGenerator, pushToBrainstorm } from '~/libs/helpFunctions'

export const actions = {
    async createNewBrainstorm({ dispatch }) {
        let success = false
        const brainstormId = codeGenerator(6)
        try {
            const { displayName, photoURL, uid } = await dispatch('user/getUserInfo')
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

            const { displayName, photoURL, uid } = await dispatch('user/getUserInfo')

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
    }
}
