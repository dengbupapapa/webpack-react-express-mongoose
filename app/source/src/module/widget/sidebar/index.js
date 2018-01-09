import {
    Component
} from 'react';

import './sidebar.less';

import {
    IndexLink,
    Link
} from 'react-router';

class Sidebar extends Component {
    render() {
        return (
            <div className='project-sidebar'>sidebar
                
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);