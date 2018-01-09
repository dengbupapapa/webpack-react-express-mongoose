const signUp = {
    path: 'up',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('@uses/sign/signUp/signUp.jsx').default)
        }, 'use/signUp')
    }
}

export default signUp;