import React from 'react'
import Sidebar from './Sidebar'
import { NavbarBrand, Navbar } from 'reactstrap';

function TopNavbar() {

	return (
		<div>
			<Navbar className="navbar-dark bg-dark" expand="false">
				<Sidebar />
				<NavbarBrand className="navbrand" href="/">
					< img
						src="./images/logo.png"
						style={{ width: "25px", height: "25px", marginRight: "10px" }}
						alt=""
					/> NVI<span style={{ color: "#FF7315" }}>KT</span>OUS</NavbarBrand>
			</Navbar>
		</div>
	)
}

export default TopNavbar;
