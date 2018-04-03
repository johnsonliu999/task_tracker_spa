import {Row, Col, Table} from 'reactstrap';
import React from 'react';
import {connect} from 'react-redux';

const UsersView = ({users}) => (
  <Row>
    <Col>
      <Table>
        <thead><tr><th>ID</th><th>Email</th></tr></thead>
        <tbody>
          {users.map( (user, idx) => (
            <tr key={idx}>
              <td>{user.id}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  </Row>
);

export default connect( ({users}) => ({users}))(UsersView);
