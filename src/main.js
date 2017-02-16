import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './redux/containers/home.js';
import Article from './components/Article/article.jsx';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/Reducer/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createLogger  from 'redux-logger';

const composeEnhancers = composeWithDevTools({
// Specify here name, actionsBlacklist, actionsCreators and other options
});


const logger = createLogger();

let store = createStore(

    rootReducer,
    composeEnhancers(applyMiddleware(thunk,logger))
)



const scrollTop= function() {

    window.scrollTo(0 ,0);
}


const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='home' component={Home} onEnter= {scrollTop} />
        <Route path='job' component={Home} onEnter= {scrollTop} />
        <Route path='share' component={Home} onEnter= {scrollTop}/>
        <Route path='ask' component={Home} onEnter= {scrollTop}/>
        <Route path='good' component={Home} onEnter= {scrollTop}/>
        <Route path='article/:id' component={Article} onEnter= {scrollTop}/>
    </Route>
);


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
     </Provider>,
    document.getElementById('app')
);
