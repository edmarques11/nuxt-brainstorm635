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
    oldIdeas: {}
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
    }
}

export const actions = {
    async saveNewIdeas({ getters, rootGetters, dispatch }) {
        try {
            const indexSheet = getters['getIndexSheet']
            const organizeIdeasForSave = getters['organizeIdeasForSave']
            const { currentRound } = rootGetters['brainstorm/getBrainstorm']

            const currentUser = await dispatch('user/getUserInfo', null, { root: true })

            const organizedIdeas = await organizeIdeasForSave(currentUser)
            organizedIdeas.owner = currentUser.uid

            if (Object.keys(organizedIdeas).length !== 0 && indexSheet >= 0) {
                const sheet = 'sheet' + (indexSheet + 1)
                const dataSheet = { [currentRound]: organizedIdeas }

                const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)

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
}

export const getters = {
    getNewIdeas: state => state.newIdeas,
    getOldIdeas: state => state.oldIdeas,
    getIndexSheet: state => state.indexSheet,
    organizeIdeasForSave: (state, getters, rootState, rootGetters) => (currentUser) => {
        try {
            const newIdeas = state.newIdeas
            const listGuests = rootGetters['brainstorm/getListGuests']

            for (const campo in state.newIdeas) {
                if (Object.prototype.hasOwnProperty.call(newIdeas[campo], 'id')) {
                    newIdeas[campo].id = codeGenerator(8)

                    newIdeas[campo].color = getColor(currentUser.uid, listGuests)
                }
                if (!newIdeas[campo].description) { delete newIdeas[campo] }
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
    }
}
