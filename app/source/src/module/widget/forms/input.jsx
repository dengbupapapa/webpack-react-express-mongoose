import {Component} from 'react';
let debug = Debug('formsWidget:input');

export default class Input extends Component {

    constructor(props){
        super(props);
        this.state={
            value:this.props.value||this.props.defaultValue||'',
            result:true,
        }

    }

    componentDidMount(){
        // debug(this.props);
        // console.log(this.setState)
    }

    render(){

        let{
            rules,
            valiPre,
            valiPost,
            onChange,
            defaultValue,
            ...other
        } = this.props;

        return(
            <div className="react-validate-forms-input-container">
                <input type="text" {...other} value={this.state.value} onChange={this.handleChange.bind(this)}/>
                <div className="react-validate-forms-error">{this.state.result.toString()}</div>
            </div>
        )

    }


    /*
    **
    @验证类型分类
    @return string
    */

    rulesClassify(){

       let rules = this.props.rules;

       if(typeof rules == 'function') return 'fn';
       if(rules instanceof RegExp) return 'reg';

       return 'fixed';

    }

    /*
    **
    @验证fun
    */

    verifier(){

        let result;
        let{rules} = this.props;
        let{value} = this.state;

        switch (this.rulesClassify()){
            case 'fn' :
                result = rules();
                break;
            case 'reg' :
                result = rules.test(value);
                break;
            default :
                result = rules===value;
        }

        this.setState({
            result
        });

    }



    /*
    **
    @每次变动callback
    */
    async handleChange(event){

        //受控
        let value=event.target.value;

        console.log(await (function asd(a,fn){setTimeout(fn, 0)})(123,function(){console.log(12333);return Promise.resolve(123456)}));

        await this.setState({
            value
        });

        debug(this.state.result);
        //验证
        await this.verifier();

        debug(this.state.result);

    }

}

/*
**
功能有:
1.验证
2.报错
3.change回调验证前后 valiPre,valiPost

验证方式有：
1.new Reg
2.fn
3.固定值
*/