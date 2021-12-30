export const state = () => ({
    listeners: {}
})

export const mutations = {
    ADD_LISTENER(state, payload) {
        state.listeners[payload.name] = payload.listener
    }
}

export const actions = {
    stopListener({ getters }, listenerName) {
        const listeners = getters['getListeners']

        if (listeners[listenerName]) {
            listeners[listenerName]()
        }
    }
}

export const getters = {
    getListeners: state => state.listeners
}
