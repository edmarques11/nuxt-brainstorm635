export const state = () => ({
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
    }
}

export const actions = {
    saveNewIdeas({ getters }) {
        const newIdeas = getters['getNewIdeas']
    }
}

export const getters = {
    getNewIdeas: state => state.newIdeas,
    getOldIdeas: state => state.getOldIdeas
}
