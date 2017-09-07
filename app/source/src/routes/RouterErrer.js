const errer = {
    path: 'errer',
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
            callback(null, require('useModule/errer/errer').default)
        }, 'use/errer')
    }
}

export default errer;