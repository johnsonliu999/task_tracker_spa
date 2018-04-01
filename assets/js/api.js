import store from './store'
import {RECEIVED_TASKS, RECEIVED_USERS, FILL_FORM, LOGIN_SUCCEED} from "./actions"

class Server {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log(resp);
        store.dispatch({
          type: RECEIVED_TASKS,
          tasks: resp.data,
        });
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        const {token, user_id, user_email} = resp.data;
        console.log(resp);
        store.dispatch({
          type: LOGIN_SUCCEED,
          token, user_id, user_email
        });
      },
      error: (xhr) => {
        alert("login failed");
      }
    });
  }
}

export default new Server();
