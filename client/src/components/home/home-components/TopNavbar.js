import React from 'react'
import Sidebar from './Sidebar'
import {NavbarBrand, Navbar} from 'reactstrap';

function TopNavbar() {

    return (
		<div>
      	<Navbar className="navbar-dark bg-dark" expand="false">
		  	<Sidebar />
			<NavbarBrand className="navbrand" href="/">nviktous</NavbarBrand>
      	</Navbar>
		</div>	
    )
}

export default TopNavbar
