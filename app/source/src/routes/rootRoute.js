const routes = {
    path: '/',
    // onLeave(...a) {
    //         console.log(a);
    //     },
    //     onEnter(...a) {
    //         console.log(a);
    //     },
    indexRoute: {
        getComponent(nextState, callback) {
            require.ensure([], (require) => {
                callback(null, require('useModule/index/index').default)
            }, 'use/index')
        },
    },
    // getComponent(nextState, callback) {
    //     require.ensure([], (require) => {
    //         callback(null, require('sModule/public/common/headFoot').default)
    //     }, 'common/headFoot')
    // },
    childRoutes: [
        require('./login').default,
        require('./System/index').default,
        require('./RouterErrer').default,
        require('./RouterRedirectErrer').default
    ]
}

export default routes