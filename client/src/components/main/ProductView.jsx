import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { deepPurple } from "@material-ui/core/colors";

import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";

import Box from '@material-ui/core/Box';
import ProductViewer from '../view/ProductViewer';

import FlexContainer from '../containers/FlexContainer';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Avail from "./Avail";

import Discount from "./Discount";

import Edit from "./Edit";

import Delete from "./Delete";

import NavBar from "../nav/TopNavbar";

function Empty() {
  return (
    <FlexContainer withAppBar>
      <img src='../images/404.png' style={{ maxWidth: '80vw', maxHeight: '50vh', padding: '1rem' }} alt='404' />
      <Typography variant="h4">Item not found !</Typography>
    </FlexContainer>
  );
}


const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(6, 0, 6),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroButtons: {
    margin: theme.spacing(4),
  },
  sizes: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    fontSize: '.7rem',
    textTransform: 'uppercase'
  },
  priceTag: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.primary.main
  },
  originalPrice: {
    textDecoration: 'line-through'
  },
  btn: {
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
}));


function Size(props) {
  const classes = useStyles();
  return (
    <Grid item key={props.index}>
      <Avatar className={classes.sizes}>{props.size}</Avatar>
    </Grid>
  );
}

function Loading() {
  return (
    <>
      <Box display="flex" justifyContent="center" style={{ marginTop: "25px" }}>
        <Box>
          <Skeleton variant="rect" width={350} height={250} />
        </Box>
      </Box>
      <Grid container spacing={3} style={{ marginLeft: "50px" }} >
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <Typography component="h1" variant="h2" color="textPrimary">
            <Skeleton />
          </Typography>
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <Typography variant="h6">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                <Skeleton />
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h5" color="textSecondary" paragraph>
            <Skeleton />
          </Typography>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center">
        <Box>
          <Skeleton variant="rect" width={100} height={50} />
        </Box>
      </Box>
    </>
  )
}

function Product({ match }) {
  const [product, setProduct] = useState([]);
  const [loading, setloading] = useState(true);
  const classes = useStyles();
  const [empty, setEmpty] = useState(false);
  const [images, setImages] = useState([]);

  const [ava, setAva] = useState(false);

  const [dis, setDis] = useState(false);

  const [edit, setEdit] = useState(false);

  const [del, setDel] = useState(false);

  useEffect(() => {
    let prms = new URLSearchParams({ id: match.params.itemId });
    axios.post("/product/findone", prms)
      .then(function (response) {
        console.log(response.data);
        if (response.data.length !== 0) {
          setProduct(response.data);
          setImages(response.data.img.map((img) => {
            return {
              small: img,
              large: img
            }
          }));
        }
        else {
          setEmpty(true);
        }
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [match.params.itemId])



  return (
    <>
      <NavBar />
      {
        loading ? <Loading /> : empty ? <Empty /> :
          <>
            <Container maxWidth="lg">
              <ProductViewer images={images} />
            </Container>
            <div className={classes.heroContent}>
              <Container maxWidth="lg">
                <Grid container>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography component="h3" variant="h3" color="primary" gutterBottom>
                        {product.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container justify="space-between" spacing={3}>
                    <Grid item>
                      <Typography variant="h6">{product.category}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" color="secondary">{product.available ? "In Stock" : "No Stock"}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Available sizes</Typography>
                      <Grid container spacing={1}>
                        {product.size.map((value, index) => <Size size={value} index={index} key={index} />)}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.priceTag} variant="h3" component="h2">
                        ₹{product.price - (product.price * (product.discount / 100))}
                      </Typography>
                      {
                        product.discount > 0 &&
                        <>
                          <Typography className={classes.originalPrice} variant="h6" component="p">
                            ₹{product.price}
                          </Typography>
                          <span style={{ color: "red" }}>{product.discount} % off</span>
                        </>
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="textSecondary" paragraph>
                        {product.description}
                      </Typography>
                      <Grid item xs={12} style={{ paddingBottom: "35px" }}>
                        <Typography variant="h5" component="h4">
                          Payment method
                        </Typography>
                        <Typography variant="h6" component="h4" color="textSecondary">
                          <img src='../images/rupee.png' style={{ width: "35px", height: "35px" }} alt='rupee' /> cash on delivery
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ paddingBottom: "35px" }}>
                    <Typography variant="h5" component="h4">
                      Actions
                    </Typography>
                    <ButtonGroup color="secondary" variant="contained">
                      <Button onClick={() => setDis(true)}>Discount</Button>
                      <Button onClick={() => setAva(true)}>{product.available ? "No stock" : " Available"}</Button>
                      <Button onClick={() => setEdit(true)}>Edit</Button>
                      <Button onClick={() => setDel(true)}>Delete</Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Container>
            </div>
            {ava && <Avail setAva={setAva} id={match.params.itemId} stock={!product.available} />}

            {dis && <Discount setDis={setDis} id={match.params.itemId} discount={product.discount} />}

            {edit && <Edit setEdit={setEdit} name={product.name} cat={product.size[0].includes("-") ? "kids" : "adult"} size={product.size} description={product.description} price={product.price} id={match.params.itemId} />}

            {del && <Delete setDel={setDel} id={match.params.itemId} />}
          </ >
      }
    </>
  );
}

export default Product;
