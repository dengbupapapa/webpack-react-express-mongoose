const index = {
    path: 'index',
    indexRoute: {
        getComponent(nextState, callback) {
            require.ensure([], (require) => {
                callback(null, require('useModule/System/workIndex/workIndex').default)
            }, 'use/System/workIndex')
        },
    },
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('widModule/Common/Common').default)
        }, 'widget/Common')
    },
    childRoutes: [
        require('./workDemo').default,
        require('./workDemo2').default,
        require('./upload').default
    ]
}

export default index;