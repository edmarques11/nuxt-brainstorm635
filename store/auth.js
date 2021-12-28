export const actions = {
    async login() {
        try {
            const provider = new this.$firebase.auth.GoogleAuthProvider();

            this.$firebase.auth().signInWithPopup(provider).then((result) => {
                this.$cookies.set('Authorization', result.user.refreshToken)
                this.$router.push('/')
            })
        } catch (error) {
            console.error(error)
        }
    },

    async logout() {
        try {
            await this.$firebase.auth().signOut()

            const allCookies = this.$cookies.keys()
            if (Array.isArray(allCookies) && allCookies.length > 0)
                allCookies.forEach(key => this.$cookies.remove(key))
        } catch (error) { }
    }
}
