/*
 * action 类型
 */
export const LOCAL_STORAGE_DEMO = Symbol('LOCAL_STORAGE_DEMO');

/*
 * action 创建函数
 */
export const localStorageDemo = userKey => ({
    type: LOCAL_STORAGE_DEMO,
    localStorage: true,
    userKey
});