import React from 'react';

const Task = ({task}) => (
  <Card>
    <CardHeader>{task.title}</CardHeader>
    <CardBody>
      <Table>
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
      </Table>
    </CardBody>
    <CardFooter>
      <Row>
        <Col sm={{size: 3, offset: 2}}>
          <Button color="primary">Edit</Button>
        </Col>
        <Col sm={{size: 3, offset: 2}}>
          <Button color="danger">Delete</Button>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

const TasksView = ({tasks}) => {

  const taskCars = tasks.map(task => (
    <Col sm="3"><Task task={task}/></Col>
  ));

  return (
    <Container>
      <Row>
        {tasksCards}
      </Row>
    </Container>
  );
};

export default TasksView;
