import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { logout } from "../../services/operations/authapi";

export default function Logout() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>{
        dispatch(logout(navigate));
    }
  return (
    <Container  >
      <Row>
        <Col>
          <Card style={{ width: "20rem",margin: "40px auto",padding: "20px", backgroundColor: "rgb(222 220 251)",border: "2px solid #ddd",borderRadius: "10px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)" }} className="logout-card">
            <Card.Body className="logout-card-body"  style={{padding: "20px" }} >
              <Card.Title className="logout-card-title" style={{fontSize: "20px",fontWeight: "bold",marginBottom: "10px"}}>You are logged In</Card.Title>
              <Card.Text className="logout-card-text"  style={{ fontSize: "14px",color: "#666" }}>
                You can logout or Signup with different account
              </Card.Text>
              <Button  variant="success"className="button-success" style={{marginRight:"10px"}}  onClick={handleLogout} >Logout</Button>
              <Button variant="success"className="button-success" style={{marginLeft:"40px"}} onClick={()=>navigate("/signup")}>SignUp</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
