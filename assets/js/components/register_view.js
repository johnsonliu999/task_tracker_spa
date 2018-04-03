import React, {Component} from 'react';
import {Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {LOGIN_SUCCEED} from '../actions'
import store from '../store'


class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rePassword: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    if (this.state.password !== this.state.rePassword) {
      alert("Two passwords are not consistent");
      return ;
    }
    console.log(this.state);
    const {email, password} = this.state;
    $.ajax("/api/v1/public/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user: {email, password}}),
      success: (resp) => {
        console.log(resp);
        alert("user created");
        store.dispatch({type: LOGIN_SUCCEED, user: resp});
      },
      error: (xhr) => {
        alert("create user failed");
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
                  required
                  />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="rePassword" sm={4}>Repeat</Label>
              <Col sm={8}>
                <Input type="password"
                  value={this.state.rePassword}
                  name="rePassword" id="rePassword"
                  placeholder="Enter password"
                  onChange={ev => this.setState({rePassword: ev.target.value})}
                  required
                  />
              </Col>
            </FormGroup>
            <Button color="primary">Regiter</Button>
          </Form>
        </Col>
      </Row>
    );
  }
};

export default connect(state => ({token: state.user.token}))(RegisterView);
