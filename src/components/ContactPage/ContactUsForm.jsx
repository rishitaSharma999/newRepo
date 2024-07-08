import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap/";
import InputGroup from "react-bootstrap/InputGroup";
import toast from "react-hot-toast";

import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Form Data - ", data);
    try {
      setLoading(true);
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      console.log("Email Res - ", res);
      setLoading(false);
      toast.success('Contact form submitted successfully!');
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
      toast.error("Submission failed");
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center h-100 mt-3">
          <Col xl={6}>
            <div className="signup">
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "rgb(28 46 52)",
                  textShadow: "2px 2px 4px #ccccff",
                }}
              >
                Contact
              </h1>
              <Form onSubmit={handleSubmit(submitContactForm)}>
                <Form.Group className="mb-1" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter first name"
                    style={{
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                    className="w-full rounded-[0.5rem] bg-blue-700 p-[12px]  text-emerald-200"
                    {...register("firstname", { required: true })}
                  />
                  {errors.firstname && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter your name.
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Enter last name"
                    style={{
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                    className="w-full rounded-[0.5rem] bg-blue-700 p-[12px]  text-emerald-200"
                    {...register("lastname")}
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    style={{
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                    className="w-full rounded-[0.5rem] bg-blue-700 p-[12px]  text-emerald-200"
                    {...register("email", { required: true })}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>

                  {errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter your Email address.
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    style={{
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label label="Phone Number">Phone Number</Form.Label>
                  <Form.Control
                    as="select"
                    {...register("countrycode", { required: true })}
                    className="form-select w-full rounded-[0.5rem] bg-blue-700 p-[12px] text-emerald-200"
                    style={{
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                  >
                    {CountryCode.map((ele, i) => {
                      return (
                        <option
                          key={i}
                          value={ele.code}
                          className="bg-blue-700 text-emerald-200"
                        >
                          {ele.code} - {ele.country}
                        </option>
                      );
                    })}
                  </Form.Control>
                  <Form.Control
                    type="tel"
                    name="phonenumber"
                    id="phonenumber"
                    placeholder="12345 67890"
                    style={{
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                    className="w-full rounded-[0.5rem] bg-blue-700 p-[12px]  text-emerald-200"
                    {...register("phoneNo", {
                      required: {
                        value: true,
                        message: "Please enter your Phone Number.",
                      },
                      maxLength: { value: 12, message: "Invalid Phone Number" },
                      minLength: { value: 10, message: "Invalid Phone Number" },
                    })}
                  />
                  {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      {errors.phoneNo.message}
                    </span>
                  )}
                </Form.Group>
                <InputGroup className="input-group">
                  
                  <Form.Label htmlFor="message">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    name="message"
                    id="message"
                    cols="30"
                    rows="3"
                    placeholder="Enter your message here"
                    className=" input-group-text-area"
                   
                    style={{width:"100%",
                      color: 'rgb(51, 51, 51)',
                      backgroundColor: 'rgb(223, 219, 249)',
                      border: '2px solid rgb(120, 30, 238)'
                    }}
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter your Message.
                    </span>
                  )}
                </InputGroup>

                <Button
                  variant="success"
                  className="button-success"
                  type="submit"
                  style={{marginTop:"10px"}}
                >
                  Submit
                </Button>
              </Form>

              <Link to="/login">Login page</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactUsForm;
