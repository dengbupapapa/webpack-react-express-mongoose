const routes = {
    path: '/',
    // onLeave(...a) {
    //         console.log(a);
    //     },
    indexRoute: {
        // getComponent(nextState, callback) {
        //     require.ensure([], (require) => {
        //         callback(null, require('@uses/index/index').default)
        //     }, 'uses/index')
        // },
        onEnter(nextState, replace) {
            replace('/user/creation/list');
        }
    },
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('@widgets/headFoot/headFoot.js').default)
        }, 'common/headFoot')
    },
    childRoutes: [
        require('@routes/user').default,
        require('@routes/sign').default,
        require('@routes/error').default,
        require('@routes/redirectError').default
    ]
}

export default routes