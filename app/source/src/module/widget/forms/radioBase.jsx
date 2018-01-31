import {
    Component
} from 'react';
import Base from './base';
import controlStore from './store';

import {
    controlStorePosition,
    rulesDefaultProps
} from './config';

export default class ComplexBase extends Base {

    static defaultProps = Object.assign({}, Base.defaultProps, {
        required: false,
        rules: rulesDefaultProps,
        checked: false,
        value: 'on',
        defaultValue: 'on'
    })

    static propTypes = Object.assign({}, Base.propTypes, {
        required: PropTypes.bool,
        rules: PropTypes.func,
        checked: PropTypes.bool
    })

    constructor(props, context) {
        super(props, context);
        let {
            value,
            defaultValue
        } = this.props;
        this.state = Object.assign({}, this.state, {
            checked: this.props.checked,
            value: value == 'on' ?
                defaultValue == 'on' ?
                'on' : defaultValue : value
        })
    }

    /*
     **control参数设置
     *@ parmas {object} [props]
     *@ parmas {object} [state]
     *@ return {object} [control options]
     */
    controlOptions(props, state) {

        let {
            rules,
            onChange,
            onBlur,
            onFocus,
            onlyBlurThrow,
            defaultValue,
            className,
            errorMessage,
            errorClass,
            containerClass,
            team,
            children,
            isInput,
            isSelect,
            isTextarea,
            isCheckbox,
            isRadio,
            type,
            checked: aliasChecked,
            required,
            minNum,
            maxNum,
            ...other
        } = props;

        let {
            checked,
            errorShow
        } = state;

        return {
            className: `react-validate-forms-input ${className} ${errorShow?'error':''}`,
            checked,
            onChange: this.handleChange.bind(this),
            onBlur: this.handleBlur.bind(this),
            onFocus: this.handleFocus.bind(this),
            ref: control => {
                this.control = control
            },
            ...other
        }

    }

    /*
    **
    @验证fun
    */

    verifier(manualCheck, manualValue, hasValidControls) {

        if (manualCheck) { //如果有传入选中值

            inspect(this.props, manualCheck, manualValue, hasValidControls);

        } else {

            let {
                name: referName,
                children: {
                    props: {
                        type: referType
                    }
                }
            } = this.props;

            let {
                controlsSetStatePromiseArray,
                hasValidControls,
                belongToControlsArray
            } = reduceControl(this.props);

            return Promise.all(controlsSetStatePromiseArray).then((checkedArray) => {
                let checked = checkedArray.includes(true);
                let value = undefined;
                if (checked) {
                    let index = checkedArray.indexOf(true);
                    value = belongToControlsArray[index].state.value;
                }
                inspect(this.props, checked, value, hasValidControls);
            });

        }

    }

    /*
    **
    @每次变动callback
    */
    handleChange(event) {

        let {
            value: referValue,
            checked: referChecked
        } = event.target;

        let {
            controlsSetStatePromiseArray,
            hasValidControls
        } = reduceControl(this.props, true, referValue);

        Promise.all(controlsSetStatePromiseArray)
            .then((checkedArray) => {
                let {
                    onChange, //外部传入change
                } = this.props;
                onChange(event);
                this.verifier(referChecked, referValue, hasValidControls);
            });

        // 验证

    }

}

/*
 **
 *整合values
 *整合验证条件rules
 *@pramas [props]
 *@pramas [isControlled] {bool}
 *@pramas [referValue] {string}
 *@return [belongToControlsArray] {array} belong to controls
 *@return [controlsSetStatePromiseArray] {array} controls setState promise
 *@return [hasValidControls] {array} controls
 */
function reduceControl(props, isControlled, referValue) {

    let {
        name: referName,
        children: {
            props: {
                type: referType
            }
        }
    } = props;

    let {
        ALONES,
        CHECKBOXS,
        RADIOS
    } = controlStorePosition;
    let {
        [ALONES]: alonesControl=[], [CHECKBOXS]: checkboxsControl=[], [RADIOS]: radioControl=[],
    } = controlStore();

    return radioControl.reduce((pre, control) => {

        let {
            props: {
                name,
                rules,
                required,
                children: {
                    props: {
                        type
                    }
                }
            }
        } = control;

        if (referName === name && referType === type) {
            pre.controlsSetStatePromiseArray.push(new Promise((resolve) => {
                control.setState((state, props) => {
                    resolve(state.checked);
                });
            })); //收集属于同一个复用组件的成promise
            pre.belongToControlsArray.push(control); //收集属于同一个复用组件的
            if (isControlled) //如果是有受控项
                control.setState(({
                    value
                }) => ({
                    checked: value === referValue
                }));
            if (required || rules.RULES_FUNC !== rulesDefaultProps.RULES_FUNC) //有验证才会聚合
                pre.hasValidControls.push(control);
        }
        return pre;

    }, {
        belongToControlsArray: [],
        controlsSetStatePromiseArray: [],
        hasValidControls: []
    });

}

/*
 **
 *检测复用组件checkbox 各个组件结合value是否通过验证
 *@parmas [props] {object} react props
 *@parmas [hasChecked] {bool} 是否有选中
 *@parmas [chekValue] {string} 选中值
 *@parmas [controls] {reactElement}
 */
function inspect(props, hasChecked = false, chekValue=undefined, controls) {

    let {
        name: referName,
        children: {
            props: {
                type: referType
            }
        }
    } = props;

    controls.forEach((control, index) => {

        let {
            props: {
                name,
                rules,
                required,
                children: {
                    props: {
                        type
                    }
                }
            }
        } = control;

        let requiredPass = required ? hasChecked : true;
        let rulesPass = rules.RULES_FUNC === rulesDefaultProps.RULES_FUNC ? true : rules(chekValue) === true;

        if (requiredPass && rulesPass) { //验证通过
            control.setState(() => ({
                result: true,
                errorShow: false
            }));
        } else {
            control.setState(() => ({
                result: false,
                errorShow: true
            }));
        }

    })

}