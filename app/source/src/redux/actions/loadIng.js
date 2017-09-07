/*
 * 加载中action 类型
 */
export const LOAD_ING_ACTION = Symbol('LOAD_ING_ACTION');

/*
 *  加载中action
 */
export const loadIngAction = (open) => ({
    type: LOAD_ING_ACTION,
    open
})