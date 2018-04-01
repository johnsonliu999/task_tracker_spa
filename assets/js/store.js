import root_reducer from './reducers'
import {createStore} from 'redux'
const store = createStore(root_reducer);

export default store;
