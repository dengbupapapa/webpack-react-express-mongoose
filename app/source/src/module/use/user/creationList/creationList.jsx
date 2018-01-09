import {
    Component
} from 'react';

import './creationList.less';

import {
    IndexLink,
    Link
} from 'react-router';

class CreationList extends Component {

    render() {
        return (
            <div className='project-creation-list-content'>
                <div className='project-creation-list-query'>
                    <input className="project-creation-list-query-input" placeholder="搜索"/>
                </div>
                <ul className='project-creation-list-ul'>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                    <li className='project-creation-list-li'><Link to='/user/creationDetail'>content..</Link></li>
                </ul>
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

export default connectReduxToReact(CreationList, stateOpts, actiontor);