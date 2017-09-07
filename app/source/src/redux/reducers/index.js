import {
    combineReducers
} from 'redux'

import {
    login
} from './login';

import {
    workDemo
} from './workDemo';

import {
    // sendAsyncAction,
    loadIngAction
} from './loadIng';

const combineReducersApp = combineReducers({
    login,
    workDemo,
    // sendAsyncAction,
    loadIngAction
})

export default combineReducersApp