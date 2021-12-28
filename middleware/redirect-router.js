export default function ({ app, route, redirect }) {
    const routes = app.router.options.routes.map(route => route.name)

    if (!routes.includes(route.name)) {
        redirect('/')
    }
}
