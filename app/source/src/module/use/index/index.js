import {
    Component
} from 'react';

import './index.less';

import {
    IndexLink,
    Link
} from 'react-router';

import {
    Button,
    Slider,
    Switch
} from 'antd';

class index extends Component {
    state = {
        disabled: false,
    };
    handleDisabledChange = (disabled) => {
        this.setState({
            disabled
        });
    }
    render() {
        const {
            disabled
        } = this.state;
        return (
            <div className='project-index'>
                <div className='project-index-title'>
                    <div className='project-index-title-head'></div>
                    <div className='project-index-title-describe'>我的列表</div>
                    <div className='project-index-title-new'></div>
                </div>
                <div className='project-index-content'>
                    <div className='project-index-query'>
                        <input className="project-index-query-input" placeholder="搜索"/>
                    </div>
                    <ul className='project-index-list'>
                        <li className='project-index-list-li'>content..</li>
                        <li className='project-index-list-li'>content..</li>
                        <li className='project-index-list-li'>content..</li>
                        <li className='project-index-list-li'>content.</li>
                        <li className='project-index-list-li'>content.</li>
                        <li className='project-index-list-li'>content..</li>
                        <li className='project-index-list-li'>content.</li>
                        <li className='project-index-list-li'>content.</li>
                        <li className='project-index-list-li'>content...</li>
                        <li className='project-index-list-li'>content...</li>
                        <li className='project-index-list-li'>content...</li>
                        <li className='project-index-list-li'>content...</li>
                        <li className='project-index-list-li'>content...</li>
                        <li className='project-index-list-li'>content...</li>
                        <li className='project-index-list-li'>content...</li>
                        <li className='project-index-list-li'>content...</li>
                        <li className='project-index-list-li'>content...</li>
                        <li className='project-index-list-li'>content...</li>
                    </ul>
                </div>
                {/*<div className='project-index-footer'></div>*/}
            </div>
        );
    }
}

import {
    connect
} from 'react-redux'
import {
    bindActionCreators
} from 'redux'
import {
    createSelector,
    createStructuredSelector
} from 'reselect'
import * as actiontor from '@actions/login';

const loginState = (state) => state.login;

// const countGetBannerScroll = createSelector(
//     getBannerScroll,
//     (bannerScroll) => {
//         console.log(bannerScroll);
//     }
// );

const mapStateToProps = createStructuredSelector({
    loginState: loginState
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(actiontor, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(index);