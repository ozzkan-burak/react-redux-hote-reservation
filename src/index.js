import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import App from './App';
import { HunelProvider, HunelCreditCard } from 'reactjs-credit-card';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { reducer } from './reducers';


const store = createStore(reducer, applyMiddleware(thunk));

const hunel = new HunelCreditCard();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HunelProvider config={hunel}>
        <App />
      </HunelProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

