import { useState, useEffect } from "react";
import { Form, Button, Spinner, Container, Card } from "react-bootstrap";
import { globals } from "../resources/globals";
import Select from "react-select";

const RequestForm = () => {
  const [selectedHost, setSelectedHost] = useState();
  const [selectedGuests, setSelectedGuests] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [updating, setUpdating] = useState(false);
  const [hostOptions, setHostOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        let httpConfig = globals.httpConfig({ action: "getHosts"});
        const response = await fetch(httpConfig.url);
        const data = await response.json();
        setHostOptions(data.map((hostObj) => hostObj.name).sort());
      } catch (e) {
        console.error(e);
      }
    };
    fetchHosts();

    const fetchShifts = async () => {
      try {
        let httpConfig = globals.httpConfig({ action: "getShifts" });
        const response = await fetch(httpConfig.url);
        const data = await response.json();
        setShiftOptions(
          data.sort((shiftObj1, shiftObj2) => (shiftObj1.shiftId < shiftObj2.shifId ? -1 : 1))
        );
      } catch (e) {
        console.error(e);
      }
    };
    fetchShifts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHost){
      alert("נא בחרו את שם המארח");
      return;      
    }
    setUpdating(true);
    try {
      let params = {
        action: "addRequest",
        host: selectedHost,
        guests: selectedGuests,
        shiftId: selectedShift,
        shiftName: shiftOptions.filter(option => option.shiftId === selectedShift)[0].shiftName,
      };
      let httpConfig = globals.httpConfig(params);
      await fetch(httpConfig.url);

      setSelectedGuests("");
      setSelectedHost("");
      setSelectedShift("");
      alert("הבקשה נרשמה, תודה :)");
    } catch (error) {
      console.error(error);
    }
    setUpdating(false);
  };

  if (hostOptions.length === 0 || shiftOptions.length === 0) {
    return <div>טוען...</div>;
  }

  return (
    <Container>
      <Card className="mt-3 p-3" style={{ maxWidth: "500px" }}>
        <h3>בקשה להזמנת אורחים</h3>
        <div> שימו לב: </div>
        <ul>
          <li>משמרת בוקר 10:00-14:00</li>
          <li>משמרת אחה"צ 14:00-18:00</li>
        </ul>
        <Form.Group controlId="host">
            <Form.Label>מארח</Form.Label>

        <Select
          options={
            hostOptions.map((name) => ({ value: name, label: name }))
          }
          onChange={(e) => {
            setSelectedHost(e.value);
            console.log(selectedHost);
          }}
          required
          value={{ value: selectedHost, label: selectedHost }}
          key={selectedHost}
          isSearchable/>
          </Form.Group>
        <Form onSubmit={handleSubmit}>

          <Form.Group controlId="guests" className="mt-3">
            <Form.Label>מספר אורחים</Form.Label>
            <Form.Control
              as="select"
              className="form-select"
              required={true}
              value={selectedGuests}
              onChange={(e) => setSelectedGuests(e.target.value)}
            >
              <option key=""></option>
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="shift" className="mt-3">
            <Form.Label>מועד האירוח</Form.Label>
            <Form.Control
              as="select"
              className="form-select"
              required={true}
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
            >
              <option key=""></option>
              {shiftOptions.map((shift) => (
                <option key={shift.shiftId} value={shift.shiftId}>
                  {shift.shiftName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button className="mt-3" variant="primary" type="submit" disabled={updating}>
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

export default RequestForm;
