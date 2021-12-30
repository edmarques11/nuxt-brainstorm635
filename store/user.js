import { getCurrentUserInfo } from "~/libs/helpFunctions"

export const actions = {
    async getUserInfo() {
        try {
            const {
                displayName,
                email,
                photoURL,
                uid
            } = await getCurrentUserInfo(this.$firebase)

            return { displayName, email, photoURL, uid }
        } catch (error) {
            throw error
        }

    }
}
