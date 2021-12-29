export default function ({ app, $cookies, redirect, store }) {
    if (process.client) {
        app.router.beforeEach((to, from, next) => {
            const token = $cookies.get('Authorization') || store.getters['auth/getToken']

            if (token) {
                if (to.path === '/login') {
                    redirect('/')
                }
                next()
            } else {
                if (to.path !== '/login') {
                    redirect('/login')
                }
                next()
            }
            next()
        })
    }
    if (process.server) {
        app.router.beforeEach((to, from, next) => {
            next()
        })
    }
}
