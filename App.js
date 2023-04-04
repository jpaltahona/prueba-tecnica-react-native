import React from 'react';
import app  from './firebaseConfig';
import RootNavigation from './src/Navigation/RootNavigation';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import combineReducers from './src/redux';

export default function App() {
  const store = createStore(combineReducers, {}, applyMiddleware(reduxThunk));

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  ) 
}