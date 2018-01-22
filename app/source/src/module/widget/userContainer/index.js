import {
    Component
} from 'react';

import './userContainer.less';

import {
    IndexLink,
    Link
} from 'react-router';

import Sidebar from '@widgets/sidebar';

class UserContainer extends Component {
    state = {
        clientHeight: '0px'
    }
    componentDidMount() {
        // console.log(document.documentElement.clientHeight);
        // this.setState({
        //     clientHeight: `${document.documentElement.clientHeight}px`
        // });
    }
    render() {
        // let {
        //     clientHeight
        // } = this.state;
        return (
            <div className='project-user-container'>
                <div className='project-user-container-sidebar'>
                    <Sidebar/>
                </div>
                <div className='project-user-container-inner'>
                    <div className='project-user-container-inner-title'>
                        <div className='project-user-container-inner-title-head'></div>
                        <div className='project-user-container-inner-title-describe'>我的列表</div>
                        <div className='project-user-container-inner-title-new'></div>
                    </div>
                    <div className='project-user-container-inner-content'>
                        {this.props.children && React.cloneElement(this.props.children, {
                          someProp: 'someValue'
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

import * as actiontor from '@actions/login';
import connectReduxToReact from '@js/connectReduxToReact';

let loginState = (state) => state.login;
let stateOpts = {
    loginState: loginState
}

export default connectReduxToReact(UserContainer, stateOpts, actiontor);