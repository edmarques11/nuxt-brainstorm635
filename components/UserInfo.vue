<template>
    <div class="text-start">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="white"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="black--text elevation-0"
                >
                    <span>{{ currentUser.displayName }}</span
                    ><v-icon>{{
                        returnIconOpenCloseMenu(attrs['aria-expanded'])
                    }}</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in [
                        {
                            title: 'Profile',
                            action: () => {}
                        },
                        {
                            title: 'Sign Out',
                            action: () => singout()
                        }
                    ]"
                    :key="index"
                >
                    <v-list-item-title
                        class="css-item-menu"
                        @click="item.action"
                        >{{ item.title }}</v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: 'UserInfo',

    props: {
        currentUser: {
            type: Object,
            default: () => {}
        }
    },

    methods: {
        returnIconOpenCloseMenu(isOpen) {
            return `mdi-menu-${isOpen === 'true' ? 'up' : 'down'}`
        },
        async singout() {
            try {
                await this.$store.dispatch('auth/logout')
            } catch (error) {}
        }
    }
}
</script>

<style scoped>
.css-item-menu {
    cursor: pointer;
}
</style>
