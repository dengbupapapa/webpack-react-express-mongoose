import {
    SET_LOGIN_ACTIVE
} from '@Actions/login'

export const login = (index = 0, action) => {
    switch (action.type) {
        case SET_LOGIN_ACTIVE:
            return action.index;
        default:
            return index;
    }
}