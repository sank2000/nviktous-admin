import React, { useState, useEffect, Fragment } from 'react';
import { Table } from 'reactstrap';
import axios from "axios";

import Loader from "../additional/Loader";
import IconButton from '@material-ui/core/IconButton';

import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import NavBar from "../nav/TopNavbar";


function TR(props, ind) {
  return (
    <tr key={ind}>
      <th scope="row">{ind + 1}</th>
      <td>{props.unique_id}</td>
      <td>{props.account_Type}</td>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.address}</td>
      <td>{props.phn}</td>
      <td>{props.pincode}</td>
    </tr>
  )
}


function NoRecord() {
  return (
    <Fragment>
      <h1>No Record Found !!!</h1>
    </Fragment>
  );
}


export default () => {

  const [detail, setDetail] = useState([]);
  const [load, setLoad] = useState(true);

  const [search, setSearch] = useState("");
  const [found, setFound] = useState(true);

  const [openSearch, setOpenSearch] = useState(false);

  function handleCancel() {
    setLoad(true);
    setSearch("");
    setFound(true);
    axios.get("/user")
      .then(function (response) {
        setDetail(response.data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function SearchText(event) {
    setSearch(event.target.value);
  }

  const getSearch = async () => {
    let params = new URLSearchParams({ search: search });
    if (search) {
      const result = await axios.post("/user/search", params);
      return result;
    }
    else {
      const result = await axios.get("/user");
      return result;
    }
  }

  const handleSearch = async () => {
    setLoad(true);
    const response = await getSearch();
    if (response.data.length === 0) {
      setFound(false);
    }
    else {
      setDetail(response.data);
      setFound(true);
    }
    setLoad(false);
  }

  function keyEntered(event) {
    if (event.which === 13 || event.keyCode === 13) {
      handleSearch();
      return false;
    }
    return true;
  };


  useEffect(() => {
    axios.get("/user")
      .then(function (response) {
        setDetail(response.data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])

  return <>
    <NavBar />
    {load ? <Loader /> : <>
      <Box display="flex">
        <Box p={2} flexGrow={1}>
          <Typography variant="h6">Customer Details</Typography>
        </Box>
        <Box p={1}>
          <IconButton onClick={() => setOpenSearch(old => !old)} style={{ outline: "none" }}>
            <SearchOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      {openSearch && (
        <Box display="flex" justifyContent="center">
          <Box p={1}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText onClick={handleSearch}><SearchOutlinedIcon /></InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="search" value={search} placeholder="Search.." onChange={SearchText}
                onKeyPress={keyEntered} />
              <InputGroupAddon addonType="append" style={{ paddingTop: "7px" }}>
                <ClearOutlinedIcon onClick={handleCancel} />
              </InputGroupAddon>
            </InputGroup>
          </Box>
        </Box>
      )}
      {
        found ? <Table dark striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Unique ID</th>
              <th>Type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {
              detail.map(TR)
            }
          </tbody>
        </Table> : <NoRecord />
      }
    </>}
  </>

}