import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from "axios";

import Loader from "../additional/Loader";


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



export default () => {

  const [detail, setDetail] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios.get("/data/user")
      .then(function (response) {
        setDetail(response.data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])

  return <>
    {load ? <Loader /> : <>
      <h2>User Details</h2>
      <Table dark striped bordered responsive>
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
      </Table>
    </>}
  </>

}