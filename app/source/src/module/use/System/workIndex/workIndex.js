import {
    Component
} from 'react';
import {
    IndexLink,
    Link
} from 'react-router';

class workIndex extends Component {

    constructor(props) {

        super(props);

    }

    componentDidMount() { //挂载后

        this.props.sendAsyncAction({
            statusAction: this.props.loadIngAction,
            start: true,
            end: false
        }, '/async/post', {
            method: 'post'
        });

        this.props.localStorageDemo('asdsadasd2132516356721536712');

    }

    render() {
        return (
            <div>
                <div>{this.props.loadIngState.toString()}</div>
                <div>----------------------------------------------------------------</div>
                workIndex loginState:{this.props.loginState}
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

import * as async from 'rActions/async';
import * as loadIng from 'rActions/loadIng';
import * as localStorageDemo from 'rActions/localStorageDemo';

const actiontor = Object.assign({}, async, loadIng, localStorageDemo);

import connectReduxToReact from 'jStatic/connectReduxToReact'

// const State = (state) => state;
const loadIngState = state => state.loadIngAction;
// const sendAsyncState = (state) => state.sendAsyncAction;

export default connectReduxToReact(workIndex, {
    // State,
    loadIngState,
    // sendAsyncState
}, actiontor)