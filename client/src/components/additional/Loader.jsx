import React from "react";
import RingLoader from "react-spinners/RingLoader";
import Container from "../containers/FlexContainer";
export default function App(props) {

  let src = "./images/logo.png";
  if (props.route) {
    src = "." + src;
  }
  return (
    <Container withAppBar>
      <img
        src={src}
        alt=""
        style={{
          width: "50px",
          height: "50px",
          position: "relative",
          top: "80px",
          left: "7px"
        }}
      />
      <RingLoader size={100} color={"#C71585"} loading={true} />
    </Container>
  );
}
