import React, { useState, Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, CustomInput, FormFeedback, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Slider from '@material-ui/core/Slider';
import "./Form.css"
import TopNavbar from "../home/home-components/TopNavbar";


import Grid from "@material-ui/core/Grid";

import { useFormik } from "formik";
import * as Yup from "yup";

import Input2 from "@material-ui/core/Input";


import IconButton from "@material-ui/core/IconButton";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";


function valuetext(value) {
    return `${value}%`;
}

function NewForm() {
    const [value, setValue] = useState(0);
    const [count, setCount] = useState([" "]);
    const [img, setImg] = useState([]);
    const [category, setCategory] = useState("mens apparel");
    const [cSelected, setCSelected] = useState([]);
    const [cat, setCat] = useState("");

    const onCheckboxBtnClick = selected => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
            cSelected.push(selected);
        } else {
            cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
    };

    const onImgChange = e => {
        const { name, value } = e.target;
        setImg(old => {
            let temp = old;
            if (name < temp.length) {
                temp[name] = value;
            }
            else {
                temp.push(value);
            }
            return temp;
        });
    };

    function Tf(data, ind) {
        return (
            <Fragment key={ind}>
                <br />
                <Input
                    type="text"
                    className="image-input"
                    placeholder={"Enter your  image URL " + (ind + 1)}
                    name={ind}
                    onChange={onImgChange}
                />
            </Fragment>
        );
    }

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = event => {
        setValue(event.target.value === "" ? "" : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    const intialValues = {
        name: "",
        description: "",
        price: 0
    };

    const ValidationSchema = Yup.object({
        name: Yup.string().required("Field required !"),
        description: Yup.string().required("Field required !"),
        price: Yup.number().required("Field required !")
    });

    const formik = useFormik({
        initialValues: intialValues,
        validationSchema: ValidationSchema,
        onSubmit: values => {
            if (img.length === 0) {
                console.log("No images");
                return;
            }
            else if (cat.length === 0) {
                console.log("No sizes");
                return;
            }
            console.log({
                ...values,
                img: img,
                discount: value,
                size: cSelected,
                category
            })
        }
    });



    return (
        <div className="form">
            <TopNavbar />
            <h2>Product Details</h2>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" placeholder="Enter the product name."
                        {...formik.getFieldProps("name")}
                        invalid={
                            formik.touched.name && formik.errors.name !== undefined
                        }
                    />
                    <FormFeedback>
                        {formik.touched.name && formik.errors.name}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" className="textarea" name="description" placeholder="Add Description." rows="3"
                        {...formik.getFieldProps("description")}
                        invalid={
                            formik.touched.description && formik.errors.description !== undefined
                        }
                    />
                    <FormFeedback>
                        {formik.touched.description && formik.errors.description}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="category">Category</Label>
                    <CustomInput
                        type="select"
                        name="categorySelect"
                        id="customInput"
                        onChange={e => setCategory(e.target.value)}
                        value={category}
                    >
                        <option value="mens apparel">Men's Apperal</option>
                        <option value="kids apparel">Kid's Apperal</option>
                        <option value="womens apparel">Women's Apperal</option>
                    </CustomInput>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image</Label>
                    <>
                        {count.map(Tf)}
                        <IconButton
                            style={{ outline: "none" }}
                            onClick={() => setCount(old => [...old, ""])}
                        >
                            <AddCircleTwoToneIcon />
                        </IconButton>
                    </>
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>₹</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="price" placeholder="Enter the price."
                            {...formik.getFieldProps("price")}
                            invalid={
                                formik.touched.price && formik.errors.price !== undefined
                            }
                        />
                        <FormFeedback>
                            {formik.touched.price && formik.errors.price}
                        </FormFeedback>
                    </InputGroup>
                </FormGroup>

                <FormGroup tag="fieldset" onChange={e => {
                    setCat(e.target.value);
                    setCSelected([]);
                }
                }>
                    <legend>Size</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="size" value="kids" /> For Kids
                         </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="size" value="adult" /> For Adults
                        </Label>
                    </FormGroup>
                </FormGroup>
                <p>Size: {JSON.stringify(cSelected)}</p>
                {cat === "kids" &&
                    <FormGroup check>
                        <Label check style={{ marginRight: "15px", marginLeft: "15px" }}>
                            <Input type="checkbox" onClick={() => onCheckboxBtnClick("1-12")} />{" "}
                                1-12
                        </Label>
                        <Label check style={{ marginRight: "15px", marginLeft: "15px" }}>
                            <Input type="checkbox" onClick={() => onCheckboxBtnClick("13-24")} />{" "}
                               13-24
                        </Label>
                        <Label check style={{ marginRight: "15px", marginLeft: "15px" }}>
                            <Input type="checkbox" onClick={() => onCheckboxBtnClick("1-2")} />{" "}
                                1-2
                        </Label>
                    </FormGroup>
                }
                {cat === "adult" &&
                    <FormGroup check>
                        <Label check style={{ marginRight: "15px", marginLeft: "15px" }}>
                            <Input type="checkbox" onClick={() => onCheckboxBtnClick("sm")} />{" "}
                                sm
                        </Label>
                        <Label check style={{ marginRight: "15px", marginLeft: "15px" }}>
                            <Input type="checkbox" onClick={() => onCheckboxBtnClick("md")} />{" "}
                                md
                        </Label>
                        <Label check style={{ marginRight: "15px", marginLeft: "15px" }}>
                            <Input type="checkbox" onClick={() => onCheckboxBtnClick("lg")} />{" "}
                                lg
                        </Label>
                    </FormGroup>

                }
                <FormGroup>
                    <Label for="discount">Discount</Label>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider
                                value={typeof value === "number" ? value : 0}
                                onChange={handleSliderChange}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={100}
                            />
                        </Grid>
                        <Grid item>
                            <Input2
                                value={value}
                                margin="dense"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    min: 0,
                                    max: 100,
                                    type: "number",
                                    "aria-labelledby": "input-slider"
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewForm
