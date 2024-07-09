import React from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import CartItem from "../components/CartItem";
import { clearCart } from "../redux/Slices/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  
  
  const { cart } = useSelector((state) => state);
  const [amount, setAmount] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  

  const calculateAmount = useCallback(() => {
    if (cart.length === 0) return 0;
    return cart.reduce((acc, curr) => acc + curr.price, 0);
  }, [cart]);
  {
    /* The component uses the useCallback hook to create a memoized callback function calculateAmount that calculates the total amount of the cart items. The function takes into account the cart state and returns the total amount. */
  }

  useEffect(() => {
    setAmount(calculateAmount());
  }, [cart, calculateAmount]);

  const placeOrder=()=>{
    if (!name || !address ) {
      toast.error('Please fill in all required fields');
      return;
    }
    console.log("button pressed");
    //dispatch(clearCart()); // clear the cart
    //console.log("cart cleared")
    //toast.success("Order placed successfully");
    navigate('/payment', { replace: true });
  }

  return (
    <>
      <Container  className="page-container">
        <Row className="mt-5">
          <Col xs={12} md={10} lg={8}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0" className="accordion-item" >
                <Accordion.Header  > Delivery Address</Accordion.Header>
                <Accordion.Body style={{
            color: 'rgb(51, 51, 51)',
            backgroundColor: '#01011b',
            border: '2px solid rgb(120, 30, 238)'
          }}>
                  <Form>
                    <Form.Group 
                      className="mb-3 form-group"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label >Enter Name</Form.Label>
                      <Form.Control type="name" placeholder="Jane Doe" required value={name} onChange={handleNameChange} 
        style={{
          color: 'rgb(51, 51, 51)',
          backgroundColor: 'rgb(223, 219, 249)',
          border: '2px solid rgb(120, 30, 238)'
        }}   />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                      
                    >
                      <Form.Label>Enter Address</Form.Label>
                      <Form.Control
                        type="address"
                        as="textarea"
                        rows={3}
                        placeholder="House-no,Street-no,Area,City,State,Pincode" required value={address}
                        onChange={handleAddressChange}
                        style={{
                          color: 'rgb(51, 51, 51)',
                          backgroundColor: 'rgb(223, 219, 249)',
                          border: '2px solid rgb(120, 30, 238)'
                        }}
                        
                      />
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              {/*
               <Accordion.Item eventKey="1" className="accordion-item">
                <Accordion.Header>Payment Method</Accordion.Header>
                <Accordion.Body>
                  <Form className="form-group">
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          label="Cash"
                          name="group1"
                          type={type}
                          id={`default-${type}`}
                          
                        ></Form.Check>
                        <Form.Check
                          label="Credit-Debit Cards"
                          name="group1"
                          type={type}
                          id={`default-${type}`}
                        ></Form.Check>
                        <Form.Check
                          label="UPI"
                          name="group1"
                          type={type}
                          id={`default-${type}`}
                        > </Form.Check>
                        <Form.Check
                          label="Net-Banking"
                          name="group1"
                          type={type}
                          id={`default-${type}`}
                        ></Form.Check>
                      </div>
                    ))}
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              */}
             
              <Accordion.Item eventKey="2">
                <Accordion.Header>Items and Delivery</Accordion.Header>
                <Accordion.Body style={{
            color: 'rgb(51, 51, 51)',
            backgroundColor: '#01011b',
            border: '2px solid rgb(120, 30, 238)'
          }}>
                <div className="cart-items">
                {cart.map((cartItem, index) => (
                  <div className="cart-item" key={cartItem.id}>
                    <CartItem item={cartItem} itemIndex={index} />
                  </div>
                ))}
              </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col xs={6} md={2} lg={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <Card.Subtitle className="mb-2 my-4 text-muted">
                  Choose a payment method and type the address to continue
                  checking out.
                </Card.Subtitle>
                <Card.Text>
                  Total Items:{" "}
                  <span style={{ color: "green", fontWeight: "600" }}>
                    {cart.length}
                  </span>
                </Card.Text>
                <Card.Text>
                  Total Amount:{" "}
                  <span style={{ color: "green", fontWeight: "600" }}>
                    ${amount}
                  </span>
                </Card.Text>
                <Card.Text>Items: <ul>
                    {cart.map((item) => (
                      <li key={item.id}>{item.title}</li>
                    ))}
                  </ul></Card.Text>
               
                <Button variant="primary"className="button-primary" onClick={placeOrder} >Place Your Order</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Checkout;
