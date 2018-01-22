import {Component} from 'react';
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

    render(){
        return(
            <div>
                <ContextLayer2/>
                123456
                <MouseTracker/>
            </div>
        )
    }

}



class ContextLayer2 extends Component {

    render(){
        return(
            <div>
                <ContextLayer3/>
                <x-search name="demo">123</x-search>
            </div>
        )
    }

}

class ContextLayer3 extends Component {

    render(){
        // console.log(this.context);
        // throw new Error(12321312312);
        return(
            <div>{this.context.datademo}</div>
        )
    }
    static contextTypes={
        datademo:PropTypes.string
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
    this.state = { x: 0, y: 0 };
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