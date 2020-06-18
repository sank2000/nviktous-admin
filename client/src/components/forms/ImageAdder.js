import React, { useState } from "react";
import { Input } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";

function Tf(data, ind) {
  return (
    <>
      <br />
      <Input type="text" className="image-input" placeholder={"Enter your  image URL " + (ind + 1)} name={"image" + (ind + 1)} />
    </>
  );
}

export default function ImageAdder() {
  const [count, setCount] = useState([" "]);

  return (
    <>
      {count.map(Tf)}
      <IconButton style={{outline:"none"}} onClick={() => setCount(old => [...old, ""])}>
        <AddCircleTwoToneIcon />
      </IconButton>
    </>
  );
}
