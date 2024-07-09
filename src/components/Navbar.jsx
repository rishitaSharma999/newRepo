import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



{
  /*{/*FaShoppingCart from react-icons/fa: This is a React component that renders a shopping cart icon from the Font Awesome library. */
}
{
  /* {/*This is a hook that allows the component to access the state of the Redux store. */
}
{
  /*  {/*This is a component that renders a link that can be used to navigate between routes in a React application. */
}



export default function MyNavbar() {
  const { cart } = useSelector((state) => state);
  
  return (
    <Navbar expand="md" className="navbar-dark py-4" style={{ color: "#ffffff" }}>
      <Container>
        <NavLink to="/" className="text-white">
          
            Shopping Store
          
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="text-white hover-home px-2">
              Home
            </NavLink>
            
            <NavLink to="/login" className="text-white hover-home px-2">login</NavLink>
            <NavLink to="/signup" className="text-white hover-home px-2">Signup</NavLink>
            <NavLink to="/contact" className="text-white hover-home px-2">Contact Us</NavLink>
           
           
           
            <NavLink to="/cart" className="text-white px-2">
              <FaShoppingCart className="text-2xl " />
              {cart.length > 0 && (  
                <span class="circle">
                  {cart.length}
                </span>
              )} {/* when the size of the card is more than 0 then we have that green span element  */}
            </NavLink>
             
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

/* React redux is a library that relies on single immutable object to store all the data*/
// if we want to change the state like when a button is clicked then new object is made that contains the current state and the action payload into a reducer function that returns a new object, therefore we can move back and forth between states
// first we install the redux toolkit  "npm install @reduxjs/toolkit react-redux"
// redux is one single piece of store where all states are stored , if we update anything in redux store then it gets updated elsewhere also
// the components do not interact with each other but they are in direct contact with the redux store, this way we avoid prop drilling
// a state is generally for only one component and we can read the state of only that component exceot for when we do prop drilling
// reducer is a function that helps us in changing the state , takes previous state and action
