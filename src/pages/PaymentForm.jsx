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
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let res = await apiConnector("POST", PAYMENT_ORDER_API, data, {headers})
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            window.location.href =res.data.data.instrumentResponse.redirectInfo.url;
            navigate('/');
            dispatch(clearCart());
             // Make a GET request to PAYMENT_STATUS_API after redirect
            const paymentStatusUrl = `${PAYMENT_STATUS_API}?id=${res.data.data.transactionId}`;
            axios.get(paymentStatusUrl)
              .then((response) => {
                console.log(response.data);
                if (response.data.success === true) {
                  navigate('/success');
                dispatch(clearCart()); // Clear the cart on successful payment
                toast.success("Payment successful");
                } else {
                  navigate('/fail');
                toast.error("Payment failed");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
          else{
            toast.error("Payment Failed");
          }
         
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
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
