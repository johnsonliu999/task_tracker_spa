import {Row, Col, Table} from 'reactstrap';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const UsersView = ({user, users}) =>
(user.token ?
  (<Row>
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
  </Row>) :
  <Redirect to="/" />
);

export default connect( ({user, users}) => ({user, users}))(UsersView);
