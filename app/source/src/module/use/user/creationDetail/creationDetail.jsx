import {
    Component
} from 'react';
import {
    Form,
    Input
} from '@widgets/forms';
import './creationDetail.less';

import ContextDemo from './contextDemo.jsx';

class InputDemo extends Component{
    render(){
        return (
            <div>
                <Input team="team2" name="name4" className="formasd" defaultValue="12312312s" rules={/^\d{3}$/} errorMessage="就是一直报错"/>
            </div>
        )
    }
}

class CreationDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            demo:true
        };
    }

    submithandle(event,{values}) {
        event.preventDefault();
        console.log(values);
    }

    handleChange(event) {
        // this.setState({value: event.target.value});
    }

    handleBlur(event) {
        // this.setState({
        //     value: event.target.value
        // });
    }

    handleClick(event){
        event.preventDefault();
        console.log(Input.valid('team3'));
        console.log(Input.getValues('team3'));
        // this.setState({demo:!this.state.demo})
    }

    render() {

        return (
            <div className='project-creation-detail-content'>
                creation-detail
                <ContextDemo className="formasd"/>
                <Form onSubmit={this.submithandle.bind(this)} className="formasd">
                    <Input
                        className="formasd"
                        name="name1"
                        onChange={this.handleChange.bind(this)}
                        onBlur={this.handleBlur.bind(this)}
                        defaultValue="12312312ss"
                        placeholder="写点啥"
                        rules={/^\d+$/}
                        errorMessage="请输入数字"
                        validCallback={function(result){}}
                        onlyBlurThrow
                        team='team2'
                    />
                    <Input
                        name="name2"
                        className="formasd"
                        defaultValue="12312312s"
                        rules={/^\d{3}$/}
                        errorMessage="就是一直报错"
                        team='team1'
                    />
                    asd
                    <div onClick={this.handleClick.bind(this)}>123</div>
                    <input type="submit" defaultValue="submit"/>
                </Form>
                <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
                {
                    this.state.demo
                    ?<Input
                        className="formasd"
                        name="name3"
                        onChange={this.handleChange.bind(this)}
                        onBlur={this.handleBlur.bind(this)}
                        value="12312312ss"
                        placeholder="写点啥"
                        rules={/^\d+$/}
                        errorMessage="请输入数字"
                        validCallback={function(result){}}
                        onlyBlurThrow
                        team='team1'
                    />
                    :null
                }
                <InputDemo/>
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