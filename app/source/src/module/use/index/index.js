import {
    Component
} from 'react';

import img from 'iStatic/banner1.jpg';

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
            <div className='div'>
                index<input className='input-main focus'/>
                <a href={img}>diandianwo</a>
                <div>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                </div>
                <div>
                    <Slider defaultValue={30} disabled={disabled} />
                    <Slider range defaultValue={[20, 50]} disabled={disabled} />
                    Disabled: <Switch size="small" checked={disabled} onChange={this.handleDisabledChange} />
                </div>
                <img className='img' src={img}/>
                <Link to='/index'>workindex</Link>
                {' '}
                <Link to='/index/workDemo'>workDemo</Link>
                {' '}
                <Link to='/index/workDemo2'>workDemo2</Link>
                {' '}
                <Link to='/login'>login</Link>
                {' '}
                <IndexLink to='/'>index</IndexLink>
                {' '}
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
import * as actiontor from 'rActions/login';

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