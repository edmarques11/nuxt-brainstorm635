export function getCurrentUserInfo(firebase) {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user && user.uid) {
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

export function getColor(userId, guests) {
    const colors = [
        '#ADD8E6',
        '#83CF50',
        '#fbdf59',
        '#E67EB2',
        '#ED893B',
        '#3BB5E0'
    ]

    const colorIndex = guests.findIndex((user) => user.uid === userId)
    return colors[colorIndex]
}

/* Cores
    #ed477d
    #2e3737
    #2a6333
    #48aaa9
    #83cf50
    #642c95
    #fbdf59
    #e67eb2
    #2b80c4
    #ed893b
    #ed3833
*/
