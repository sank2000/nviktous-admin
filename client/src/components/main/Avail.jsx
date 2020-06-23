import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import axios from "axios";

import { Spinner } from 'reactstrap';



export default (props) => {

  const [open, setOpen] = useState(true);
  const [load, setLoad] = useState(false);


  const handleClose = () => {
    props.setAva(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    setLoad(true);
    let params;
    if (props.stock) {
      params = new URLSearchParams({ id: props.id, available: true });
    }
    else {
      params = new URLSearchParams({ id: props.id, available: false });
    }
    axios.post("/product/update", params)
      .then(function (response) {
        if (response.data.done) {
          handleClose();
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confrim"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure to make this product {props.stock ? "available" : "not available now"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>
          Yes {load && <Spinner size="sm" color="dark" />}
        </Button>
      </DialogActions>
    </Dialog>
  )

}