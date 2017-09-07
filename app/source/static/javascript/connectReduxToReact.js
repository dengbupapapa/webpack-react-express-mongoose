import {
    connect
} from 'react-redux'
import {
    bindActionCreators
} from 'redux'
import {
    // createSelector,
    createStructuredSelector
} from 'reselect'

/*在封装redux和react的连接，若要计算派生数据请在外部计算后传入stateOpts，若要传入所有的actiontor请在外部合并后导入
 *@param  {[reactClass]} reactComponent  [react类]
 *@param {[object]} stateOpts  [reducers 对象集合]
 *@param {[object]} actiontor [action 对象集合]
 *@return {[function]} connectReduxToReact [和Provider连接起来]
 */

export default function connectReduxToReact(reactComponent, stateOpts, actiontor) {

    const mapStateToProps = createStructuredSelector(stateOpts);

    const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(actiontor, dispatch);

    return connect(mapStateToProps, mapDispatchToProps)(reactComponent);

}