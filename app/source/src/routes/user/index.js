const user = {
    path: 'user',
    indexRoute: {
        onEnter(nextState, replace) {
            replace('/error');
        }
    },
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('@widgets/userContainer').default)
        }, 'widget/userContainer')
    },
    childRoutes: [
        require('@routes/user/creationList').default,
        require('@routes/user/creationDetail').default
    ]
}

export default user