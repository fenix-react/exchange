import React from 'react';
import ReactDOM from 'react-dom';
import './assets/fonts/irsans.ttf'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import authReducer from './Redux/Reducers/AuthReducer'
import UiReducer from './Redux/Reducers/UiReducer';
import QrCode from './Redux/Reducers/2faReducer'
import usrReducer from './Redux/Reducers/userReducer'
import bankReducer from './Redux/Reducers/BankReducer'
import {Provider} from 'react-redux'

const rootReducer = combineReducers({auth: authReducer, ui: UiReducer, twofa: QrCode, user: usrReducer,bank: bankReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
