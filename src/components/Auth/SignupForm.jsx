import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {Button,Form,Container,Row,Col} from "react-bootstrap/";

import { sendOtp } from "../../services/operations/authapi";
import { setSignupData } from "../../redux/Slices/authSlice";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center h-100 mt-3">
          <Col xl={5}>
            <div className="signup">
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "rgb(28 46 52)",
                  textShadow: "2px 2px 4px #ccccff",
                }}
              >
                SignUp
              </h1>
              <Form   onSubmit={handleOnSubmit}>
                <Form.Group className="mb-1" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                   required
                   type="text"
                   name="firstName"
                   style={{
                    color: 'rgb(51, 51, 51)',
                    backgroundColor: 'rgb(223, 219, 249)',
                    border: '2px solid rgb(120, 30, 238)'
                  }}
                   value={firstName}
                   onChange={handleOnChange}
                   placeholder="Enter first name"
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                  required
                  type="text"
                  name="lastName"
                  style={{
                    color: 'rgb(51, 51, 51)',
                    backgroundColor: 'rgb(223, 219, 249)',
                    border: '2px solid rgb(120, 30, 238)'
                  }}
                  value={lastName}
                  onChange={handleOnChange}
                  placeholder="Enter last name"
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="email"
                    style={{
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Create Password</Form.Label>
                  <Form.Control
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    style={{
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                  />
                  
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    style={{
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                  />
                   
                </Form.Group>

                <Button
                 type="submit"
                  variant="success"
                  className="button-success"
                  
                >
                  Submit
                </Button>
              </Form>

              
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignupForm;
