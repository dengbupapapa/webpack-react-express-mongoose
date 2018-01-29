import {
    Component
} from 'react';
import {
    Form,
    Input,
    Select,
    Textarea,
    method
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
            demo:true,
            radio1:true,
            radio2:false,
            checkbox1:false,
            checkbox2:false,
            className:'asdasdsa21312'
        };
    }

    componentDidMount() {

            // this.setState({
            //     className:'456yhjk'
            // });
            // console.log(this.state.className);
            // this.setState({},(...a)=>{
            //     console.log(a);
            // })
            //         function setStateAsync(state) {
            //             return new Promise((resolve) => {
            //                 this.setState(resolve);
            //             });
            //         }

            //         setStateAsync.call(this).then(function(...a){
            //             console.log(a);
            //         })

    }

    submithandle(event,{values}) {
        event.preventDefault();
        console.log(values);
    }

    handleChange(event) {
        console.log('handleChange');
        // this.setState({value: event.target.value});
    }

    handleBlur(event) {
        console.log('handleBlur');
        // this.setState({
        //     value: event.target.value
        // });
    }

    handleClick(event){
        event.preventDefault();
        console.log(method.valid());
        console.log(method.getValues());
        // console.log(method.getControls()[0].verifier.toString());
        // this.setState({demo:!this.state.demo})
    }

    selectonchange(event){
        console.log(event);
        // this.control.focus()
    }

    handleradio(e){
        // console.log(e.target.checked)
        // this.setState({
        //     [e.target.name]:e.target.checked
        // });
    }
    handleradio1(e){
        // console.log(e.target.checked);
        // this.setState({
        //     radio1:e.target.checked
        // });
    }
    handleradio2(e){
        // console.log(e.target.checked);
        // this.setState({
        //     radio2:e.target.checked
        // });
    }
    render() {

        return (
            <div className='project-creation-detail-content'>
                creation-detail
                <Form onSubmit={this.submithandle.bind(this)} className="formasd">
                    <ContextDemo className="formasd"/>
                    <Input
                        className="formasd"
                        name="name1"
                        onChange={this.handleChange.bind(this)}
                        onBlur={this.handleBlur.bind(this)}
                        defaultValue="12312312ss"
                        placeholder="写点啥"
                        rules={/^\d+$/}
                        errorMessage="请输入数字"
                        onlyBlurThrow
                        team='team2'
                    />
                    <Input
                        name="name1"
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
                <Form onSubmit={this.submithandle.bind(this)} className="formasd">
                </Form>
                <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
                {
                    this.state.demo
                    ?<Input
                        className={this.state.className}
                        name="name1123"
                        onChange={this.handleChange.bind(this)}
                        onBlur={this.handleBlur.bind(this)}
                        value="12312312ss"
                        placeholder="写点啥"
                        rules={/^\d+$/}
                        errorMessage="请输入数字"
                        onlyBlurThrow
                    />
                    :null
                }
                <InputDemo/>
                <Textarea
                    className="formasd123213"
                    name="name1"
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    value="12312312ss"
                    placeholder="写点啥"
                    rules={/^\d+$/}
                    errorMessage="请输入数字"
                    onlyBlurThrow
                    team="team2"
                />
                <Textarea
                    className="formasd123213"
                    name="name2"
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    value="12312312ss"
                    placeholder="写点啥"
                    rules={/^\d+$/}
                    errorMessage="请输入数字"
                    onlyBlurThrow
                    team="team1"
                />
                <textarea
                    onBlur={function(){console.log('onBlurtextarea');}}
                    onChange={function(){console.log('onChangetextarea');}}
                />
                <select onBlur={this.selectonchange.bind(this)} ref={control => {this.control = control}} defaultValue="1">
                    <option value="1">11</option>
                    <option value="2">22</option>
                    <option value="3">33</option>
                </select>
                <Select
                    name="hahahah"
                    rules={/^\d+$/}
                    errorMessage="来自select的错误"
                    className="formasd"
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    team='team2'
                    // multiple
                >
                    <option value="1">111</option>
                    <option value="2s">222s</option>
                    <option value="3">333</option>
                </Select>
                <Select
                    name="hahahah"
                    rules={/^\d+$/}
                    errorMessage="来自select的错误"
                    className="formasd"
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    // value={['1','2s']}
                    team='team1'
                    // multiple
                >
                    <option>111</option>
                    <option value="">222s</option>
                    <option value="3">333</option>
                </Select>
                <Select defaultValue="3"
                    name="hahasshah"
                    rules={/^\d+$/}
                    errorMessage="来自select的错误"
                    className="formasd"
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    team='team2'
                >
                    <option value="1">111</option>
                </Select>
                <select
                    onBlur={this.selectonchange.bind(this)}
                >
                    <option>1112</option>
                    <option value="">111</option>
                    <option value="3">1sssss11</option>
                </select>
                <input type="checkbox" id="checkbox123"/><label htmlFor="checkbox123">12321321312</label>
                <input type="checkbox" name="checkbox1" checked={this.state.checkbox1} value="yes" onChange={this.handleradio.bind(this)}/>
                <input type="radio" name="radio1" checked={this.state.radio1} value="yes" onChange={this.handleradio1.bind(this)}/>
                <input type="radio" name="radio1" checked={this.state.radio2} value="no" onChange={this.handleradio2.bind(this)}/>
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