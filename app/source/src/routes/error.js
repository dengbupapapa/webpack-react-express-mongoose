const error = {
    path: 'error',
    // getChildRoutes(partialNextState, cb) {
    //   require.ensure([], (require) => {
    //     cb(null, [
    //       require('./routes/result'),
    //       require('./routes/frequency')
    //     ])
    //   })
    // },

    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('@uses/error/error').default)
        }, 'uses/error')
    }
}

export default error;