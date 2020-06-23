import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { IconButton } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import DvrRoundedIcon from '@material-ui/icons/DvrRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import { Link } from 'react-router-dom';

import clsx from 'clsx';


const useStyles = makeStyles({
  list: {
    width: 250
  },
  paper: {
    background: "#212529",
    color: 'white'
  },
  ico: {
    color: "white"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  function ListItemLink(props) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );

    return (
      <li>
        <ListItem button component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }

  const StyleLink =
  {
    textDecoration: 'none',
    color: 'inherit'
  }


  const list = (anchor) => (
    <div className={classes.list} >
      <List onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)} role="presentation" className={clsx(classes.list)}>
        <ListItemLink to="/" primary="Home" icon={<HomeRoundedIcon className={classes.ico} />} />
      </List>
      <List>
        <ListItem>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon className={classes.ico} />}
            defaultExpandIcon={<ChevronRightIcon className={classes.ico} />}
          >
            <TreeItem nodeId="1" label="Order">
              <Link style={StyleLink} to='/order/1' onClick={toggleDrawer(anchor, false)}>
                <TreeItem nodeId="2" label="Ordered" style={{ padding: '10px 0' }} />
              </Link>
              <Link style={StyleLink} className="styled-link" to='/order/2' onClick={toggleDrawer(anchor, false)}>
                <TreeItem nodeId="3" label="Packed" style={{ padding: '10px 0' }} />
              </Link>
              <Link style={StyleLink} className="styled-link" to='/order/3' onClick={toggleDrawer(anchor, false)}>
                <TreeItem nodeId="4" label="Shipped" style={{ padding: '10px 0' }} />
              </Link>
              <Link style={StyleLink} className="styled-link" to='/order/4' onClick={toggleDrawer(anchor, false)}>
                <TreeItem nodeId="4" label="Delivered" style={{ padding: '10px 0' }} />
              </Link>
            </TreeItem>
          </TreeView>
        </ListItem>
      </List>
      <List onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)} role="presentation" className={clsx(classes.list)}>
        <ListItemLink to="/form" primary="Add Item" icon={<AddCircleRoundedIcon className={classes.ico} />} />
        <ListItemLink to="/product" primary="Products" icon={<DvrRoundedIcon className={classes.ico} />} />
        <ListItemLink to="/user" primary="Users" icon={<AccountCircleIcon className={classes.ico} />} />
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)} style={{ outline: "none" }} > <MenuRoundedIcon style={{ color: "white" }} /></IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} classes={{ paper: classes.paper }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}