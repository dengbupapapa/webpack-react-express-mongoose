/*
**
作者:dengbupapapa
功能有:
1.验证
2.报错
3.change回调验证前后 onChange,validCallback

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
 *@parmas {func} [validCallback] expose parent valid
 *@parmas {string} [errorMessage] throw div content
 *@parmas {string} [errorClass]  throw div class
 *@parmas {string} [containerClass] container div class
 */

import {
    Component
} from 'react';

import {
    formsWidgetNamesArray
} from './config';

import {
    gatherControl,
    undockControl
} from './store';

let debug = Debug('formsWidget:input');

export default class Base extends Component {

    static contextTypes = {
      reactFormsTeam: PropTypes.string
    }

    static defaultProps = {
        onChange: () => {},
        onBlur: () => {},
        onFocus: () => {},
        validCallback: () => {},
        errorMessage: 'Verification failed',
        containerClass: '',
        className: '',
        errorClass: ''
    }

    static propTypes = {
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        validCallback: PropTypes.func,
        errorMessage: PropTypes.string,
        containerClass: PropTypes.string,
        className: PropTypes.string,
        errorClass: PropTypes.string,
        name: PropTypes.string.isRequired,
        team: PropTypes.string,
        children: PropTypes.element.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || this.props.defaultValue || '',
            result: true,
            errorShow: false
        }
    }

    componentWillMount() {

        let {
            controlType
        } = this.props;
        //当select chekcbox radiu没有默认值的时候我们要给一个应该的值值赋给state value
        if (this.state.value === '') {

            if (controlType == 'select') { //当select没有默认值的时候我们要找到第一个option的值赋给state value
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

        // this.verifier(); //加载立马验证，初始化各个state值
    }

    componentDidMount() {
        // console.log(this.control)
        // this.setState({
        //     value:this.control.value
        // });
        // this.verifier(); //加载立马验证，初始化各个state值
        // this.initVerifier = false;
        gatherControl(this); //模块创建之后把该模块添加到集合中
    }

    componentWillUnmount() {
        undockControl(this); //模块移除前把该模块从集合中移除
    }

    componentWillUpdate(prevProps, prevState) {
        // console.log('update');
    }

    render() {

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
            validCallback,
            containerClass,
            team,
            children,
            controlType,
            ...other
        } = this.props;

        /*
        **
        @errorShow Boolean, if true, show error
        @result Boolean, if false, valid not pass
        */
        let {
            result,
            errorShow,
            value
        } = this.state;

        // let initVerifier = this.initVerifier;

        let isInput = controlType == 'input'; //是否是input控件

        return (
            <div className={`react-validate-forms-container ${containerClass}`}>
                {children && React.cloneElement(children, {
                    className: `react-validate-forms-input ${className} ${errorShow?'error':''}`,
                    value,
                    onChange:this.handleChange.bind(this),
                    onBlur:isInput?this.handleBlur.bind(this):onBlur,
                    onFocus:isInput?this.handleFocus.bind(this):onFocus,
                    ref:control => {this.control = control},
                    ...other
                })}
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
     **
     *是否是第一次验证
     */

    // initVerifier = true

    /*
     **
     *收集实例后的input
     */
    // static gatherRefsInputs = []

    /*
     **
     *验证是否通过
     *@ return [pre] {Boolean} valid
     *@ parmas [team] {string} gather default:all
     */
    // static valid(team) {

    //     return Boolean(this.gatherRefsInputs.reduce((pre, inputClass) => {
    //         if (!team || team === inputClass.props.team) {
    //             inputClass.verifier();
    //             pre &= inputClass.state.result
    //         }
    //         return pre;
    //     }, true));

    // }

    /*
     **
     *获取input值
     *@ return [pre] {object} input values
     *@ parmas [team] {string} gather default:all
     */
    // static getValues(team) {

    //     return this.gatherRefsInputs.reduce((pre, inputClass) => {
    //         if (!team || team === inputClass.props.team) {
    //             let name = inputClass.input.name;
    //             let value = inputClass.input.value;
    //             if(Object.prototype.toString.call(pre[name])=='[object Array]'){
    //                 pre[name].push(value);
    //             }else if(pre.hasOwnProperty(name)){
    //                 pre[name] = [pre[name],value];
    //             }else{
    //                 pre[name] = value;
    //             }
    //         }
    //         return pre;
    //     }, {});

    // }

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
            rules,
            validCallback
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

            validCallback(result);
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

        event.preventDefault();
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
        if (!onlyBlurThrow) this.verifier();

    }

    handleBlur(event) {

        event.preventDefault();

        let {
            onBlur, //外部传入change
            onlyBlurThrow
        } = this.props;

        onBlur(event);

        //验证
        this.verifier();

    }

    handleFocus(event) {

        event.preventDefault();

        let {
            onFocus, //外部传入change
            onlyBlurThrow
        } = this.props;

        onFocus(event);

        if (onlyBlurThrow)
            this.setState({
                errorShow: false
            });

    }

    handleErrorClick(event) {

        event.preventDefault();

        let {
            controlType
        } = this.props;

        if (controlType == 'input') {
            this.control.focus();
        } else if (controlType == 'select') {
            this.control.click();//没触发
        }
    }

}