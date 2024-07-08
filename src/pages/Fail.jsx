import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {  useNavigate } from 'react-router-dom';

export default function Fail() {
    const navigate=useNavigate();
  return (
    <div>
        <Stack gap={3}>
      <div className="p-2"><Alert key='danger' variant='danger'>
          Payment Failed
        </Alert></div>
      <div className="p-2"><Card style={{ width: "17rem",margin: "40px auto",padding: "20px", backgroundColor: "rgb(222 220 251)",border: "2px solid #ddd",borderRadius: "10px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)" }} className="logout-card">
            <Card.Body className="logout-card-body"  style={{padding: "20px" }} >
              
              <Card.Text className="logout-card-text"  style={{ fontSize: "14px",color: "#666" }}>
                The payment failed
              </Card.Text>
             
              <Button variant="success"className="button-success" style={{marginLeft:"5px"}} onClick={()=>navigate("/cart")}>Go to Cart</Button>
            </Card.Body>
          </Card></div>
    </Stack>
    </div>
  )
}
