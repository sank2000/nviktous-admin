import React, { useEffect, useState } from 'react';
import Container from "@material-ui/core/Container";
import { Typography } from '@material-ui/core';

import Card from "./card";

import axios from "axios";
import Loading from "../additional/Loader";



function Empty() {
  return (
    <Container withAppBar>
      <img src='../images/empty.png' style={{ maxWidth: '80vw', maxHeight: '50vh', padding: '1rem' }} alt='kfjngdf' />
      <Typography variant="h2">No Orders!</Typography>
    </Container>
  );
}

export default () => {
  const [load, setLoad] = useState(true);
  const [card, setCard] = useState([]);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    axios.get("/order")
      .then(function (response) {
        if (response.data.length !== 0) {
          setCard(response.data);
          setEmpty(false);
        }
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])


  return (<>
    {load ? <Loading /> : empty ? <Empty /> : <>
      <Container maxWidth="sm">
        {card.map((value, ind) => {
          return <Card key={ind} items={value.item} payment={value.payment} user_id={value.user_id} address={value.address} price={value.amount} id={value._id} status={value.status} />
        })}
      </Container>
    </>
    }
  </>)
}
