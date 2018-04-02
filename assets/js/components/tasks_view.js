import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Button} from 'reactstrap'
import api from '../api';
import {FILL_FORM} from '../actions';

const Task = ({task, handleEdit}) => (
  <Card>
    <CardHeader>{task.title}</CardHeader>
    <CardBody>
      <Table responsive>
        <tbody>
          <tr>
            <th scope="row">Title</th>
            <td>{task.title}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{task.desc}</td>
          </tr>
          <tr>
            <th scope="row">Time</th>
            <td>{task.time}</td>
          </tr>
          <tr>
            <th scope="row">Statue</th>
            <td>{task.done}</td>
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

    return (
      <Container>
        <Row>
          {tasksCards}
        </Row>
      </Container>
    );
  }
};

export default connect(state => ({tasks: state.tasks, token: state.user.token}))(TasksView);
