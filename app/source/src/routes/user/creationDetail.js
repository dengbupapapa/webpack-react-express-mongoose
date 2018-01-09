const creationDetail = {
    path: 'creation/detail',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('@uses/user/creationDetail/creationDetail.jsx').default)
        }, 'uses/user/creationDetail')
    }
}

export default creationDetail;