import {
    Component
} from 'react';
import {
    Form,
    Input,
    Checkbox,
    Radio
} from '@widgets/forms';
// import ReactDOM from 'react-dom';
// class XSearch extends HTMLElement {
//   connectedCallback() {
//     const mountPoint = document.createElement('span');
//     this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

//     const name = this.getAttribute('name');
//     const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
//     ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
//   }
// }
// customElements.define('x-search', XSearch);


class ContextLayer1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hah: true
        };
    }
    render() {
        return (
            <div>
                <div onClick={()=>{this.setState({hah:!this.state.hah})}}>123</div>
                <Checkbox name="checkbox1" value="yes" checked required errorMessage="必选一个" minNum={2} maxNum={3}/>
                <Checkbox name="checkbox1" value="no" errorMessage="至少选两个"/>
                <Checkbox name="checkbox1" value="no" errorMessage="最多选三个"/>
                <Checkbox
                    name="name5"
                    rules={function(values){
                        console.log(values)
                        return true
                    }}
                    checked
                    errorMessage="反正就是选错了"
                />
                <Radio name="name5" value="1" required/>
                <Radio name="radio1" rules={function(value){
                    console.log(value);
                    return value=='1';
                }} onChange={function(){console.log('onChange')}} errorMessage="来自radio的错误"/>
                <Radio name="radio1"checked value="3"/>
                {this.state.hah?<Input team="team3" name="name5" className="formasd" defaultValue="12312312s" rules={/^\d{3}$/} errorMessage="就是一直报错"/>:null}
            </div>
        )
    }

}


class ContextLayer2 extends Component {

    render() {
        return (
            <div>
                <ContextLayer3/>
                <x-search name="demo">123</x-search>
            </div>
        )
    }

}

class ContextLayer3 extends Component {

    render() {
        // console.log(this.context);
        // throw new Error(12321312312);
        return (
            <div>{this.context.datademo}</div>
        )
    }
    static contextTypes = {
        datademo: PropTypes.string
    }
}

class Cat extends Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
        );
    }
}

class Mouse extends Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {
            x: 0,
            y: 0
        };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
        );
    }
}

class MouseTracker extends Component {
    render() {
        return (
            <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
        );
    }
}

export default ContextLayer1