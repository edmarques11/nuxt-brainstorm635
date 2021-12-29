import firebase from 'firebase/app'
import { codeGenerator } from '~/libs/CodeGenerate'

export const actions = {
    async createNewBrainstorm({ dispatch }) {
        const id = codeGenerator(6)
        const { displayName, photoURL, uid } = await dispatch('user/getUserInfo')
        const user = {
            displayName,
            photoURL,
            uid
        }

        this.$firebase
            .firestore()
            .collection('brainstorms')
            .doc(id.toString())
            .set({
                roundsTime: '5:00',
                running: false,
                leader: user.uid,
                description: 'Brainstorm description',
                listGuests: [user],
                currentRound: 0,
                brainstormDate: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                this.$router.push({ name: 'brainstorm', params: { id: id } })
            })
            .catch(error => {
                throw error
            })
    }
}
