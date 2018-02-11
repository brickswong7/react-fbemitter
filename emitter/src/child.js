import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
class Child extends Component {
    constructor(){
        super();
        this.triggerEmitter = this.triggerEmitter.bind(this)
        this.state={
            age:27,
            name:'bricks'
        }
    }
    triggerEmitter(e){
        this.props.eventEimtter.emit('change','emitter trigger')
    }
    render(){
        return (
            <h1 onClick={this.triggerEmitter}> emitter trigger </h1>
        )
    }

}
Child.propTypes ={
    name : PropTypes.string,
    age : PropTypes.number
}

export default Child;