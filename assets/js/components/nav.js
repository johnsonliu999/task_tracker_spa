import React from 'react';
import {NavLink} from 'react-router-dom';
import {Collapse, Nav, NavItem, Navbar, NavbarBrand} from 'reactstrap';

const MyNav = () => (
  <Navbar color="faded" light>
    <span class="nav-brand"><h3>Task Tracker</h3></span>
    <Nav className="ml-auto navbar-expand-sm" navbar>
      <NavItem>
        <NavLink to="/users" className="nav-link"> Users </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/tasks" className="nav-link"> Tasks </NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

export default MyNav;
