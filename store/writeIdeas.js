import { codeGenerator, getColor } from '~/libs/helpFunctions.js'

export const state = () => ({
    indexSheet: 0,
    newIdeas: {
        idea1: {
            description: '',
            id: '',
            idContinueIdea: ''
        },
        idea2: {
            description: '',
            id: '',
            idContinueIdea: ''
        },
        idea3: {
            description: '',
            id: '',
            idContinueIdea: ''
        }
    },
    oldIdeas: []
})

export const mutations = {
    SET_IDEA(state, { field, data }) {
        Object.assign(state.newIdeas[field], data)
    },
    SET_IDEAS(state, payload) {
        Object.assign(state.newIdeas, payload)
    },
    SET_INDEX_SHEET(state, payload) {
        state.indexSheet = payload
    },
    SET_OLD_IDEAS(state, payload) {
        state.oldIdeas = payload
    }
}

export const actions = {
    async saveNewIdeas({ getters, rootGetters, dispatch }, roundSaveIdeas) {
        try {
            const indexSheet = getters['getIndexSheet']
            const { currentRound, brainstormId } = rootGetters['brainstorm/getBrainstorm']

            roundSaveIdeas = roundSaveIdeas || currentRound

            const currentUser = await dispatch('user/getUserInfo', null, { root: true })

            const organizedIdeas = await dispatch('organizeIdeasForSave', currentUser)
            console.log('>>>>>>>>', organizedIdeas)

            organizedIdeas.owner = currentUser.uid

            if (Object.keys(organizedIdeas).length !== 0 && indexSheet >= 0) {
                const sheet = 'sheet' + (indexSheet + 1)
                const dataSheet = { [`round${roundSaveIdeas}`]: organizedIdeas }

                const database = this.$firebase.firestore().collection('brainstorms').doc(brainstormId)

                await database.collection('sheets').doc(sheet).set(dataSheet, { merge: true })
            }
        } catch (error) {
            throw error
        }
    },

    async chooseSheet({ commit, dispatch, rootGetters }) {
        try {
            const { currentRound, listGuests } = rootGetters['brainstorm/getBrainstorm']
            const currentUser = await dispatch('user/getUserInfo', null, { root: true })

            const myPositon = listGuests.findIndex((guest) => guest.uid === currentUser.uid)

            let indexSheet = null
            if (currentRound === 1) {
                indexSheet = myPositon
            } else {
                indexSheet = myPositon + 1 - currentRound
                if (indexSheet < 0) {
                    indexSheet = listGuests.length + indexSheet
                }
            }

            commit('SET_INDEX_SHEET', indexSheet)
        } catch (error) {
            throw error
        }
    },

    organizeIdeasForSave({ getters, rootGetters }, currentUser) {
        try {
            const newIdeas = JSON.parse(JSON.stringify(getters['getNewIdeas']))
            const listGuests = rootGetters['brainstorm/getListGuests']

            for (const campo in newIdeas) {
                if (Object.prototype.hasOwnProperty.call(newIdeas[campo], 'id')) {
                    newIdeas[campo].id = codeGenerator(8)
                    newIdeas[campo].color = getColor(currentUser.uid, listGuests)
                }
                if (!newIdeas[campo].description) {
                    delete newIdeas[campo]
                }
            }

            const organizedIdeas = {}
            let countIdea = 0

            for (const idea in newIdeas) {
                if (idea) {
                    organizedIdeas[`idea${countIdea + 1}`] = newIdeas[idea]
                    countIdea++
                }
            }
            return organizedIdeas
        } catch (error) {
            throw error
        }
    },

    async organizeIdeasForRender({ }, data) {
        const organizedIdeas = []
        for (const index in Object.keys(data)) {
            const round = data[`round${Number(index) + 1}`]

            if (round) {
                delete round.owner

                const ideas = []
                for (const idx in Object.keys(round)) {
                    ideas.push(round[`idea${Number(idx) + 1}`])
                }

                if (ideas.length > 0)
                    organizedIdeas.push(ideas)
            }
        }
        return organizedIdeas
    },

    async getOldIdeas({ commit, getters, rootGetters, dispatch }) {
        try {
            const indexSheet = getters['getIndexSheet']
            const { brainstormId, currentRound } = rootGetters['brainstorm/getBrainstorm']

            if (currentRound < 2) return

            const sheet = 'sheet' + (indexSheet + 1)

            const docSheet = this.$firebase.firestore()
                .collection('brainstorms')
                .doc(brainstormId)
                .collection('sheets').doc(sheet)

            const doc = await docSheet.get()
            const data = doc.data()

            delete data.owner

            const organizedIdeas = await dispatch('organizeIdeasForRender', data)
            commit('SET_OLD_IDEAS', organizedIdeas)
        } catch (error) {
            throw error
        }
    },

    async changeRound({ rootGetters }) {
        try {
            const codeRoom = rootGetters['brainstorm/getBrainstormId']
            const newRound = Number(rootGetters['brainstorm/getCurrentRound']) + 1

            await this.$firebase
                .firestore()
                .collection('brainstorms')
                .doc(codeRoom)
                .update({
                    currentRound: newRound,
                    hourOfStartRound: new Date()
                })
        } catch (err) {
            console.error(err)
        }
    }
}

export const getters = {
    getNewIdeas: state => state.newIdeas,
    getOldIdeas: state => state.oldIdeas,
    getIndexSheet: state => state.indexSheet
}
