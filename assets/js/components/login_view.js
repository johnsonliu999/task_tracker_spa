import React, {Component} from 'react';
import {Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {LOGIN_SUCCEED} from '../actions'
import store from '../store'


class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log(this.state);
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(this.state),
      success: (resp) => {
        console.log(resp);
        this.setState({token: resp.token});
        store.dispatch({
          type: LOGIN_SUCCEED,
          user: resp
        });
      },
      error: (xhr) => {
        alert("login failed");
      }
    });
  }

  render() {
    if (this.props.token)
      return <Redirect to={"/tasks"} />

    return (
      <Row>
        <Col sm={{ size: 6, offset: 3}}>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="email" sm={4}>Email</Label>
              <Col sm={8}>
                <Input type="email"
                  value={this.state.email}
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  onChange={ev => this.setState({email: ev.target.value})}
                  />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>Password</Label>
              <Col sm={8}>
                <Input type="password"
                  value={this.state.password}
                  name="password" id="password"
                  placeholder="Enter password"
                  onChange={ev => this.setState({password: ev.target.value})}
                  />
              </Col>
            </FormGroup>
            <Button color="primary">Login</Button>
          </Form>
        </Col>
      </Row>
    );
  }
};

export default connect(state => ({token: state.user.token}))(LoginView);
