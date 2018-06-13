/**
 this is the root file for the application
 create redux store and add reduxThunk as a middleware
 pass in the created store to the Provider component and wrap the entire application. so we have access to redux state

 add redux dev tool ============ SHOULD BE REMOVED IN PRODUCTION ====================
 will check for 'token' in localStorage and load the value to our initialState "must match the same structure as the reducer"
 */
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers/index';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';

const store = createStore(
	reducers,
	{ 
		auth: { authenticated: localStorage.getItem('token') }
	},
	composeWithDevTools(
		applyMiddleware(reduxThunk)
	)
)

ReactDom.render(
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Route path="/" exact component={Welcome} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/feature" exact component={Feature} />
			</App>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
