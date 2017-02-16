import React, { Component } from 'react';
import './App.scss';
import './assets/css/font-awesome-4.6.3/css/font-awesome.min.css';


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                {this.props.children}
            </div>
        )
    }
}
