import {
    SET_WORK_DEMO_ACTION
} from '@Actions/workDemo';

export const workDemo = (index = 0, action) => {
    switch (action.type) {
        case SET_WORK_DEMO_ACTION:
            return action.index;
        default:
            return index;
    }
}