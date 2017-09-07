const login = {
    path: 'login',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('useModule/login/login').default)
        }, 'use/login')
    }
}

export default login;