import React from "react";
import { Form, Button } from "react-bootstrap";


const Form1 = (props) => {
  const handleChange = (value, setter) => {
    setter(value);
  };

  const handleSubmit = async (e, submitSetter, formUrl, fields, addlParams) => {
    e.preventDefault();
    submitSetter(true);
    let urlParams = fields.reduce((acc, field) => {
      if (field.state[0] && field.state[0] !== "") {
        acc.append(field.googleFormId, field.state[0]);
      }
      return acc;
    }, new URLSearchParams());
    for (let i = 0; addlParams && i < addlParams.length; i++) {
      urlParams.append(addlParams[i][0], addlParams[i][1]);
    }
    const res = await fetch(formUrl, {
      method: "POST",
      body: urlParams,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(res);
  };
  return (
    <Form onSubmit={(e) => handleSubmit(e, props.submitSetter, props.formUrl, props.fields, props.addlParams)}>
      {props.fields.map((field) => {
        return (
          <Form.Group className="mb-3" controlId={field.name} key={field.name}>
            <Form.Label>{field.label + (field.required?"*":"")}</Form.Label>
            <Form.Control required={field.required}
              onChange={(e) => handleChange(e.target.value, field.state[1])}
              as={field.type==="textarea"?"textarea":"input"} type={field.type}
            />
          </Form.Group>
        );
      })}
      <Button variant="primary" type="submit" value="שלח">
        שלח
      </Button>
    </Form>
  );
}; 

export default Form1;
