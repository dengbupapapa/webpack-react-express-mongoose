import {
    Component
} from 'react';
import {
    Link,
    IndexLink
} from 'react-router';

class HeadContent extends Component {
    constructor(props) {

        super(props);

    }

    render() {
        return (
            <div className='temporary-head-box'>
                <Link to='/sign/in' className='fn-clr-fff'>登录</Link>
                {' | '}
                <Link to='/sign/register' className='fn-clr-fff'>注册</Link>
                {' | '}
                <Link to='/user/creation/list' className='fn-clr-fff'>我的谱子</Link>
                {' | '}
                <Link to='/user/creation/detail' className='fn-clr-fff'>我的谱子详情</Link>
            </div>
        );
    }
}

export default class headFoot extends Component {
    render() {
        return (
            <div className='temporary-head'>
                <HeadContent/>
                {this.props.children}
            </div>
        )
    }
}