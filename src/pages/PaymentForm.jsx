import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import toast from "react-hot-toast";


import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { paymentEndPoint } from "../services/apis";
import { clearCart } from "../redux/Slices/cartSlice";
import axios from "axios";


const { PAYMENT_ORDER_API, PAYMENT_STATUS_API } = paymentEndPoint;

export default function PaymentForm() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
 
  const { cart } = useSelector((state) => state);
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState(null);

  const calculateAmount = useCallback(() => {
    if (cart.length === 0) return 0;
    return cart.reduce((acc, curr) => acc + curr.price, 0);
  }, [cart]);

  useEffect(() => {
    setAmount(calculateAmount());
  }, [cart, calculateAmount]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const data = {
    name: "User-XX",
    amount: amount,
    number: "9999999999",
    MUID: "MUID" + Date.now(),
    transactionId: "T" + Date.now(),
  };

  

  const handlePayment = async (e) => {
    
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      let res = await apiConnector("POST", PAYMENT_ORDER_API, data, { headers });
      if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
        window.location.href = res.data.data.instrumentResponse.redirectInfo.url;
        dispatch(clearCart());
      }
      let response = await apiConnector("GET", PAYMENT_STATUS_API, {}, { headers });
      console.log(response);
      if (response.data.success === true) {
        window.location.href = '/success';
      } else {
        window.location.href = '/fail';
      }
    } catch (error) {
      console.error(error);
      navigate("/api/v1/fail", { replace: true });
    }
  };
  return (
    <>
      <Card
        style={{
          width: "17rem",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "rgb(222 220 251)",
          border: "2px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
        }}
        className="logout-card"
      >
        <Card.Body className="logout-card-body" style={{ padding: "20px" }}>
          <Card.Title
            className="logout-card-title"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Amount: ${amount}
          </Card.Title>
         

          <Button
            variant="success"
            className="button-success"
            style={{ marginLeft: "15px" }}
            onClick={handlePayment}
          >
            Payment
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
