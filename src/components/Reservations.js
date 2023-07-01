import React, { useState, useEffect } from "react";
import { globals } from "../resources/globals";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Reservations = () => {
  const [requests, setRequests] = useState();
  const [selectedShift, setSelectedShift] = useState("ALL");
  const [shiftOptions, setShiftOptions] = useState();
  const [sortOrder, setSortOrder] = useState("requestTime");

  useEffect(() => {
    const fetchRequests = async () => {
      let httpConfig = globals.httpConfig({ action: "getRequests" });
      const response = await fetch(httpConfig.url);
      const data = await response.json();
      setRequests(data);
    };
    fetchRequests();
    const fetchShifts = async () => {
      try {
        let httpConfig = globals.httpConfig({ action: "getShifts" });
        const response = await fetch(httpConfig.url);
        const data = await response.json();
        setShiftOptions(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchShifts();
  }, []);

  const requestTableRow = (request, idx) => {
    return (
      <tr key={idx}>
        <td>{request.host}</td>
        <td>{request.guests}</td>
        <td>{request.shiftName}</td>
      </tr>
    );
  };
  const priorityOrder = (r1, r2) => {
    // todo: add priority by past executions
    return r1.shiftId !== r2.shiftId
      ? r1.shiftId < r2.shiftId
        ? -1
        : 1
      : r1.createMillis - r2.createMillis;
  };
  const optionalLockedShift = () => {
    return (
      <div><strong>
        {
          selectedShift === "20230701AM"?"הזמנות שאושרו:" :
          (selectedShift === "20230701PM"? "בשל הסגירה הלא צפויה של הבריכה אחר הצהריים בוטלו ההזמנות הבאות:":"")
        }
      </strong></div>);
  };
  const filteredSortedRequests = () => {
    let res =
      selectedShift === "ALL"
        ? requests
        : requests.filter((request) => request.shiftId === selectedShift);
    res.sort((r1, r2) =>
      sortOrder === "requestTime" ? r1.timeMillis - r2.timeMillis : priorityOrder(r1, r2)
    );
    return res;
  };

  if (!shiftOptions || !requests) return <div>טוען...</div>;
  return (
    <Container>
      <Row>
        <h1>רשימת בקשות האירוח</h1>
        <p>
          זוהי רשימת בקשות בלבד. ההזמנות יאושרו לפי הגדרות התיעדופים עם תום מועד הרישום המוקדם,
          בצהרי יום ה' הקודם לשבת המבוקשת{" "}
        </p>
      </Row>
      <Row>
        <Card className="m-3 p-3" style={{ maxWidth: "500px" }}>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="shift">
                  <Form.Label>סנן לפי</Form.Label>
                  <Form.Control
                    as="select"
                    className="form-select"
                    required={true}
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                  >
                    <option key="ALL" value="ALL">
                      כל הבקשות
                    </option>
                    {shiftOptions.map((shift) => (
                      <option key={shift.shiftId} value={shift.shiftId}>
                        {shift.shiftName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="sort" className="form-inline">
                  <Form.Label>מיין לפי</Form.Label>
                  <Form.Control
                    as="select"
                    className="form-select"
                    required={true}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="requestTime">זמן רישום</option>
                    <option disabled={selectedShift === "ALL"} value="weighted">
                      תעדוף משוקלל
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card>
      </Row>
      {optionalLockedShift()}

      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>מארח</th>
              <th># אורחים</th>
              <th>מועד אירוח</th>
            </tr>
          </thead>
          <tbody key={sortOrder + selectedShift}>
            {filteredSortedRequests().map((request, idx) => requestTableRow(request, idx))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Reservations;
