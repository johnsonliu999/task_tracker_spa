import React from 'react';
import {connect} from 'react-redux';
import {Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';
import {Col, Row} from 'reactstrap';
import {UPDATE_FORM} from '../actions'

const TaskEditView = ({form, users, dispatch}) => {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: UPDATE_FORM,
      data: data,
    };
    console.log(action);
    dispatch(action);
  }

  const userOps = users.map(user => <option key={user.id} value={user.id}>{user.email}</option>);
  return (
    <Form>
      <FormGroup>
        <Label for="user_id">User</Label>
        <Input type="select"
          name="user_id"
          value={form.user_id}
          onChange={update}>
          <option></option>
          {userOps}
        </Input>
      </FormGroup>
      <FormGroup row>
        <Label for="title" sm={2}>Title</Label>
        <Col sm={10}>
          <Input id="title"
            name="title"
            placeholder="Enter title"
            value={form.title}
            onChange={update}
            />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="desc" sm={2}>Description</Label>
        <Col sm={10}>
          <Input id="desc"
            name="desc"
            type="textarea"
            placeholder="Enter description"
            value={form.desc}
            onChange={update}
            />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="time" sm={2}>Time</Label>
        <Col sm={6}>
          <Input id="time"
            name="time"
            type="number"
            min={0} placeholder={0} step={15}
            value={form.time}
            onChange={update}
            />
            <FormText color="muted">
              Only in 15-minute increments
            </FormText>
          </Col> min
        </FormGroup>
        <FormGroup row>
          <Label for="done" sm={2}>Status</Label>
          <Col sm={10}>
            <Input id="done"
              name="done"
              type="checkbox"
              value={form.done}
              onChange={update}
              />
          </Col>
        </FormGroup>
      </Form>
    );
  };

const mapStateToProps = ({form, users}) => ({form, users});

export default connect(mapStateToProps)(TaskEditView);
