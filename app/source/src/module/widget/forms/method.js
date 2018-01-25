import controlStore from './store';

/*
 **
 *验证是否通过
 *@ return [pre] {Boolean} valid
 *@ parmas [team] {string} gather default:all
 */
export function valid(team) {

    return Boolean(controlStore().reduce((pre, controlElement) => {
        if (!team || team === controlElement.props.team || team === controlElement.context.reactFormsTeam) {
            controlElement.verifier();
            pre &= controlElement.state.result
        }
        return pre;
    }, true));

}

/*
 **
 *获取control值集合
 *@ return [pre] {object} control values
 *@ parmas [team] {string} gather default:all
 */
export function getValues(team) {

    return controlStore().reduce((pre, controlElement) => {
        if (!team || team === controlElement.props.team || team === controlElement.context.reactFormsTeam) {
            let name = controlElement.control.name;
            let value = controlElement.control.value;
            if (Object.prototype.toString.call(pre[name]) == '[object Array]') {
                pre[name].push(value);
            } else if (pre.hasOwnProperty(name)) {
                pre[name] = [pre[name], value];
            } else {
                pre[name] = value;
            }
        }
        return pre;
    }, {});

}