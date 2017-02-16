import { REQIEST_POST, RECEIVE_POSTS, REQUEST_ERROR, NAV_SHOW } from '../action/index';
import { combineReducers } from 'redux';

//改变navbar状态
const changeNavbar = (state = {
        isShow: false   
    }, action) => {
        switch(action.type) {
            case NAV_SHOW:
                return {
                    isShow: !state.isShow
                }
                break
            default:
                return state
        } 
}

const getPostsList = (state= {
        response: []
    }, action) => {
        switch(action.type) {
            case REQIEST_POST:
                return {
                    response: ['正在加载中！']
                }
                break
            case RECEIVE_POSTS:
                return {
                    response: action.msg
                }
                break
            case REQUEST_ERROR:
                return {
                    response: ['请求error']
                }
                break
            default:
                return state
        }
}

const rootReducer = combineReducers({

    changeNavbar,
    getPostsList

})

export default rootReducer