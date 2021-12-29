import getCurrenteUserInfo from "~/libs/getCurrentUser"

export const actions = {
    async getUserInfo() {
        try {
            const {
                displayName,
                email,
                photoURL,
                uid
            } = await getCurrenteUserInfo(this.$firebase)

            return { displayName, email, photoURL, uid }
        } catch (error) {
            throw error
        }

    }
}
