import {
    Component
} from 'react';
import {
    IndexLink,
    Link
} from 'react-router';
class workDemo extends Component {
    render() {
        return (
            <div>
                workDemo
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

export default workDemo;