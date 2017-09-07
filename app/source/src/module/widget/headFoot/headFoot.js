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
    Icon
} from 'antd';
// import Box from 'sModule/public/common/marginBox';
// import styleBtn from 'cModule/button';
// import styleIpt from 'cModule/input';

class HeadContent extends Component {
    constructor(props) {

        super(props);

    }

    render() {
        return (
            <div className='head fn-clear'>
                <div className='fn-left fn-clr-fff'>
                    <IndexLink to='/' className='fn-clr-fff'><h2>一个单纯的LOGO</h2></IndexLink>
                    <Link to='/queueSlide1' className='fn-clr-fff'><h4 className='fn-ocy-9'>我是你的小呀小LOGO</h4></Link>
                </div>
            </div>
        );
    }
}

class FootContent extends Component {

    render() {

        return (
            <div className='foot'>
                Foot
            </div>
        );
    }
}

// import RouterTransition from '../lib/routerTransition'
// animateType='queueSlide' runpath={['/','/indexType2','/indexType3']} animateType='levelSlide' parentPath='/' sonPath='/indexType2'
export default class headFoot extends Component {
    render() {
        return (
            <div className='fn-bgd-fff fn-h-rate100'>
                <HeadContent/>
                {this.props.children}
                <FootContent/>
            </div>
        )
    }
}