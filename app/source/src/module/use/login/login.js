import {
    Component
} from 'react';
import {
    IndexLink,
    Link,
    browserHistory
} from 'react-router';
import {
    Layout,
    Menu,
    Icon
} from 'antd';
const {
    Header,
    Content,
    Footer,
    Sider
} = Layout;
class login extends Component {

    constructor(props) {

        super(props);

    }

    componentDidMount() { //挂载后
        // console.log(this.props);
    }

    handleClick(event) {

        this.props.setLoginAction(5 + this.props.loginState);
        browserHistory.push('/index');

    }

    render() {
        fetch('/async/post', {
                method: 'GET'
            })
            .then((response) => response.json())
            .then((json) => console.log(json));
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider style={{ overflow: 'auto' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="upload" />
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user" />
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="bar-chart" />
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="cloud-o" />
                            <span className="nav-text">nav 5</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="appstore-o" />
                            <span className="nav-text">nav 6</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="team" />
                            <span className="nav-text">nav 7</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="shop" />
                            <span className="nav-text">nav 8</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            ...
                            <br />
                            Really
                            <br />...<br />...<br />...<br />
                            long
                            <br />...<br />...<br />...<br />...<br />...<br />...
                            <br />...<br />...<br />...<br />...<br />...<br />...
                            <br />...<br />...<br />...<br />...<br />...<br />...
                            <br />...<br />...<br />...<br />...<br />...<br />...
                            <br />...<br />...<br />...<br />...<br />...<br />...
                            <br />...<br />...<br />...<br />...<br />...<br />...
                            <br />...<br />...<br />...<br />...<br />...<br />
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
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        dbp demo ©2017 Created by dbp
                    </Footer>
                </Layout>
            </Layout>
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
    loginState
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(actiontor, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(login);