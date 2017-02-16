import React, { Component } from 'react';
import Header from '../Header/header';
import Navbar from '../NavBar/navbar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import './Home.scss';
import { Link } from 'react-router';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this._handleScroll.bind(this);

        let path = props.routes[props.routes.length-1].path;
        let tab = ((path === 'home')?'all':path) || 'all';
        this.state = {
            posts: [],
            tab: tab,
            page: 1,
            scrollDisable: false,
            tabFlag: true  
        }
    }

    fetch(tabFlag) {

        axios.get('https://cnodejs.org/api/v1/topics', {
            params: {
                page: this.state.page,
                tab: this.state.tab,
                limit: 15,
                mdrender: true
            }
        }).then(response => {

            let posts = tabFlag? response.data.data: this.state.posts.concat(response.data.data);  
            this.setState({ 
                posts: posts, 
                scrollDisable: false
            });

        }).catch(error => {
            console.log(error)
        });      
    }

    getTab(str) {
        let tabName = {
            share: "分享",
            ask: "问答",
            job: "工作",
            good: "精华"
        };

        return tabName[str]
    }

    dateFormat(datetime) {
        const oldTime = new Date(datetime).getTime();
        const now = new Date().getTime();
        const difference = now - oldTime;
        let result='';
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const halfamonth = day * 15;
        const month = day * 30;
        const year = month * 12;
        
        const _year = difference/year;
        const _month =difference/month;
        const _week =difference/(7*day);
        const _day =difference/day;
        const _hour =difference/hour;
        const _min =difference/minute;

        if(_year>=1) {
            result=   ~~(_year) + "年前"
        } 
        else if(_month>=1) {
            result=   ~~(_month) + "月前" 
        } 
        else if(_week>=1) {
            result=   ~~(_week) + "周前"
        }
        else if(_day>=1) {
            result=   ~~(_day) +"天前"
        }
        else if(_hour>=1) {
            result=   ~~(_hour) +"小时前"
        }
        else if(_min>=1) {
            result=   ~~(_min) +"分钟前"
        }
        else result="刚刚";
        return result;
    }


    //下拉加载时提交的异步请求
    _handleScroll(event) {

        const pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        const scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        if (scrollHeight && pageHeight - viewportHeight - scrollHeight < 30) {

            let newPage = this.state.page + 1;

            if (!this.state.scrollDisable) {
                this.setState({
                    page: newPage,
                    scrollDisable:true
                }, () => {
                    this.fetch(false);
                })
            }
        }
    }

    //监听路由变化提交相应的ajax请求
    componentWillReceiveProps(newProps) {

        var oldPath = this.props.routes[this.props.routes.length-1].path;
        var currentPath = newProps.routes[newProps.routes.length-1].path;
        
        if (oldPath !== currentPath) {
            window.scrollTo(0, 0);

            this.setState({
                tab: newProps.routes[newProps.routes.length-1].path,
                page: 1
            }, () => {
                // this.fetch(this.state.tabFlag)

                const params = {tab: this.state.tab,page:1}
                this.props.getPostsList(params)
            })
        }
    }

    //初次加载组件时提交的ajax请求
    componentDidMount() {
        const params = {tab: this.state.tab,page:1}
        this.props.getPostsList(params);
        document.addEventListener('scroll',this.handleScroll, false);
    }

    componentWillUnmount() {

        document.removeEventListener('scroll', this.handleScroll, false);

    }

    render() {
        return (
            <div className="wrap">
                    <Header tab={this.state.tab} toggleNav={this.props.toggleNav} />
                    <ReactCSSTransitionGroup transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={400}>
                        {this.props.isShow && <Navbar toggleNav={this.props.toggleNav} />}
                    </ReactCSSTransitionGroup>
                <div className="postList" id="postList">
                    <ul>
                      {this.props.response && this.props.response.map(post =>
                        <li key={post.id}>
                            <Link to={`/article/${post.id}`}>
                                <h3>
                                    <span className={post.top || post.good?'top':''}>{post.top?'置顶':(post.good?'精华':(this.getTab(post.tab)))}</span>
                                    {post.title}
                                </h3>
                                <div className="postInfor">
                                    <div className="authorName">{post.author?post.author.loginname:''}</div>
                                    <div className="time">{this.dateFormat(post.last_reply_at)}</div>
                                    <div className="visit">
                                        <span className="reply"><i className="fa fa-commenting fa-1x"></i> {post.reply_count}</span>
                                        <span><i className="fa fa-eye fa-1x"></i> {post.visit_count}</span> 
                                    </div>
                                </div>
                            </Link>
                        </li>                 
                      )}
                    </ul>
                </div>
            </div>
        )
    }
}