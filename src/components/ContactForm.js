import { useState, useEffect } from "react";
import { Form, Button, Spinner, Container, Card } from "react-bootstrap";
import { globals } from "../resources/globals";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      let params = {
        action: "addSupport",
        name: name,
        phone: phone,
        description: description,
      }
      let httpConfig = globals.httpConfig(params);
      const response = await fetch(httpConfig.url);

      setName("");
      setPhone("");
      setDescription("");
      alert("הבקשה נרשמה, תודה :)");
    } catch (error) {
      console.error(error);
    }
    setUpdating(false);
  };


  return (
    <Container>
      <Card className="mt-3 p-3" style={{maxWidth:"500px"}}>
      <h3>עזרה</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" >
          <Form.Label>שם</Form.Label>
          <Form.Control value={name} required={true} onChange={(e) => setName(e.target.value)} type="text" as="input"/>
        </Form.Group>
        <Form.Group controlId="phone" >
          <Form.Label>טלפון</Form.Label>
          <Form.Control value={phone} required={true} onChange={(e) => setPhone(e.target.value)} type="text" as="input"/>
        </Form.Group>
        <Form.Group controlId="description" >
          <Form.Label>איך אפשר לעזור?</Form.Label>
          <Form.Control value={description} required={true} onChange={(e) => setDescription(e.target.value)} type="text" as="textarea"/>
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit" >
          {updating ? (
            <>
              <Spinner animation="border" size="sm" /> מעדכן...
            </>
          ) : (
            "שלח"
          )}
          
        </Button>
      </Form>
      </Card>      
    </Container>
  );
};

export default ContactForm;
