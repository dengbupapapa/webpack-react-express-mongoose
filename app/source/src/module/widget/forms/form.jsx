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
        reactFormsTeam: PropTypes.oneOfType([
            PropTypes.symbol,
            PropTypes.string
        ])
    }

    getChildContext() {
        return {
            reactFormsTeam: this.state.team
        }
    }

    static defaultProps = {
        onSubmit: () => {}
    }

    static propTypes = {
        onSubmit: PropTypes.func,
        team: PropTypes.oneOfType([
            PropTypes.symbol,
            PropTypes.string
        ])
    }

    constructor(props, a) {
        super(props);
        this.state = {
            validArray: [],
            team: this.props.team||Symbol('FORM_DEFAULT_TEAM')
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
            onSubmit
        } = this.props;
        let {
            team
        } = this.state;
        //验证通过才执行自定义
        valid(team).then((result) => {
            if (result) onSubmit(event, {
                values: getValues(team)
            })
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