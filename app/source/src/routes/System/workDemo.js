const workDemo = {
    path: 'workDemo',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('useModule/System/workDemo/workDemo').default)
        }, 'use/System/workDemo')
    }
}

export default workDemo;