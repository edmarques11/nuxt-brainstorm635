export const state = () => ({
    listeners: []
})

export const mutations = {
    ADD_LISTENER(state, payload) {
        state.listeners.push(payload)
    }
}

export const actions = {
    stopListener({ getters }, listenerName) {
        const listeners = getters['getListeners']

        const listener = listeners.find(lis => lis.name === listenerName)

        if (listener) {
            console.log('Destriu o listener')
            listener.stop()
        }
    }
}

export const getters = {
    getListeners: state => state.listeners
}
