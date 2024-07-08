import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import CartItem from "../components/CartItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import {add,remove,clearCart} from "../redux/Slices/cartSlice"





{/* The useCallback hook in React is used to memoize a function so that it's not recreated on every render. This is useful when you want to prevent a function from being recreated unnecessarily, which can cause unnecessary re-renders of child components. */}
{/*  Memoization is an optimization technique used to speed up applications by storing the results of expensive function calls and reusing them when the same inputs occur again. In React, memoization is used to prevent unnecessary re-renders of components. */}
{/* In React, rendering refers to the process of creating the UI of a component. When a component's state or props change, React re-renders the component to update the UI.*/}

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');

  
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const calculateAmount = useCallback(() => {
    if (cart.length === 0) return 0;
    return cart.reduce((acc, curr) => acc + curr.price, 0);
  }, [cart]);
  {/* The component uses the useCallback hook to create a memoized callback function calculateAmount that calculates the total amount of the cart items. The function takes into account the cart state and returns the total amount. */}

  useEffect(() => {
    setAmount(calculateAmount());
  }, [cart, calculateAmount]);

  

  const checkOutFunction = async () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      navigate("/checkout");
    }
    else{
      toast("Login First to checkout");
      navigate("/login");
    }
    
    // If token is invalid or user is not logged in, redirect to login page
    
    
  }

  {/* he component uses the useEffect hook to update the amount state whenever the cart state changes. The effect is triggered when the cart state or the calculateAmount function changes. */}

  return (
    <>
      {  cart.length > 0 ? (
        <Container>
          <Row>
            <Col xs={12} md={10} lg={8}>
              <div className="cart-items" key="cart-items">
                {cart.map((cartItem, index) => (
                  <div className="cart-item" key={cartItem.id}>
                    <CartItem item={cartItem}  />
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={6} md={2} lg={4}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Your Cart</Card.Title>
                  <Card.Text>Total Items: <span style={{color:"green",fontWeight:"600"}}>{cart.length}</span></Card.Text>
                  <Card.Text>
                    Total Amount: <span style={{color:"green",fontWeight:"600"}}>${amount}</span>
                  </Card.Text>
                  
                  <Button variant="success" className="button-success" onClick={checkOutFunction} >CheckOut Now</Button>
                  
                  
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="cart-container" key="empty-cart">
          <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title> Your cart is empty!</Card.Title>
            <NavLink to="/">
              <Button variant="primary" >Shop Now</Button>
            </NavLink>
          </Card.Body>
        </Card>
        </div>
        
      )}
    </>
  );
};

export default Cart;
