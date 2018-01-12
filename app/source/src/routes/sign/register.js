const register = {
    path: 'register',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('@uses/sign/register/register.jsx').default)
        }, 'use/register')
    }
}

export default register;