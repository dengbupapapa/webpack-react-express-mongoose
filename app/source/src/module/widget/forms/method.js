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
export async function valid(team, callback) {

    let {
        ALONES,
        CHECKBOXS,
        RADIOS
    } = controlStorePosition;
    let {
        [ALONES]: alonesControl = [], [CHECKBOXS]: checkboxsControl = [], [RADIOS]: radioControl = [],
    } = controlStore();

    let controlResultPromise = new Array();

    alonesControl.reduce((pre, controlElement) => {
        if (isTeam(team, controlElement)) {
            controlElement.verifier();

            pre.push(new Promise((resolve) => {
                controlElement.setState((state) => {
                    resolve(state.result);
                });
            }));

        }
        return pre;
    }, controlResultPromise);

    checkboxsControl.reduce((pre, controlElement) => {

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

                pre.push(new Promise((resolve) => {
                    controlElement.setState((state, props) => {
                        resolve(state.result);
                    });
                }))

            }

        }

        return pre;

    }, controlResultPromise);

    radioControl.reduce((pre, controlElement) => {

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

                controlElement.verifier().then(() => {
                    pre.push(new Promise((resolve) => {
                        controlElement.setState((state) => {
                            resolve(state.result);
                        });
                    }));
                });

            }

        }
        return pre;

    }, controlResultPromise);

    let resultArray = await Promise.all(controlResultPromise);
    let isResult = !resultArray.includes(false);

    if (callback) {
        if (typeof callback != 'function') throw new Error('callback is func!!!');
        callback(isResult);
    }

    return isResult;

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
        [ALONES]: alonesControl = [], [CHECKBOXS]: checkboxsControl = [], [RADIOS]: radioControl = [],
    } = controlStore();

    let values = new Object();

    function reduceCommon(pre, controlElement) {

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

    }

    alonesControl.reduce((pre, controlElement) => reduceCommon(pre, controlElement), values);

    checkboxsControl.reduce((pre, controlElement) => {
        if (!controlElement.state.checked) return pre;
        return reduceCommon(pre, controlElement)
    }, values);

    radioControl.reduce((pre, controlElement) => {
        if (!controlElement.state.checked) return pre;
        return reduceCommon(pre, controlElement)
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