import {
    IndexLink
} from 'react-router';

import {
    Component
} from 'react';

class app404 extends Component {
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

export default app404;