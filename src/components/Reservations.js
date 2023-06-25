import React, { useState, useEffect } from "react";
import { globals } from "../resources/globals";
import { Container, Row, Table } from "react-bootstrap";

const Reservations = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      let httpConfig = globals.httpConfig({ action: "getRequests" });
      const response = await fetch(httpConfig.url);
      const data = await response.json();
      setRequests(data.sort((r1, r2) => (r1.shift < r2.shift ? -1 : 1)));
    };
    fetchRequests();
  }, []);

  const requestTableRow = (request, idx) => {
    return (
      <tr key={idx}>
        <td>{request.host}</td>
        <td>{request.guests}</td>
        <td>{request.shift}</td>
      </tr>
    );
  };
  return (
    <Container>
      <Row>
        <h1>רשימת בקשות האירוח</h1>
        <p>זוהי רשימת בקשות בלבד. ההזמנות יאושרו לפי הגדרות התיעדופים עם תום מועד הרישום המוקדם, בצהרי יום ה' הקודם לשבת המבוקשת </p>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>מארח</th>
              <th># אורחים</th>
              <th>מועד אירוח</th>
            </tr>
          </thead>
          <tbody>
            {requests ? requests.map((request, idx) => requestTableRow(request, idx)) : <div></div>}
          </tbody>
        </Table>
      </Row>

    </Container>
  );
};

export default Reservations;
