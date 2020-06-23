import React, { useState } from "react";
import "./styles.css";
import { Button } from "reactstrap";
import { Spinner } from 'reactstrap';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import AuthApi from "../auth/AuthApi";

import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Login() {
  const authApi = React.useContext(AuthApi);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(
    {
      name: "",
      password: ""
    }
  );
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState({
    type: "",
    content: ""
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setData(old => {
      return {
        ...old,
        [name]: value
      }
    }
    )
  }

  function handleSubmit() {
    setLoad(true);
    let prms = new URLSearchParams(data);
    axios.post("/auth/signin", prms)
      .then(function (res) {
        if (res.data.auth) {
          authApi.setAuth(res.data);
          return;
        }
        else {
          setMsg({
            type: "error",
            content: res.data.message
          });
          setOpen(true);
        }
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <>
      <div className="back">
        <div className="login-box">
          <h1>Login</h1>
          <div className="textbox">
            <i className="fa fa-user" aria-hidden="true" />
            <input type="text" name="name" onChange={handleChange} placeholder="Username" />
          </div>
          <div className="textbox">
            <i className="fa fa-lock" aria-hidden="true" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
          </div>
          <Button className="button" onClick={handleSubmit} >Sign In {load && <Spinner size="sm" color="light" />}</Button>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msg.type}>
          {msg.content}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
