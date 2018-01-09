const signIn = {
    path: 'in',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('@uses/sign/signIn/signIn.jsx').default)
        }, 'use/signIn')
    }
}

export default signIn;