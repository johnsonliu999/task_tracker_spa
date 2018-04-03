import {combineReducers} from 'redux';
import {LOGIN_SUCCEED, RECEIVED_TASKS, RECEIVED_USERS, FILL_FORM} from "./actions";
import {UPDATE_FORM, EMPTY_FORM} from './actions';
import deepFreeze from "deep-freeze";

const initialState = {
  user: {
    user_id: "",
    user_email: "",
    token: null,
  },
  users: [],
  tasks: [
    {id: 1, title: "Hello", desc: "Hello World", time: 12, done: true, user_id: 1},
    {id: 2, title: "What", desc: "What Deck", time: 0, done: false, user_id: 2}
  ],
  hasFormLoaded: false,
  form: {task_id: null, title: "", desc: "", time: 0, done: false, user_id: ""}
};


const tasks = (state = initialState.tasks, action) => {
  switch (action.type) {
    case RECEIVED_TASKS:
      return action.tasks;
    default:
      return state;
  }
};

const users = (state = initialState.users, action) => {
  switch (action.type) {
    case RECEIVED_USERS:
      console.log(action);
      return action.users;
    default:
      return state;
  }
}

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case LOGIN_SUCCEED:
      return action.user;
    default:
      return state;
  }
}

const form = (state =  initialState.form, action) => {
  switch (action.type) {
    case FILL_FORM:
      return action.form;
    case UPDATE_FORM:
      console.log(action);
      return Object.assign({}, state, action.data);
    case EMPTY_FORM:
      return initialState.form;
    default:
      return state;
  }
}

const root_reducer = (state0, action) => {
  const reducer = combineReducers({user, users, tasks, form});
  const state1 = reducer(state0, action);
  return deepFreeze(state1);
}

export default root_reducer;
