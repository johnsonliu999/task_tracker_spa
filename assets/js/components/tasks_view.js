import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Badge, Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Button} from 'reactstrap'
import api from '../api';
import {FILL_FORM, EMPTY_FORM} from '../actions';
import {Link, Route, Redirect} from 'react-router-dom';
import TaskEditView from './task_edit_view';

const Task = ({task, handleEdit, handleDelete}) => (
  <Card style={{height: "600px"}} className="mb-3">
    <CardHeader>{task.title}</CardHeader>
    <CardBody style={{overflow: "auto"}}>
      <Table responsive>
        <tbody>
          <tr>
            <th scope="row">Title</th>
            <td>{task.title}</td>
          </tr>
          <tr>
            <th scope="row">Desc</th>
            <td>{task.desc}</td>
          </tr>
          <tr>
            <th scope="row">Time</th>
            <td>{task.time}</td>
          </tr>
          <tr>
            <th scope="row">Statue</th>
            <td>
              {task.done ?
                <Badge color="success"> &radic; </Badge> :
                  <Badge color="secondary"> &minus; </Badge>}
            </td>
          </tr>
        </tbody>
      </Table>
    </CardBody>
    <CardFooter>
      <Row>
        <Col sm={{size: 3, offset: 2}}>
          <Button color="primary" onClick={() => handleEdit(task)}>Edit</Button>
        </Col>
        <Col sm={{size: 3, offset: 2}}>
          <Button color="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
        </Col>
        <Col sm="2"></Col>
      </Row>
    </CardFooter>
  </Card>
);

class TasksView extends Component {

  componentDidMount() {
    console.log(this.props);
    api.request_tasks(this.props.user.token);
    api.request_users(this.props.user.token);
  }

  handleEdit(task) {
    this.props.dispatch({type:FILL_FORM, form:task});
    this.props.history.push("/tasks/" + task.id + "/edit");
  }

  handleDelete(id) {
    const url = "/api/v1/tasks/" + id;
    console.log("handle delete" + url);
    const token = this.props.user.token;
    $.ajax(url, {
      method: "delete",
      data: {token},
      success: resp => {
        console.log(resp);
        api.request_tasks(token);
      },
      error: xhr => alert("delete error")
    });
  }

  render() {
    const tasksCards = this.props.tasks.map(task => (
      <Col md="4" key={task.id}>
        <Task task={task}
          handleEdit={this.handleEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)} />
      </Col>
    ));

    return this.props.user.token ? (
      <Container>
        <Row>
          {tasksCards}
        </Row>
        <Row>
          <Link to="/tasks/new"
            className="btn btn-primary mx-auto mt-3"
            onClick={() => this.props.dispatch({type: EMPTY_FORM})}
            >New Task</Link>
        </Row>
      </Container>
    ) : <Redirect to="/" />;
  }
};

export default connect(({user, tasks}) => ({user, tasks}))(TasksView);
