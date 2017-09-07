/*
 * action 类型
 */

export const SET_LOGIN_ACTIVE = Symbol('SET_LOGIN_ACTIVE');

/*
 * action 创建函数
 */
export const setLoginAction = index => ({
    type: SET_LOGIN_ACTIVE,
    index
});