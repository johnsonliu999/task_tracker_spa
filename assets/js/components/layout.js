import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginView from './login_view';
import TasksView from './tasks_view';
import TaskEditView from './task_edit_view';
import {Link} from 'react-router-dom';
import MyNav from './nav'

const Layout = () => (
  <Router>
    <div>
      <MyNav />
      <Route path="/" exact component={LoginView} />
      <Route path="/tasks" exact component={TasksView} />
      <Route path="/tasks/:task_id/edit" exact component={TaskEditView} />
      <Route path="/tasks/new" exact component={TaskEditView} />
    </div>
  </Router>
);

export default Layout;
