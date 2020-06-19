import React from "react";
import RingLoader from "react-spinners/RingLoader";
import Container from "../containers/FlexContainer";
export default function App() {
  return (
    <Container withAppBar>
      <img
        src="./images/logo.png"
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
