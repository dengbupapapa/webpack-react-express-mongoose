import {
    Component
} from 'react';

import './creationDetail.less';

import {
    IndexLink,
    Link
} from 'react-router';

class CreationDetail extends Component {
    render() {
        return (
            <div className='project-creation-detail-content'>
                creation-detail
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

export default connectReduxToReact(CreationDetail, stateOpts, actiontor);