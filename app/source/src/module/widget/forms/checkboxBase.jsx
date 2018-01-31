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
        minNum: 0,
        maxNum: Infinity,
        rules: rulesDefaultProps,
        checked: false,
        value: 'on',
        defaultValue: 'on'
    })

    static propTypes = Object.assign({}, Base.propTypes, {
        required: PropTypes.bool,
        minNum: PropTypes.number,
        maxNum: PropTypes.number,
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
                'on' : defaultValue :
                value
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

    verifier() {

        let {
            values,
            hasValidControls
        } = reduceControl(this.props);

        inspect(values, hasValidControls);

    }

    /*
    **
    @每次变动callback
    */
    handleChange(event) {

        // event.preventDefault();
        //受控
        let checked = event.target.checked;

        this.setState({
            checked
        }, () => {

            let {
                onChange, //外部传入change
            } = this.props;

            onChange(event);

            // 验证
            this.verifier();

        });

    }

}

/*
 **
 *整合values
 *整合验证条件rules
 *@pramas props
 *@return [values] {array} values
 *@return [hasValidControls] {array} controls
 */
function reduceControl(props) {

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

    return checkboxsControl.reduce((pre, control) => {

        let {
            props: {
                name,
                rules,
                required,
                minNum,
                maxNum,
                children: {
                    props: {
                        type
                    }
                }
            },
            state: {
                value,
                checked
            }
        } = control;

        if (referName === name && referType === type) {
            if (required || minNum > 0 || maxNum < Infinity || rules.RULES_FUNC !== rulesDefaultProps.RULES_FUNC) //有验证才会聚合
                pre.hasValidControls.push(control);
            if (checked) //选中才会添加到values
                pre.values.push(value);
        }
        return pre;

    }, {
        values: [],
        hasValidControls: []
    });

}

/*
 **
 *检测复用组件checkbox 各个组件结合values是否通过验证
 *@parmas [values] {array}
 *@parmas [controls] {reactElement}
 */
function inspect(values, controls) {

    let num = values.length;

    controls.forEach((control, index) => {

        let {
            props: {
                name,
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
        } = control;

        let requiredPass = required ? Boolean(num) : true;
        let maxNumPass = maxNum >= num;
        let minNumPass = num >= minNum;
        let rulesPass = rules.RULES_FUNC === rulesDefaultProps.RULES_FUNC ? true : rules(values) === true;

        if (requiredPass && maxNumPass && minNumPass && rulesPass) { //验证通过
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