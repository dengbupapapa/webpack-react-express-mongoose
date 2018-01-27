import {
    Component
} from 'react';
import Base from './base';

import {
    formsWidgetNamesArray
} from './config';

export default class Select extends Component {

    static displayName = formsWidgetNamesArray[1]

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element
        ]).isRequired
    }
    // componentDidMount(){
    //     console.log(this.input)
    // }

    // componentWillUpdate(){
    //     console.log(this.input)
    // }

    render() {

        let {
            children,
            ...other
        } = this.props;


        return (
            <Base {...other} isSelect>
                <select>
                    {children}
                </select>
            </Base>
        )

    }

}