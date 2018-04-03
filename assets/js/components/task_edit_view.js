import React from 'react';
import {connect} from 'react-redux';
import {Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';
import {Col, Row} from 'reactstrap';
import {UPDATE_FORM, CREATED_TASK, EMPTY_FORM} from '../actions'

const TaskEditView = ({history, token, form, users, dispatch}) => {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    console.log(tgt.type);
    console.log(tgt.prop("checked"))
    data[tgt.attr('name')] = (tgt.attr('name') == "done" ? tgt.prop('checked') : tgt.val());
    let action = {
      type: UPDATE_FORM,
      data: data,
    };
    console.log(action);
    dispatch(action);
  }

  function submit_form(ev) {
    ev.preventDefault();
    console.log(form);
    const url = "/api/v1/tasks/"+(form.id ? form.id : "");
    console.log({task: form, token});
    $.ajax(url, {
      method: form.id ? "put" : "post",
      data: JSON.stringify({task: form, token}),
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log(resp);
        dispatch({type: CREATED_TASK, task: resp.data});
        dispatch({type: EMPTY_FORM});

        history.push('/tasks');
      },
      error: xhr => alert("submission failed")
    })
  }

  const userOps = users.map(user => <option key={user.id} value={user.id}>{user.email}</option>);
  console.log(form);
  console.log(token);

  return (
    <Form onSubmit={submit_form}>
      <FormGroup>
        <Label for="user_id">User</Label>
        <Input type="select"
          name="user_id"
          value={form.user_id}
          onChange={update}
          required>
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
            required
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
            required
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
            required
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
              checked={form.done}
              onChange={update}
              />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{size: 10, offset: 2}}>
            <Button type="submit">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  };

const mapStateToProps = ({user:{token}, form, users}) => ({token, form, users});
export default connect(mapStateToProps)(TaskEditView);
