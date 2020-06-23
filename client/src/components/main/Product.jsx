import React, { useState, useEffect, Fragment } from 'react';
import { Table } from 'reactstrap';
import axios from "axios";

import Loader from "../additional/Loader";

import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';

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
      <td>
        <IconButton href={`/product/${props._id}`}>
          <VisibilityTwoToneIcon color="primary" fontSize="small" />
        </IconButton>
      </td>
      <td>{props.name}</td>
      <td><img src={props.img[0]} alt="" style={{ width: "40px", height: "40px" }}></img></td>
      <td>{props.description}</td>
      <td>{props.category}</td>
      <td>{props.price}</td>
      <td>{JSON.stringify(props.size)}</td>
      <td>{props.discount}</td>
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

  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(true);

  const [search, setSearch] = useState("");
  const [found, setFound] = useState(true);

  const [openSearch, setOpenSearch] = useState(false);


  function handleCancel() {
    setLoad(true);
    setSearch("");
    setFound(true);
    axios.get("/product")
      .then(function (response) {
        setProduct(response.data);
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
      const result = await axios.post("/product/search", params);
      return result;
    }
    else {
      const result = await axios.post("/product");
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
      setProduct(response.data);
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
    axios.get("/product")
      .then(function (response) {
        setProduct(response.data);
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
          <Typography variant="h6">Product Details</Typography>
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
              <th></th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Size</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {
              product.map(TR)
            }
          </tbody>
        </Table> : <NoRecord />
      }

    </>}
  </>

}