import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { showMsg } from './redux/action/navState.js'

export default class Test extends Component {
    render() {
        console.log(this.props)

        return (
            <div>
                <p>{ this.props.value }</p>
                <button onClick={this.props.showMsg}>click me</button>
                <p>11111</p>
            </div>
        )
    }
}

