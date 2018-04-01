import {combineReducers} from 'redux';
import {RECEIVED_TASKS, RECEIVED_USERS, FILL_FORM} from "./actions";
import deepFreeze from "deep-freeze";

const initialState = {
  user_id: null,
  user_email: "",
  token: null,
  users: [],
  tasks: [
    {id: 1, title: "Hello", desc: "Hello World", time: 12, done: true, user_id: 1},
    {id: 2, title: "What", desc: "What Deck", time: 0, done: false, user_id: 2}
  ],
  form: {task_id: null, title: "", desc: "", time: 0, done: false, user_id: null}
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
      return action.users;
    default:
      return state;
  }
}

const form = (state =  initialState.form, action) => {
  switch (action.type) {
    case FILL_FORM:
      return action.form;
    default:
      return state;
  }
}

const root_reducer = (state0, action) => {
  const reducer = combineReducers({users, tasks, form});
  const state1 = reducer(state0, action);
  return deepFreeze(state1);
}

export default root_reducer;
