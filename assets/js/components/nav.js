import React from 'react';
import {NavLink} from 'react-router-dom';
import {Collapse, Nav, NavItem, Navbar, NavbarBrand} from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {LOG_OUT} from '../actions'

const MyNav = ({user, dispatch}) => (
  <Navbar color="faded" expand="sm" light>
    <NavbarBrand><h3>Task Tracker</h3></NavbarBrand>
    <Nav className="navbar-expand-sm" navbar>
      <NavItem>
        <NavLink to="/users" className="nav-link">&nbsp; Users &nbsp;</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/tasks" className="nav-link">&nbsp; Tasks &nbsp;</NavLink>
      </NavItem>
    </Nav>
    {user.token ?
      <div className="navbar-text ml-auto">Hi, <strong>{user.email}</strong>
      &nbsp; <Link to="/" onClick={() => dispatch({type: LOG_OUT})}>Log out</Link>
  </div>: ""}
</Navbar>
);

export default connect(({user}) => ({user}))(MyNav);
