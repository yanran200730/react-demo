import React, { Component } from 'react';
import './header.scss';

export default class Header extends Component {
    constructor(props) {
        super(props);

        const tab = this.props.tab;

        this.handle = this.checkPath()? this._back.bind(this):this._toggle.bind(this);//不同的页面绑定不同函数
        this.state = {
            tabName: this.getTab(tab)
        }
    }

    componentWillReceiveProps(newProps) {
        const pathname = location.pathname.split('/')[location.pathname.split('/').length -1];
        const tabName = (pathname) ? this.getTab(newProps.tab) : "全部";

        if (newProps.tab == pathname) {
            this.setState({
                tabName: this.getTab(newProps.tab)
            })
        } else {
            return 
        }
    }

    getTab(tab) {

        const tabName = {
            share: "分享",
            ask: "问答",
            job: "工作",
            good: "精华",
            all: "全部"
        };

        return tabName[tab]
    }

    _toggle() {
        this.props.toggleNav();
    }

    _back() {
        history.back();
    }

    checkPath() {
        if (location.pathname.split('/').length >2) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div className="header">
                <span className="icon menu" onClick={this.handle}>
                    <i className={this.checkPath()? 'fa fa-angle-left fa-2x' :'fa fa-navicon'}></i>
                </span>
                <span className="title">
                    <span className="logo"></span>
                    <span className="title-name">{this.checkPath()?'详情':this.state.tabName}</span>
                </span>
                <span className="icon add">
                    <i className="fa fa-paper-plane-o"></i>
                </span>               
            </div>
        )
    }
} 



