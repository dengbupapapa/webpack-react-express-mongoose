const RouterRedirectErrer = {
    path: '*',
    onEnter: (_, replaceState) => replaceState("/errer")
}

export default RouterRedirectErrer;