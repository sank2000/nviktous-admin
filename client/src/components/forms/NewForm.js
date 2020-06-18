import React from 'react'
import { Button, Form, FormGroup, Label, Input, CustomInput, FormFeedback } from 'reactstrap';
import Slider from '@material-ui/core/Slider';
import "./Form.css"
import ImageAdder from "./ImageAdder"
import TopNavbar from "../home/home-components/TopNavbar"; z

function valuetext(value) {
    return `${value}%`;
}

function NewForm() {
    return (
        <div className="form">
            <TopNavbar />
            <h2>Product Details</h2>
            <Form>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="prod-name" placeholder="Enter the product name." invalid={true} />
                    <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="desc">Description</Label>
                    <Input type="textarea" className="textarea" name="desc" placeholder="Add Description." rows="3" />
                </FormGroup>
                <FormGroup>
                    <Label for="category">Category</Label>
                    <CustomInput type="select" name="categorySelect" id="customInput">
                        <option value="">Select</option>
                        <option>Kid's Apperal</option>
                        <option>Men's Apperal</option>
                        <option>Women's Apperal</option>
                    </CustomInput>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image</Label>
                    <ImageAdder />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="text" name="price" placeholder="Enter the price." />
                </FormGroup>

                <FormGroup tag="fieldset">
                    <legend>Radio Buttons</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="kids" />{' '}
                            For Kids
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="adults" />{' '}
                            For Adults
                        </Label>
                    </FormGroup>
                </FormGroup>

                <FormGroup>
                    <Label for="discount">Discount</Label>
                    <Slider
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={100}
                    />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default NewForm
