const workDemo2 = {
    path: 'workDemo2',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('useModule/System/workDemo2/workDemo2').default)
        }, 'use/System/workDemo2')
    }
}

export default workDemo2;