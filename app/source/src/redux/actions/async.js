/*
 *  异步action
 *  statusAction {dispatsh} 异步请求前后触发的dispatsh
 *  start {opt} 异步请求前传入action的关键属性
 *  end {opt} 异步请求后传入action的关键属性
 *  opts {arg} fetch参数
 */
export const sendAsyncAction = ({
    statusAction,
    start,
    end
}, ...opts) => (dispatch) => {

    if (start) statusAction(start);

    return fetch(...opts)
        .then(response => response.json(), err => err)
        .then(json => statusAction(end, json));

}