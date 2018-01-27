import {
    Component
} from 'react';
import ComplexBase from './complexBase';

import {
    formsWidgetNamesArray
} from './config';

export default class Checkbox extends Component {

    static displayName = formsWidgetNamesArray[3]

    render() {
        return (
            <ComplexBase {...this.props} isCheckbox>
                <input type="checkbox"/>
            </ComplexBase>
        )

    }

}