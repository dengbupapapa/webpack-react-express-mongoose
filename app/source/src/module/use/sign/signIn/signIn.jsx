import {Component} from 'react';
import './signIn.less';

class SignIn extends Component{
    render(){
        return (
            <div className="project-sign-in">
                <div className="project-sign-in-user-name">
                    <input name="userName" placeholder="请输入账户名"/>
                </div>
                <div className="project-sign-in-user-password">
                    <input name="password" placeholder="请输入密码"/>
                </div>
                <div>
                    <a>点击登录</a>
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

export default connectReduxToReact(SignIn,stateOpts,actiontor);