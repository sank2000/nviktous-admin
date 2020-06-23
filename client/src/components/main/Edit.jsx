import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';

import { useFormik } from "formik";
import * as Yup from "yup";

import DialogActions from '@material-ui/core/DialogActions';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Spinner } from 'reactstrap';

import { Form, FormGroup, Label, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import axios from "axios";


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#ff1a1a"
  }
});


const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);



export default (props) => {

  const [open, setOpen] = useState(true);
  const [cSelected, setCSelected] = useState(props.size);
  const [cat, setCat] = useState(props.cat);
  const [load, setLoad] = useState(false);

  const [intialValues] = useState({
    name: props.name,
    description: props.description,
    price: props.price
  });

  const ValidationSchema = Yup.object({
    name: Yup.string().required("Field required !"),
    description: Yup.string().required("Field required !"),
    price: Yup.number().required("Field required !")
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: intialValues,
    validationSchema: ValidationSchema,
    onSubmit: values => {
      handleSubmit(values);
    }

  });



  const onCheckboxBtnClick = selected => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };



  const handleClose = () => {
    props.setEdit(false);
    setOpen(false);
  };

  const handleChangeR = (event) => {
    setCat(event.target.value);
  };

  const handleSubmit = (values) => {
    setLoad(true);
    let params = new URLSearchParams({ id: props.id, ...values, size: JSON.stringify(cSelected) });
    axios.post("/product/update2", params)
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

  function chkBOx(value, ind) {
    return <Label key={ind} check style={{ marginRight: "15px", marginLeft: "15px" }}>
      <Input type="checkbox" checked={cSelected.includes(value)} onClick={() => onCheckboxBtnClick(value)} />{value}
    </Label>
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      scroll="body"
    >
      <DialogTitle
        disableTypography
        id="customized-dialog-title"
        onClose={handleClose}
      >
        <Typography component="span" variant="h5">
          {" "}
            Edit{" "}
        </Typography>
      </DialogTitle>
      <Form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" placeholder="Enter the product name."
              {...formik.getFieldProps("name")}
              invalid={
                formik.touched.name && formik.errors.name !== undefined
              }
            />
            <FormFeedback>
              {formik.touched.name && formik.errors.name}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" className="textarea" name="description" placeholder="Add Description." rows="3"
              {...formik.getFieldProps("description")}
              invalid={
                formik.touched.description && formik.errors.description !== undefined
              }
            />
            <FormFeedback>
              {formik.touched.description && formik.errors.description}
            </FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="price">Price</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>₹</InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="price" placeholder="Enter the price."
                {...formik.getFieldProps("price")}
                invalid={
                  formik.touched.price && formik.errors.price !== undefined
                }
              />
              <FormFeedback>
                {formik.touched.price && formik.errors.price}
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <legend>Size</legend>
            <RadioGroup aria-label="size" name="size" value={cat} onChange={handleChangeR}>
              <FormControlLabel value="kids" control={<Radio />} label="For Kids" />
              <FormControlLabel value="adult" control={<Radio />} label="For Adults" />
            </RadioGroup>
          </FormGroup>
          <p>Size: {JSON.stringify(cSelected)}</p>
          {cat === "kids" &&
            <FormGroup check>
              {["6-12", "18-24", "3-4", "5-6", "7-8", "9-10", "11-12", "13-14"].map(chkBOx)}
            </FormGroup>
          }
          {cat === "adult" &&
            <FormGroup check>
              {["s", "m", "l", "xl", "xxl", "xxxl"].map(chkBOx)}
            </FormGroup>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
        </Button>
          <Button type="submit" variant="contained" color="primary" autoFocus>
            submit {load && <Spinner size="sm" color="dark" />}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  )

}