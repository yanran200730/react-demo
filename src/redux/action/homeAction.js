//NAV 显示、隐藏
import { REQIEST_POST, RECEIVE_POSTS, REQUEST_ERROR, NAV_SHOW } from './index.js';
import axios from 'axios';


export const showNavBar = () => ({

    type: NAV_SHOW,
})


export const getPostsList = (fetchParams) => dispatch => {

	dispatch({
		type: REQIEST_POST,
		msg: 'request is start'
	});

    axios.get('https://cnodejs.org/api/v1/topics', {
        params: {
            page: fetchParams.page,
            tab: fetchParams.tab,
            limit: 15,
            mdrender: true
        }
    }).then(response => {
    	dispatch({
	    	type: RECEIVE_POSTS,
	    	msg: response.data.data    		
    	})
    }).catch(error => {
        dispatch({
 	    	type: REQUEST_ERROR,
	    	msg: 'error'   	       	
        })
    });   
}

