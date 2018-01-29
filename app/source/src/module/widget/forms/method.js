import controlStore from './store';
import {
    controlStorePosition,
    rulesDefaultProps
} from './config';

/*
 **
 *验证是否通过
 *@ return [pre] {Boolean} valid
 *@ parmas [team] {string} gather default:all
 */
export function valid(team) {

    let {
        ALONES,
        CHECKBOXS,
        RADIOS
    } = controlStorePosition;
    let {
        [ALONES]: alonesControl, [CHECKBOXS]: checkboxsControl, [RADIOS]: radioControl,
    } = controlStore();

    let alonesResult = Boolean(alonesControl.reduce((pre, controlElement) => {
        if (isTeam(team, controlElement)) {
            controlElement.verifier();
            pre &= controlElement.state.result;
        }
        return pre;
    }, true));

    let checkboxsResult = Boolean(checkboxsControl.reduce((pre, controlElement) => {

        if (isTeam(team, controlElement)) {

            let {
                props: {
                    rules,
                    required,
                    minNum,
                    maxNum,
                    children: {
                        props: {
                            type
                        }
                    }
                }
            } = controlElement;

            if (required || minNum > 0 || maxNum < Infinity || rules.RULES_FUNC !== rulesDefaultProps.RULES_FUNC) { //有验证才会聚合

                controlElement.verifier();

                pre &= controlElement.state.result;

            }

        }

        return pre;

    }, true))

    let radioResult = Boolean(radioControl.reduce((pre, controlElement) => {

        if (isTeam(team, controlElement)) {

            let {
                props: {
                    rules,
                    required,
                    children: {
                        props: {
                            type
                        }
                    }
                }
            } = controlElement;

            if (required || rules.RULES_FUNC !== rulesDefaultProps.RULES_FUNC) { //有验证才会聚合

                controlElement.verifier();

                pre &= controlElement.state.result;

            }

        }

        return pre;

    }, true));

    return alonesResult && checkboxsResult && radioResult

}

/*
 **
 *获取control值集合
 *@ return [pre] {object} control values
 *@ parmas [team] {string} gather default:all
 */
export function getValues(team) {

    let {
        ALONES,
        CHECKBOXS,
        RADIOS
    } = controlStorePosition;
    let {
        [ALONES]: alonesControl, [CHECKBOXS]: checkboxsControl, [RADIOS]: radioControl,
    } = controlStore();

    let values = new Object();

    alonesControl.reduce((pre, controlElement) => {
        if (isTeam(team, controlElement)) {
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
    }, values);

    checkboxsControl.reduce((pre, controlElement) => {
        if (!controlElement.state.checked) return pre;
        if (isTeam(team, controlElement)) {
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
    }, values);

    radioControl.reduce((pre, controlElement) => {
        if (!controlElement.state.checked) return pre;
        if (isTeam(team, controlElement)) {
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
    }, values);

    return values

}

/*
 **
 *获取controls
 *@ return {array} controls
 */
export const getControls = controlStore;

/*
 **
 *判断是否是一个team
 *@ pramas {string} team
 *@ pramas {reactElement} controlElement
 *@ return {bool} isTeam
 */
function isTeam(team, controlElement) {
    return !team || team === controlElement.props.team || team === controlElement.context.reactFormsTeam
}