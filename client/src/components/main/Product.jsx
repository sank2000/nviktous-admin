import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from "axios";

import Loader from "../additional/Loader";

import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';

import IconButton from '@material-ui/core/IconButton';


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



export default () => {

  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios.get("/data/product")
      .then(function (response) {
        setProduct(response.data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])

  return <>
    {load ? <Loader /> : <>
      <h2>Product Details</h2>
      <Table dark striped bordered responsive>
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
      </Table>
    </>}
  </>

}