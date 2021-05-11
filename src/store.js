import { createStore } from 'redux';
import appReducer from './reducer.js';

const store = createStore(appReducer);

export default store;