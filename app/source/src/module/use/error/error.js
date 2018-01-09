import {
    IndexLink
} from 'react-router';

import {
    Component
} from 'react';

class error extends Component {
    render() {
        return (
            <div>
                app404
                <br/>
                <IndexLink to="/">index</IndexLink>
            </div>
        )
    }
}

export default error;