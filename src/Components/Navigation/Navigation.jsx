import React,{ Component } from 'react';
import './Navigation.css';
import { Navbar, NavbarBrand } from 'reactstrap';

class Navigation extends Component {

  render() {
    return(
      <div className="w-100">
        <Navbar light expand="md">
          <NavbarBrand>Chipset Builder</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;