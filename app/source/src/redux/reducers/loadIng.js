import {
    // SEND_ASYNC_ACTION,
    LOAD_ING_ACTION
} from '@Actions/loadIng';

export const loadIngAction = (open = false, action) => {
    switch (action.type) {
        case LOAD_ING_ACTION:
            return action.open;
        default:
            return open;
    }
}