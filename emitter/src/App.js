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
  }
  componentDidMount(){
    var curSelf = this ;
    var rootToken = emitter.addListener('change',function(...args){
      var contenText = [...args];
      curSelf.setState({
        text:contenText
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
        <Child  eventEimtter={emitter} />
      </div>
    );
  }
}

export default App;
