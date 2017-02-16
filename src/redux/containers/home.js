import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { showNavBar, getPostsList } from '../action/homeAction';
import HomePage from '../../components/Home/HomePage.jsx';


class Home extends Component {
    render() {

        const {onshowNavBarClick, isShow ,routes, response, getPostsList} = this.props;

        return (
            <div>
                <HomePage toggleNav={onshowNavBarClick} isShow={isShow} routes={routes} 
                        response = {response} getPostsList ={getPostsList}
                        />
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        isShow: state.changeNavbar.isShow,
        response: state.getPostsList.response
    }
}

function mapDispatchToProps(dispatch) {
    
    return {
        onshowNavBarClick: () => dispatch(showNavBar()),
        getPostsList: (params) => dispatch(getPostsList(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)



