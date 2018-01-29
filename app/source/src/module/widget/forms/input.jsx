// /*
// **
// 作者:dengbupapapa
// 功能有:
// 1.验证
// 2.报错
// 3.change回调验证前后 onChange,validCallback

// 验证方式有：
// 1.new Reg
// 2.fn
// 3.固定值
// */

// /*
//  **
//  *options
//  *@parmas {all} [rules] 验证格式
//  *@parmas {boolean} [onlyBlurThrow] 是否失去焦点时报错
//  *@parmas {string} [className] input class
//  *@parmas {func} [validCallback] expose parent valid
//  *@parmas {string} [errorMessage] throw div content
//  *@parmas {string} [errorClass]  throw div class
//  *@parmas {string} [containerClass] container div class
//  */

// import {
//     Component
// } from 'react';

// import {
//     formsWidgetNamesArray
// } from './config';

// let debug = Debug('formsWidget:input');

// export default class Input extends Component {

//     static displayName = formsWidgetNamesArray[0]

//     static defaultProps = {
//         onChange: () => {},
//         onBlur: () => {},
//         onFocus: () => {},
//         validCallback: () => {},
//         errorMessage: 'Verification failed',
//         containerClass: '',
//         className: '',
//         errorClass: ''
//     }

//     static propTypes = {
//         onChange: PropTypes.func,
//         onBlur: PropTypes.func,
//         onFocus: PropTypes.func,
//         validCallback: PropTypes.func,
//         errorMessage: PropTypes.string,
//         containerClass: PropTypes.string,
//         className: PropTypes.string,
//         errorClass: PropTypes.string,
//         name: PropTypes.string.isRequired,
//         team: PropTypes.string
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             value: this.props.value || this.props.defaultValue || '',
//             result: true,
//             errorShow: false
//         }
//     }

//     componentWillMount() {
//         this.verifier(); //加载立马验证，初始化各个state值
//     }

//     componentDidMount() {
//         this.initVerifier = false;
//         Input.gatherRefsInputs.push(this);
//     }

//     componentWillUnmount() {
//         let index = Input.gatherRefsInputs.indexOf(this);
//         Input.gatherRefsInputs.splice(index, 1);
//     }

//     componentWillUpdate(prevProps, prevState) {}

//     render() {

//         let {
//             rules,
//             onChange,
//             onBlur,
//             onFocus,
//             onlyBlurThrow,
//             defaultValue,
//             value: aliasValue,
//             className,
//             errorMessage,
//             errorClass,
//             validCallback,
//             containerClass,
//             team,
//             ...other
//         } = this.props;

//         /*
//         **
//         @errorShow Boolean, if true, show error
//         @result Boolean, if false, valid not pass
//         */
//         let {
//             result,
//             errorShow,
//             value
//         } = this.state;

//         let initVerifier = this.initVerifier;

//         return (
//             <div className={`react-validate-forms-container ${containerClass}`}>
//                 <input
//                     className={`react-validate-forms-input ${className} ${errorShow&&!initVerifier?'error':''}`}
//                     type="text"
//                     value={value}
//                     onChange={this.handleChange.bind(this)}
//                     onBlur={this.handleBlur.bind(this)}
//                     onFocus={this.handleFocus.bind(this)}
//                     ref={input => {this.input = input}}
//                     {...other}
//                 />
//                 {
//                     errorShow&&!initVerifier
//                     ?<div
//                         className={`react-validate-forms-error ${errorClass}`}
//                         onClick={this.handleErrorClick.bind(this)}
//                     >
//                         {errorMessage}
//                     </div>
//                     :null
//                 }
//             </div>
//         )

//     }

    
//      **
//      *是否是第一次验证
     

//     initVerifier = true

//     /*
//      **
//      *收集实例后的input
//      */
//     static gatherRefsInputs = []

//     /*
//      **
//      *验证是否通过
//      *@ return [pre] {Boolean} valid
//      *@ parmas [team] {string} gather default:all
//      */
//     static valid(team) {

//         return Boolean(this.gatherRefsInputs.reduce((pre, inputClass) => {
//             if (!team || team === inputClass.props.team) {
//                 inputClass.verifier();
//                 pre &= inputClass.state.result
//             }
//             return pre;
//         }, true));

//     }

//     /*
//      **
//      *获取input值
//      *@ return [pre] {object} input values
//      *@ parmas [team] {string} gather default:all
//      */
//     static getValues(team) {

//         return this.gatherRefsInputs.reduce((pre, inputClass) => {
//             if (!team || team === inputClass.props.team) {
//                 let name = inputClass.input.name;
//                 let value = inputClass.input.value;
//                 if(Object.prototype.toString.call(pre[name])=='[object Array]'){
//                     pre[name].push(value);
//                 }else if(pre.hasOwnProperty(name)){
//                     pre[name] = [pre[name],value];
//                 }else{
//                     pre[name] = value;
//                 }
//             }
//             return pre;
//         }, {});

//     }

//     /*
//     **
//     @验证类型分类
//     @return string
//     */

//     rulesClassify() {

//         let rules = this.props.rules;

//         if (typeof rules == 'function') return 'fn';
//         if (rules instanceof RegExp) return 'reg';
//         if (typeof rules === 'undefined') return 'undefined';
//         if (rules === null) return 'null';

//         return 'fixed';

//     }

//     /*
//     **
//     @验证fun
//     */

//     verifier() {

//         let result;
//         let {
//             rules,
//             validCallback
//         } = this.props;

//         this.setState((state, props) => {

//             let {
//                 value
//             } = state;

//             switch (this.rulesClassify()) {
//                 case 'fn':
//                     result = Boolean(rules());
//                     break;
//                 case 'reg':
//                     result = rules.test(value);
//                     break;
//                 case 'undefined':
//                     result = true;
//                     break;
//                 case 'null':
//                     result = value === '';
//                     break;
//                 default:
//                     result = rules == value;
//             }

//             validCallback(result);

//             return {
//                 result,
//                 errorShow: !result
//             }

//         });

//     }

//     /*
//     **
//     @每次变动callback
//     */
//     handleChange(event) {

//         event.preventDefault();
//         //受控
//         let value = event.target.value;

//         this.setState(() => ({
//             value
//         }));

//         let {
//             onChange, //外部传入change
//             onlyBlurThrow,
//         } = this.props;

//         onChange(event);

//         //验证
//         if (!onlyBlurThrow) this.verifier();

//     }

//     handleBlur(event) {

//         event.preventDefault();

//         let {
//             onBlur, //外部传入change
//             onlyBlurThrow
//         } = this.props;

//         onBlur(event);

//         //验证
//         this.verifier();

//     }

//     handleFocus(event) {

//         event.preventDefault();

//         let {
//             onFocus, //外部传入change
//             onlyBlurThrow
//         } = this.props;

//         onFocus(event);

//         if (onlyBlurThrow)
//             this.setState({
//                 errorShow: false
//             })

//     }

//     handleErrorClick(event) {
//         event.preventDefault();
//         this.input.focus();
//     }

// }

import {
    Component
} from 'react';
import Base from './base';

import {
    formsWidgetNamesArray,
    rulesDefaultProps
} from './config';

export default class Input extends Component {

    static displayName = formsWidgetNamesArray[0]

    // static propTypes = {
    //     children: PropTypes.oneOfType([
    //         PropTypes.arrayOf(PropTypes.element),
    //         PropTypes.element
    //     ]).isRequired
    // }
    // componentDidMount(){
    //     console.log(this.input)
    // }

    // componentWillUpdate(){
    //     console.log(this.input)
    // }

    render() {
        return (
            <Base {...this.props} isInput>
                <input type="text"/>
            </Base>
        )

    }

}