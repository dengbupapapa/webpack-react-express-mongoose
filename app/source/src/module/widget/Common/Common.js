import {
    Component,
    PropTypes,
    createClass
} from 'react';

import {
    Link,
    IndexLink
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

import './Common.less';

const MenuItemConfig = [{
    text: 'upload',
    href: '/index/upload',
    Icon: 'upload'
}, {
    text: 'workDemo',
    href: '/index/workDemo',
    Icon: 'user'
}, {
    text: 'workDemo2',
    href: '/index/workDemo2',
    Icon: 'video-camera'
}]

class Common extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        let {
            location: {
                pathname
            }
        } = this.props;

        let defaultSelectedKeys = '0';

        let MenuItemDom = MenuItemConfig.map((item, i) => {

            if (pathname == item.href) defaultSelectedKeys = i.toString();

            return <Menu.Item key={i}>
                        <Icon type={item.Icon} />
                        <span className="nav-text"><Link to={item.href}>{item.text}</Link></span>
                    </Menu.Item>
        });

        return (
            <div className='Common'>
                <Layout style={{ height: '100vh' }}>
                    <Sider style={{ overflow: 'auto' }} trigger={null}>
                        <div className='logo' />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultSelectedKeys]}>
                            {MenuItemDom}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} />
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                                {this.props.children}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            dbp demo ©2017 Created by dbp
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }

}

export default Common;