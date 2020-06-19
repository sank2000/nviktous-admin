import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { IconButton } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import DvrRoundedIcon from '@material-ui/icons/DvrRounded';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  list: {
    width: 250
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



  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="items">
        <ListItemLink to="/" primary="Home" icon={<HomeRoundedIcon />} />
        <ListItemLink to="/" primary="Orders" icon={<ReceiptRoundedIcon />} />
        <ListItemLink to="/form" primary="Add Item" icon={<AddCircleRoundedIcon />} />
        <ListItemLink to="/product" primary="Products" icon={<DvrRoundedIcon />} />
        <ListItemLink to="/user" primary="Users" icon={<AccountCircleIcon />} />
      </List>
      <Divider />
      <List className="items">
        <ListItemLink to="/" primary="Home" icon={<HomeRoundedIcon />} />
        <ListItemLink to="/form" primary="Add Item" icon={<AddCircleRoundedIcon />} />
        <ListItemLink to="/" primary="Products" icon={<DvrRoundedIcon />} />
        <ListItemLink to="/" primary="Orders" icon={<ReceiptRoundedIcon />} />
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)} style={{ outline: "none" }} > <MenuRoundedIcon style={{ color: "white" }} /></IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}