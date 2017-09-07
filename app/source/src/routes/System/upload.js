const upload = {
    path: 'upload',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('useModule/System/upload/upload').default)
        }, 'use/System/upload')
    }
}

export default upload;