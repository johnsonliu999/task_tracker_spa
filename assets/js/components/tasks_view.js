import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Badge, Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Button} from 'reactstrap'
import api from '../api';
import {FILL_FORM, EMPTY_FORM} from '../actions';
import {Link, Route, Redirect} from 'react-router-dom';
import TaskEditView from './task_edit_view';

const Task = ({task, handleEdit}) => (
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
        <Col lg={{size: 3, offset: 2}}>
          <Button color="primary" onClick={() => handleEdit(task)}>Edit</Button>
        </Col>
        <Col lg={{size: 3, offset: 2}}>
          <Button color="danger">Delete</Button>
        </Col>
        <Col lg="2"></Col>
      </Row>
    </CardFooter>
  </Card>
);

class TasksView extends Component {

  componentDidMount() {
    console.log(this.props);
    api.request_tasks(this.props.token);
    api.request_users(this.props.token);
  }

  handleEdit(task) {
    this.props.dispatch({type:FILL_FORM, form:task});
    this.props.history.push("/tasks/" + task.id + "/edit");
  }

  render() {
    const tasksCards = this.props.tasks.map(task => (
      <Col md="4" key={task.id}>
        <Task task={task} handleEdit={this.handleEdit.bind(this)} />
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
