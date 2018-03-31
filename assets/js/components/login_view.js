import React from 'react'
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap'

const LoginView = () => (
  <Row>
    <Col sm={{ size: 6, offset: 3}}>
      <Form>
        <FormGroup row>
          <Label for="email" sm={4}>Email</Label>
          <Col sm={8}>
            <Input type="email" name="email" id="email" placeholder="Enter email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={4}>Password</Label>
          <Col sm={8}>
            <Input type="password" name="password" id="password" placeholder="Enter password" />
          </Col>
        </FormGroup>

      </Form>
    </Col>
  </Row>
);

export default LoginView;
