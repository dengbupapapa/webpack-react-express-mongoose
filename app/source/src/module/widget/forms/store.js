/*
 **
 *收集实例后的控件
 */
let controlArray = [];

export function gatherControl(control) {
    controlArray.push(control);
}

export function undockControl(control) {
    let index = controlArray.indexOf(control);
    controlArray.splice(index, 1);
}

export default function getControl(control) {
    return controlArray;
}