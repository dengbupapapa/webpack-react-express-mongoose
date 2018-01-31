/*
**
作者:dengbupapapa
功能有:
1.验证
2.报错

验证方式有：
1.new Reg
2.fn
3.固定值
*/

/*
 **
 *options
 *@parmas {all} [rules] 验证格式
 *@parmas {boolean} [onlyBlurThrow] 是否失去焦点时报错
 *@parmas {string} [className] input class
 *@parmas {string} [errorMessage] throw div content
 *@parmas {string} [errorClass]  throw div class
 *@parmas {string} [containerClass] container div class
 */

import {
    Component
} from 'react';

import {
    formsWidgetNamesArray,
    controlStorePosition
} from './config';

import {
    gatherControl,
    undockControl
} from './store';

// let debug = Debug('formsWidget:input');

export default class Base extends Component {

    static contextTypes = {
        reactFormsTeam: PropTypes.oneOfType([
            PropTypes.symbol,
            PropTypes.string
        ])
    }

    static defaultProps = {
        onChange: () => {},
        onBlur: () => {},
        onFocus: () => {},
        errorMessage: 'Verification failed',
        containerClass: '',
        className: '',
        errorClass: ''
    }

    static propTypes = {
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        errorMessage: PropTypes.string,
        containerClass: PropTypes.string,
        className: PropTypes.string,
        errorClass: PropTypes.string,
        name: PropTypes.string.isRequired,
        team: PropTypes.string,
        children: PropTypes.element.isRequired
    }

    constructor(props, context) {
        super(props, context);
        /*
        **
        @errorShow Boolean, if true, show error
        @result Boolean, if false, valid not pass
        */
        this.state = {
            value: this.props.value || this.props.defaultValue || '',
            result: true,
            errorShow: false
        }
    }

    componentWillMount() {

        let {
            isInput,
            isSelect,
            isTextarea,
        } = this.props;
        //当select chekcbox radiu没有默认值的时候我们要给一个应该的值值赋给state value
        if (this.state.value === '') {

            if (isSelect) { //当select没有默认值的时候我们要找到第一个option的值赋给state value
                let {
                    children: {
                        props: {
                            children: option
                        }
                    }
                } = this.props;
                let count = React.Children.count(option);
                let value;
                if (count > 1) {
                    value = option[0].props.value;
                } else {
                    value = option.props.value;
                }
                this.setState(() => ({
                    value
                }));

            }

        }



    }

    componentDidMount() {

        gatherControl(this, controlStorePositionFn(this.props)); //模块创建之后把该模块添加到集合中

    }

    componentWillUnmount() {

        undockControl(this, controlStorePositionFn(this.props)); //模块移除前把该模块从集合中移除

    }

    componentDidUpdate(prevProps, prevState) {
        let {
            value,
            checked,
            rules,
            required,
            minNum,
            maxNum
        } = this.props;
        if (
            prevProps.value != value ||
            prevProps.checked != checked ||
            prevProps.rules.toString() != rules.toString() ||
            prevProps.required != required ||
            prevProps.minNum != minNum ||
            prevProps.maxNum != maxNum
        ) {
            this.verifier();
        }

    }

    render() {

        let {
            className,
            errorMessage,
            errorClass,
            containerClass,
            children,
        } = this.props;

        let {
            errorShow,
        } = this.state;

        return (
            <div className={`react-validate-forms-container ${containerClass}`}>
                {children && React.cloneElement(children,this.controlOptions(this.props,this.state))}
                {
                    errorShow
                    ?<div
                        className={`react-validate-forms-error ${errorClass}`}
                        onClick={this.handleErrorClick.bind(this)}
                    >
                        {errorMessage}
                    </div>
                    :null
                }
            </div>
        )

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
            value: aliasValue,
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
            ...other
        } = props;

        let {
            errorShow,
            value
        } = state;

        return {
            className: `react-validate-forms-input ${className} ${errorShow?'error':''}`,
            value,
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
    @验证类型分类
    @return string
    */

    rulesClassify() {

        let rules = this.props.rules;

        if (typeof rules == 'function') return 'fn';
        if (rules instanceof RegExp) return 'reg';
        if (typeof rules === 'undefined') return 'undefined';
        if (rules === null) return 'null';

        return 'fixed';

    }

    /*
    **
    @验证fun
    */

    verifier() {

        let result;
        let {
            rules
        } = this.props;

        this.setState((state, props) => {

            let {
                value
            } = state;

            switch (this.rulesClassify()) {
                case 'fn':
                    result = Boolean(rules());
                    break;
                case 'reg':
                    result = rules.test(value);
                    break;
                case 'undefined':
                    result = true;
                    break;
                case 'null':
                    result = value === '';
                    break;
                default:
                    result = rules == value;
            }

            return {
                result,
                errorShow: !result
            }

        });

    }

    /*
    **
    @每次变动callback
    */
    handleChange(event) {

        // event.preventDefault();
        //受控
        let value = event.target.value;

        this.setState(() => ({
            value
        }));

        let {
            onChange, //外部传入change
            onlyBlurThrow,
        } = this.props;

        onChange(event);

        //验证
        if (!onlyBlurThrow)
            this.verifier();

    }

    handleBlur(event) {

        // event.preventDefault();

        let {
            onBlur, //外部传入change
            onlyBlurThrow,
            isInput
        } = this.props;

        onBlur(event);

        //验证
        if (onlyBlurThrow)
            this.verifier();

    }

    handleFocus(event) {

        // event.preventDefault();

        let {
            onFocus, //外部传入change
            onlyBlurThrow,
            isInput,
            isSelect,
            isTextarea,
            isCheckbox,
            isRadio
        } = this.props;

        onFocus(event);

        if (onlyBlurThrow || isSelect || isCheckbox || isRadio)
            this.setState({
                errorShow: false
            });

    }

    handleErrorClick(event) {

        // event.preventDefault();

        let {
            isInput,
            isSelect,
            isTextarea,
        } = this.props;

        this.control.focus();

    }

}

/*
 **
 *@props {object}
 *@return position {string} control belong to store position
 */
function controlStorePositionFn(props) {

    let {
        ALONES,
        CHECKBOXS,
        RADIOS
    } = controlStorePosition;

    let position = ALONES;
    let {
        isCheckbox,
        isRadio
    } = props;

    if (isCheckbox) {
        position = CHECKBOXS;
    } else if (isRadio) {
        position = RADIOS;
    }

    return position;

}