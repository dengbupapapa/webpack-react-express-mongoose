import {Component} from 'react';
import './register.less';

class Register extends Component{

    registerHandle(){

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
            <div className="project-sign-up">
                <div className="project-sign-up-user-name">
                    <input name="phoneNo" placeholder="请输入注册用户名"/>
                </div>
                <div className="project-sign-up-user-email">
                    <input name="email" placeholder="请输入注册邮箱"/>
                </div>
                <div className="project-sign-up-user-password">
                    <input name="password" placeholder="请输入主持用户密码"/>
                </div>
                <div>
                    <a onClick={this.registerHandle}>点击注册</a>
                </div>
            </div>
        )
    }
}

import * as actiontor from '@actions/login';
import connectReduxToReact from '@js/connectReduxToReact';

let loginState = (state) => state.login;
let stateOpts = {
    loginState: loginState
}

export default connectReduxToReact(Register,stateOpts,actiontor);