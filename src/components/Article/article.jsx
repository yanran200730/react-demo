import React, { Component } from 'react';
import Header from '../Header/header';
import Navbar from '../NavBar/navbar';

import axios from 'axios';
import Prism from "prismjs";
import './../../assets/css/prism.css';
import './article.scss';


export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: '',
            username: '',
            authorImgUrl: '',
            time: '',
            comments: [],
            tab: ''
        }
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

    clickBack() {
        this.setState({
            navState: !this.state.navState
        })
    }

    componentDidMount() {
        
        const articleId = this.props.params.id;

        axios.get('https://cnodejs.org/api/v1/topic/' + articleId, {
            params: {
                mdrender: true
            }
        }).then(response => {

            this.setState({ 
                content: response.data.data.content, 
                title: response.data.data.title,
                username: response.data.data.author.loginname,
                authorImgUrl: response.data.data.author.avatar_url,
                time: response.data.data.create_at,
                comments: response.data.data.replies.reverse(),
                tab: response.data.data.tab
            }, () => {
                Prism.highlightAll();
            });
           
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        return (
            <div className="wrap">
                <Header changeNavState={this.clickBack.bind(this)} tab={this.state.tab}/>
                <div className="article">
                    <div className="contentHeader">
                        <h1>{this.state.title}</h1>
                        <div className="author">
                            <img src={`${this.state.authorImgUrl}`} className="userImg" />
                            <span className="user">{this.state.username}</span>
                            <span>{this.dateFormat(this.state.time)}</span>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: `${this.state.content}`}} className="content">
                    </div>
                    <div className="comment">
                        <div className="title">
                            <h2>最新评论</h2>
                        </div>
                        <ul>
                            {this.state.comments.map(comment => 
                                <li key={comment.id}>
                                    <div className="author visit">
                                        <img src={`${comment.author.avatar_url}`} className="userImg" />
                                        <span className="user">{comment.author.loginname}</span>
                                        <span>{this.dateFormat(comment.create_at)}</span> 
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: `${comment.content}`}} className="commentContent"/>
                                </li>    
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}