import {
    Component
} from 'react';
import Base from './base';

import {
    formsWidgetNamesArray
} from './config';

export default class Textarea extends Component {

    static displayName = formsWidgetNamesArray[2]

    render() {
        return (
            <Base {...this.props} isTextarea>
                <textarea/>
            </Base>
        )

    }

}