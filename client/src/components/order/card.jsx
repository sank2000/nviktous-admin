import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import RowingIcon from "@material-ui/icons/Rowing";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DateFormat from 'dateformat';
import { withStyles } from "@material-ui/core/styles";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Tooltip from '@material-ui/core/Tooltip';

import axios from "axios";

import { Spinner } from 'reactstrap';

import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

function Ava(props) {
  return (
    <div>
      <Avatar style={(props.ind <= props.len) ? { backgroundColor: "#FF7315", border: "4px solid white" } : { backgroundColor: "black", border: "4px solid white" }}>
        {props.ico}
      </Avatar>
      <br />
      <p style={(props.ind <= props.len) ? {
        color: "#fff",
        display: "inline",
        backgroundColor: "#FF7315",
        padding: "3px 5px",
        borderRadius: '150px'
      } : { display: "inline" }}>{props.title}</p>
      {props.ind <= props.len && <Tooltip placement="top" title={DateFormat((new Date(props.status[props.ind - 1].date)), "d-mmm-yyyy")}>
        <PriorityHighIcon color="action" fontSize="small" />
      </Tooltip>}
    </div>
  );
}

function tab(props, ind) {
  return (
    <StyledTableRow key={ind}>
      <StyledTableCell align="center"> {props.name}</StyledTableCell>
      <StyledTableCell align="center"> {props.size} </StyledTableCell>
      <StyledTableCell align="center"> {props.count} </StyledTableCell>
      <StyledTableCell align="center"> {props.price} </StyledTableCell>
    </StyledTableRow>
  );
}

function Details(props) {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Size</StyledTableCell>
            <StyledTableCell align="center">Count</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {props.items.map(tab)}
          <StyledTableRow>
            <StyledTableCell rowSpan={3} />
            <StyledTableCell colSpan={2}>Toatl Price</StyledTableCell>
            <StyledTableCell align="right">{props.total}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default (props) => {

  const [load, setLoad] = useState(false);


  function handleFun() {
    setLoad(true);
    var arr = props.status;
    if (props.status.length === 1) {
      arr.push({
        status: "packed",
        date: new Date()
      });
    }
    else if (props.status.length === 2) {
      arr.push({
        status: "shipped",
        date: new Date()
      });
    }
    else if (props.status.length === 3) {
      arr.push({
        status: "delivered",
        date: new Date()
      });
    }
    else {
      setLoad(false);
      return;
    }
    let prms = new URLSearchParams(
      {
        id: props.id,
        user_id: props.user_id,
        status: JSON.stringify(arr)
      }
    );
    axios.post("/order/status", prms)
      .then(function (response) {
        console.log(response.data);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
    console.log(arr);
  }

  return (
    <Paper elevation={3} style={{ marginBottom: "25px", marginTop: "25px", paddingBottom: "15px", paddingTop: "15px", border: "1rem solid grey" }}>
      <Grid container spacing={1}>
        <Grid item style={{ marginLeft: "10px" }}>
          <h5>Order no : <span style={{ color: "grey" }}>{props.id} </span> </h5>
        </Grid>
        <Grid item xs={12}>
          <hr style={{
            border: "0.3px solid grey"
          }} />
        </Grid>
        <Grid item xs={12}>
          <h6 style={{ marginLeft: "20px" }}>User ID : {props.user_id}</h6>
          <h6 style={{ marginLeft: "20px" }}>Payment : {"cash on delivery"}</h6>
        </Grid>
        <Grid item xs={12}>
          <hr style={{
            border: "0.3px solid grey"
          }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginLeft: "20px" }}>Address</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: "20px" }}>
          {props.address}
        </Grid>
        <Grid item xs={12}>
          <hr style={{
            border: "0.3px solid grey"
          }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginLeft: "20px" }}>Details</Typography>
        </Grid>
        <Grid item xs={12}>
          <Details total={props.price} items={props.items} />
        </Grid>
        <Grid item xs={12}>
          <hr style={{
            border: "0.3px solid grey"
          }} />
        </Grid>
        <Grid item xs={12} style={{ marginLeft: "20px" }}>
          <Typography variant="h6">Status</Typography>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="xl" style={{ position: "relative" }}>
            <hr
              style={props.status.length === 4 ?
                {
                  border: "0.5px solid #303030",
                  position: "absolute",
                  width: "78%",
                  top: "2%"
                } : {
                  border: "0.5px solid #303030",
                  position: "absolute",
                  width: "80%",
                  left: "10%",
                  top: "2%"
                }}
            />
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ textAlign: "center" }}
            >
              <Grid item>
                <Ava ico={<DoneOutlineIcon />} title={"Ordered"} ind={1} len={props.status.length} status={props.status} />
              </Grid>
              <Grid item>
                <Ava ico={<LocalMallIcon />} title={"Packed"} ind={2} len={props.status.length} status={props.status} />
              </Grid>
              <Grid item>
                <Ava ico={<RowingIcon />} title={"Shipped"} ind={3} len={props.status.length} status={props.status} />{" "}
              </Grid>
              <Grid item>
                <Ava
                  ico={<LocalShippingIcon />}
                  title={"Delivery"}
                  ind={4}
                  len={props.status.length}
                  status={props.status}
                />
              </Grid>
            </Grid>
            {props.status.length <= 3 &&
              <Button disabled={load} onClick={handleFun} style={{ float: "right", marginTop: '15px' }} variant="contained" color="primary">Next{load && <Spinner size="sm" color="dark" />} </Button>}
          </Container>
        </Grid>
      </Grid>
    </Paper>
  );
};
