/* tslint:disable:no-unused-variable */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import taskList from '../reducers/taskReducer';

const thunk = require('redux-thunk');
const rootReducer = combineReducers({ taskList });

const finalCreateStore = applyMiddleware(thunk)(createStore);

export default () => {
  return finalCreateStore(rootReducer);
}
