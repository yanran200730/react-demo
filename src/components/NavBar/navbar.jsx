import React, { Component } from 'react';
import './navbar.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    toggle(e) {
        e.stopPropagation()
        this.props.toggleNav();
    }

    render() {
        return (
            <nav className="nav">
                <div className="login">
                    <a><i className="fa fa-user"></i>登录</a>
                </div>
                <ul className="menu-list">
                    <li className="menu-item">
                        <Link to={`/`} onClick={this.toggle.bind(this)}><i className="fa fa-bars"></i>
                        <span>全部</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to={`/good`} onClick={this.toggle.bind(this)}><i className="fa fa-star"></i>
                            <span>精华</span>
                        </Link>
                    </li> 
                    <li className="menu-item">
                        <Link to={`/share`} onClick={this.toggle.bind(this)}><i className="fa fa-share-alt"></i>
                            <span>分享</span>
                        </Link>
                    </li> 
                    <li className="menu-item">
                        <Link to={`/ask`} onClick={this.toggle.bind(this)}><i className="fa fa-question"></i>
                            <span>问答</span>
                        </Link>
                    </li> 
                    <li className="menu-item">
                        <Link to={`/job`} onClick={this.toggle.bind(this)}><i className="fa fa-user-plus"></i>
                            <span>招聘</span>
                        </Link>
                    </li> 
                    <li className="menu-item">
                        <a href=""><i className="fa fa-bell"></i></a>
                        <span>消息</span>
                    </li> 
                    <li className="menu-item">
                        <a href=""><i className="fa fa-info-circle"></i></a>
                        <span>关于</span>
                    </li>
                </ul>
            </nav>
        )
    }
} 