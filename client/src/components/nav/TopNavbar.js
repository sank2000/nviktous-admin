import React from 'react'
import Sidebar from './Sidebar'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';

import AuthApi from "../auth/AuthApi";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		color: "white"
	},
}));

export default function AppBarTop() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const authApi = React.useContext(AuthApi);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};


	function handleOut() {
		axios.get("/auth/signout")
			.then(function (response) {
				authApi.setAuth({ auth: false });
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	return (
		<div className={classes.root}>
			<AppBar position="static" style={{ backgroundColor: "#212529" }}>
				<Toolbar>
					<Sidebar />
					<Typography variant="h6" className={classes.title}>
						< img
							src="./images/logo.png"
							style={{ width: "25px", height: "25px", marginRight: "10px" }}
							alt=""
						/> NVI<span style={{ color: "#FF7315" }}>KT</span>OUS
          </Typography>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
							style={{ outline: "none" }}
						>
							<AccountCircle style={{ color: "white" }} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}><PersonOutlineTwoToneIcon />&nbsp; {authApi.auth.name}</MenuItem>
							<MenuItem onClick={handleOut}><ExitToAppTwoToneIcon />&nbsp; logout</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
