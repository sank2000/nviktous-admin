import React, { useEffect, useState } from 'react';
import Container from "@material-ui/core/Container";
import { Typography } from '@material-ui/core';

import Card from "./card";

import axios from "axios";
import Loading from "../additional/Loader";

import Container2 from "../containers/FlexContainer"
import NavBar from "../nav/TopNavbar";



function Empty() {
  return (
    <Container2 withAppBar>
      <img src='../images/empty.png' style={{ maxWidth: '80vw', maxHeight: '50vh', padding: '1rem' }} alt='no order' />
      <Typography variant="h4">No Orders!</Typography>
    </Container2>
  );
}

export default ({ match }) => {
  const [load, setLoad] = useState(true);
  const [card, setCard] = useState([]);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    axios.get("/order")
      .then(function (response) {
        let res = response.data.filter((val) => val.status.length === parseInt(match.params.id));
        if (res.length !== 0) {
          setCard(res)
          // setCard(response.data);
          setEmpty(false);
        }
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [match.params.id])


  return (<>
    <NavBar route />
    {load ? <Loading route /> : empty ? <Empty /> : <>
      <Container maxWidth="sm">
        {card.map((value, ind) => {
          return <Card key={ind} items={value.item} payment={value.payment} user_id={value.user_id} address={value.address} price={value.amount} id={value._id} status={value.status} />
        })}
      </Container>
    </>
    }
  </>)
}
