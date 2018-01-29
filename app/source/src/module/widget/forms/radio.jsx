import {
    Component
} from 'react';
import RadioBase from './radioBase';

import {
    formsWidgetNamesArray
} from './config';

export default class Radio extends Component {

    static displayName = formsWidgetNamesArray[4]

    render() {
        return (
            <RadioBase {...this.props} isRadio>
                <input type="radio"/>
            </RadioBase>
        )

    }

}