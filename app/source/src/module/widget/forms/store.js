/*
 **
 *收集实例后的控件
 */
// let controls = [];

// export function gatherControl(control) {
//     controls.push(control);
// }

// export function undockControl(control) {
//     let index = controls.indexOf(control);
//     controls.splice(index, 1);
// }

// export default function getControls() {
//     return controls;
// }

let controls = {};

export function gatherControl(control, position) {
    if (!position) throw new Error('position is required');
    if (!controls.hasOwnProperty(position)) controls[position] = new Array();
    controls[position].push(control);
}

export function undockControl(control, position) {
    if (!position) throw new Error('position is required');
    if (controls.hasOwnProperty(position)) {
        let index = controls[position].indexOf(control);
        controls[position].splice(index, 1);
    }
}

export default function getControls() {
    return controls;
}