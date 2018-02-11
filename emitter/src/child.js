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