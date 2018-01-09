const sign = {
    path: 'sign',
    indexRoute: {
        onEnter(nextState, replace) {
            replace('/error');
        }
    },
    // getComponent(nextState, callback) {
    //     require.ensure([], (require) => {
    //         callback(null, require('sModule/public/common/headFoot').default)
    //     }, 'common/headFoot')
    // },
    childRoutes: [
        require('@routes/sign/signIn').default,
        require('@routes/sign/signUp').default,
    ]
}

export default sign