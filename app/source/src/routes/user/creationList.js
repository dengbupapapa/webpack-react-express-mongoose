const creationList = {
    path: 'creation/list',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('@uses/user/creationList/creationList.jsx').default)
        }, 'uses/user/creationList')
    }
}

export default creationList;