emitter application

注意：存在注入危险代码的风险


first step：
install： npm install fbemitter -S
second  import

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Child from './child';
var {EventEmitter} = require('fbemitter');

//首先在root组件定义 emitter
var emitter = new EventEmitter();
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text:"default text "
    }; 
    var curSelf = this ;
    var rootToken = emitter.addListener('childChange',function(...args){
      var contenText = [...args];
        curSelf.setState({
        text:contenText,
        rootToken
      })
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.text}</h1>
        </header>
        <Child  eventEimtter={emitter} idToken={this.rootToken} />
      </div>
    );
  }
}

export default App;


child.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
class Child extends Component {
    constructor(){
        super();
        this.triggerEmitter = this.triggerEmitter.bind(this)
        this.state={
            type:'true',
            exit:1
        }
    }
    triggerEmitter(e){
        if( e.target.getAttribute('custom-type') == 'true' ){
            this.props.eventEimtter.emit('childChange','emitter trigger')
            this.setState({
                type:'false',
                //exit:1
            })
        }else{
            this.setState({
                exit:0
            })
        }
    }
    componentWillUnmount(){
        this.props.idToken.remove()
    }
    render(){
        if(this.state.exit == 1 ){
            return (
                <button onClick={this.triggerEmitter} custom-type={this.state.type}> emitter trigger </button>
            )
        }else{
            return null
        }
    }

}
Child.propTypes ={
    name : PropTypes.string,
    age : PropTypes.number
}

export default Child;
