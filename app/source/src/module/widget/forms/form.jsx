/*
**
作者:dengbupapapa
功能有:
1.验证
2.分组 team
*/

/*
 **
 *options
 *@parmas {string} [team] 分组
 *@parmas {func} [onSubmit] 提交回调
 */

import {
    Component
} from 'react';
import {
    valid,
    getValues
} from './method';
import {
    formsWidgetNamesArray
} from './config';

let debug = Debug('formsWidget:form');

export default class Form extends Component {

    static childContextTypes = {
        reactFormsTeam: PropTypes.string
    }

    getChildContext() {
        return {
            reactFormsTeam: this.props.team
        }
    }

    static defaultProps = {
        onSubmit: () => {},
        team: Math.floor(new Date().getTime() * Math.random()).toString()
    }

    static propTypes = {
        onSubmit: PropTypes.func,
        team: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            validArray: []
        }
    }

    componentWillMount() {}

    // componentDidMount() {
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     debug('this.state:', this.state);
    // }

    handleSubmit(event) {

        event.preventDefault();

        let {
            onSubmit,
            team
        } = this.props;

        //验证通过才执行自定义
        if (valid(team)) onSubmit(event, {
            values: getValues(team)
        });

    }

    render() {

        let {
            onSubmit,
            team,
            ...other
        } = this.props;

        // let children = React.Children.map(this.props.children, (item, index) => {

        //     if (React.isValidElement(item)) {

        //         let {
        //             type: {
        //                 displayName
        //             }
        //         } = item;
        //         if (~formsWidgetNamesArray.indexOf(displayName)) {

        //             return React.cloneElement(item, {
        //                 team
        //             })

        //         }

        //     }

        //     return item;

        // })

        return (
            <form onSubmit={this.handleSubmit.bind(this)} {...other}>
                {this.props.children}
            </form>
        )
    }
}