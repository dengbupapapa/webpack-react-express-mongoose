import {Component} from 'react';
import {Form,Input} from '@widgets/forms';
import './creationDetail.less';

import ContextDemo from './contextDemo.jsx'

class CreationDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    }


    submithandle(event){
        event.preventDefault();
    }

    handleChange(event) {
        // this.setState({value: event.target.value});
    }

    handleBlur(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className='project-creation-detail-content'>
                creation-detail
                <ContextDemo className="formasd"/>
                <Form onSubmit={this.submithandle.bind(this)} className="formasd">
                    <Input className="formasd" onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} defaultValue="12312312" placeholder="写点啥" rules={/^\d*$/} errorMessage="请输入数字"/>
                    <Input/>
                    <input type="submit" defaultValue="submit"/>
                </Form>
                <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
            </div>
        );
    }

    static childContextTypes = {
        datademo: PropTypes.string
    }

}



import * as actiontor from '@actions/login';
import connectReduxToReact from '@js/connectReduxToReact';

let loginState = (state) => state.login;
let stateOpts = {
    loginState: loginState
}

export default connectReduxToReact(CreationDetail, stateOpts, actiontor);