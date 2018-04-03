import store from './store'
import {RECEIVED_TASKS, RECEIVED_USERS, FILL_FORM, LOGIN_SUCCEED} from "./actions"

class Server {
  request_tasks(token) {
    const url = "/api/v1/tasks";
    $.ajax(url, {
      method: "get",
      data: {token},
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

  request_users(token) {
    const url = "/api/v1/users";
    $.ajax(url, {
      method: "get",
      data: {token},
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log(resp);
        store.dispatch({
          type: RECEIVED_USERS,
          users: resp.data,
        });
      },
    });
  }


}

export default new Server();
