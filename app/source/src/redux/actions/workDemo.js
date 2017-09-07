/*
 * action 类型
 */

export const SET_WORK_DEMO_ACTION = Symbol('SET_WORK_DEMO_ACTION');

/*
 * action 创建函数
 */
export const setLoginAction = index => ({
    type: SET_WORK_DEMO_ACTION,
    index
});