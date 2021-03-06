import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import rootReducer from '@reducers/index';

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import DevTools from './devTools';
import log from '@middlewares/logger.js';
import localStorageMde from '@middlewares/localStorageMde.js';

let applyMiddlewares = [thunk, promiseMiddleware, localStorageMde];

if (process.env.NODE_ENV == 'development') {
    applyMiddlewares.push(log);
}

let composes = [applyMiddleware(...applyMiddlewares)];

if (process.env.NODE_ENV == 'development') {
    composes.push(DevTools.instrument());
}

const enhancer = compose(...composes);

export default initialState => {
    //注意：仅仅只有redux>=3.1.0支持第三个参数
    let store = createStore(rootReducer, initialState, enhancer);

    //热替换选项
    if (module.hot) {
        module.hot.accept('@reducers/index', () => {
            const nextReducer = require('@reducers/index').default
            store.replaceReducer(nextReducer)
        })
    }

    return store

}