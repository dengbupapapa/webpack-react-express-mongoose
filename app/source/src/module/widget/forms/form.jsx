import {Component} from 'react';
let debug = Debug('formsWidget');

export default class Form extends Component {

    handleSubmit(event){
        event.preventDefault();
    }

    render(){

        let {onSubmit,...other}= this.props;

        return(
            <form onSubmit={this.handleSubmit.bind(this)} {...other}>
                {this.props.children}
            </form>
        )
    }
}
