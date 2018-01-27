import {
    Component
} from 'react';
import Base from './base';
import controlStore from './store';

const RULES_FUNC = Symbol('RULES_FUNC');

export default class ComplexBase extends Base {

    static defaultProps = Object.assign({}, Base.defaultProps, {
        required: false,
        minNum: 0,
        maxNum: Infinity,
        rules: () => {
            return RULES_FUNC
        }
    })

    static propTypes = Object.assign({}, Base.propTypes, {
        required: PropTypes.bool,
        minNum: PropTypes.number,
        maxNum: PropTypes.number,
        rules: PropTypes.func
    })

    constructor(props, context) {
        super(props, context);
        this.state = Object.assign({}, this.state, {
            checked: this.props.checked || false
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

        // let result;
        // let {
        //     rules,
        //     name: referName,
        //     children: {
        //         props: {
        //             type: referType
        //         }
        //     }
        // } = this.props;

        // let values = controlStore().reduce((pre, control) => {

        //     let {
        //         props: {
        //             name,
        //             children: {
        //                 props: {
        //                     type
        //                 }
        //             }
        //         },
        //         state: {
        //             value,
        //             checked
        //         }
        //     } = control;
        //     // console.log(control)
        //     if (referName === name && referType === type && checked) {
        //         // console.log(control)

        //         pre.push(value);
        //     }
        //     return pre;

        // }, []);

        // console.log(values);
        let {
            values,
            hasValidControls
        } = reduceControl(this.props);

        inspect(values, hasValidControls);

        // this.setState((state, props) => {

        //     let {
        //         value
        //     } = state;

        //     switch (this.rulesClassify()) {
        //         case 'fn':
        //             result = Boolean(rules());
        //             break;
        //         case 'reg':
        //             result = rules.test(value);
        //             break;
        //         case 'undefined':
        //             result = true;
        //             break;
        //         case 'null':
        //             result = value === '';
        //             break;
        //         default:
        //             result = rules == value;
        //     }

        //     return {
        //         result,
        //         errorShow: !result
        //     }

        // });

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

    return controlStore().reduce((pre, control) => {

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
            if (required || minNum > 0 || maxNum < Infinity || rules() !== RULES_FUNC)
                pre.hasValidControls.push(control);
            if (checked)
                pre.values.push(value);
        }
        return pre;

    }, {
        values: [],
        hasValidControls: []
    });

}

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
        console.log(controls, requiredPass, maxNumPass, minNumPass);
        if (requiredPass && maxNumPass && minNumPass) { //验证通过
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