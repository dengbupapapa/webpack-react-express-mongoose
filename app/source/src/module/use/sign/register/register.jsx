import {Component} from 'react';
import './register.less';

class Register extends Component{

    constructor(props, context){
        super(props);
    }

    componentWillMount(){
        this.setState({ddd:1});
    }

    componentDidMount(){
    }

    registerHandle (event){

        event.preventDefault();

        fetch('/sign/register',{
                body:JSON.stringify({
                    phoneNo:13532346982,
                    email:'441056610121222ss1ss12311@qq.com',
                    password:'rr5208fdadf81',
                    confirmPassword:'rr5208fda1df81',
                    a:1234
                })
            })
            .then((response)=>response.json())
            .then((result)=>{
                console.log(result);
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    render(){
        return (
            <form onSubmit={this.registerHandle} className="project-sign-up">
                <div className="project-sign-up-user-name">
                    <input name="phoneNo" placeholder="请输入注册用户名" defaultValue={this.state.ddd}/>
                </div>
                <div className="project-sign-up-user-email">
                    <input name="email" placeholder="请输入注册邮箱" defaultValue={this.props.someProp}/>
                </div>
                <div className="project-sign-up-user-password">
                    <input name="password" placeholder="请输入主持用户密码" defaultValue={this.props.x}/>
                </div>
                <div>
                    <input type="submit" value="点击注册"/>
                </div>
            </form>
        )
    }

    static defaultProps={
        x:1
    }

    static propTypes={
        someProp:PropTypes.string
    }

}

import * as actiontor from '@actions/login';
import connectReduxToReact from '@js/connectReduxToReact';

let loginState = (state) => state.login;
let stateOpts = {
    loginState: loginState
}

export default connectReduxToReact(Register,stateOpts,actiontor);