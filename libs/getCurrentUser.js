export default function getCurrenteUserInfo(firebase) {
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
