import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import axios from "axios";


import Grid from "@material-ui/core/Grid";

import Slider from '@material-ui/core/Slider';

import Input2 from "@material-ui/core/Input";

import { Spinner } from 'reactstrap';

function valuetext(value) {
  return `${value}%`;
}

export default (props) => {

  const [open, setOpen] = useState(true);

  const [value, setValue] = useState(props.discount);
  const [load, setLoad] = useState(false);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = event => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };


  const handleClose = () => {
    props.setDis(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    setLoad(true);
    let params = new URLSearchParams({ id: props.id, discount: value });
    axios.post("/pro/update", params)
      .then(function (response) {
        if (response.data.done) {
          handleClose();
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      })

    console.log(value);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Discount"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container spacing={2} alignItems="center" style={{ paddingTop: "30px" }}>
            <Grid item xs>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                style={{ minWidth: "35vw" }}
                step={1}
                marks
                min={0}
                max={100}
              />
            </Grid>
            <Grid item>
              <Input2
                value={value}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  min: 0,
                  max: 100,
                  type: "number",
                  "aria-labelledby": "input-slider"
                }}
              />
            </Grid>
          </Grid>
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