import {
    Component
} from 'react';
import Input from './input';
import {
    formsWidgetNamesArray
} from './config';

let debug = Debug('formsWidget:form');

export default class Form extends Component {


    constructor(props) {
        super(props);
        this.state = {
            validArray:[]
        }
    }

    // componentDidMount() {
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     debug('this.state:', this.state);
    // }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.validArray.includes(false))return//如果有验证不通过的
        onSubmit(event);
    }

    render() {

        let {
            onSubmit,
            ...other
        } = this.props;

        let children = React.Children.map(this.props.children, (item, index) => {

            if (React.isValidElement(item)) {

                let {
                    type: {
                        displayName
                    }
                } = item;
                if (~formsWidgetNamesArray.indexOf(displayName)) {

                    return React.cloneElement(item, {
                        validCallback: (result)=>{
                            // console.log(result);
                        }
                    })

                }

            }

            return item

        })
        // debug(this.props.children);

        return (
            <form onSubmit={this.handleSubmit.bind(this)} {...other}>
                {children}
            </form>
        )
    }
}