export function getCurrentUserInfo(firebase) {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
        })
    })
}

export function codeGenerator(length = 6) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }

    return result
}

export function pushToBrainstorm(router, brainstormId) {
    router.push({
        name: 'brainstorm-id',
        params: { id: brainstormId }
    })
}
