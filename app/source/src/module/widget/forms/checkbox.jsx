import {
    Component
} from 'react';
import CheckboxBase from './checkboxBase';

import {
    formsWidgetNamesArray
} from './config';

export default class Checkbox extends Component {

    static displayName = formsWidgetNamesArray[3]

    render() {
        return (
            <CheckboxBase {...this.props} isCheckbox>
                <input type="checkbox"/>
            </CheckboxBase>
        )

    }

}