/* tslint:disable:no-unused-variable */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import taskList from '../reducers/taskReducer';
import taskCompletedList from '../reducers/taskCompletedReducer';

const thunk = require('redux-thunk');
const rootReducer = combineReducers({ taskList, taskCompletedList });

const finalCreateStore = applyMiddleware(thunk)(createStore);

export default () => {
  return finalCreateStore(rootReducer);
}
