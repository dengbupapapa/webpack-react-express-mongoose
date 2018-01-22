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
    constructor(props) {

        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };

    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {

        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
            );
        }
        return (
            <div className='temporary-head'>
                <HeadContent/>
                {this.props.children && React.cloneElement(this.props.children, {
                  someProp: 'someValue'
                })}
            </div>
        )
    }
}