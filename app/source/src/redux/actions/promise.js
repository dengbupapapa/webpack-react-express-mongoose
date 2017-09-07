/*
 *  p1 action ispromise
 */
export const sendPromiseAction = ({
    action
}, ...opts) => {

    return fetch(opts)
        .then(response => action(response.json()))

};

//p2 action.payload ispromise

export const sendPromisePayloadAction = (type, ...opts) => ({
    type: type,
    payload: fetch(opts)
        .then(response => action(response.json()))
})

//感觉目前用了redux－thunk就用不上这个玩意了（ps：可能还没想到场景，哈哈） 有兴趣可以去看下源码了解下/node_modules/redux-promise/lib/index.js