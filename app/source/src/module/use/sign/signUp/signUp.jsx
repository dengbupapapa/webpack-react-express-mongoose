import {Component} from 'react';
import './signUp.less';

class SignUp extends Component{
    render(){
        return (
            <div className="project-sign-up">
                <div className="project-sign-up-user-name">
                    <input name="userName" placeholder="请输入注册用户名"/>
                </div>
                <div className="project-sign-up-user-email">
                    <input name="userName" placeholder="请输入注册邮箱"/>
                </div>
                <div className="project-sign-up-user-password">
                    <input name="password" placeholder="请输入主持用户密码"/>
                </div>
                <div>
                    <a>点击注册</a>
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

export default connectReduxToReact(SignUp,stateOpts,actiontor);