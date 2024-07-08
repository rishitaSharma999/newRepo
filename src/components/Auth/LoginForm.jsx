import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {Button,Form,Container,Row,Col} from "react-bootstrap/";


import { login } from "../../services/operations/authapi"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <>
    

    <Container>
        <Row className="justify-content-center align-items-center h-100 mt-5">
        <Col xl={5}>
        <div className="login">
        <h1 style={{fontSize: '36px',fontWeight: 'bold',color: 'rgb(28 46 52);',textShadow: '2px 2px 4px #ccccff'}}>Login</h1>
        <Form  onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required
          type="text"
          name="email"
          value={email}
          style={{
            color: 'rgb(51, 51, 51)',
            backgroundColor: 'rgb(223, 219, 249)',
            border: '2px solid rgb(120, 30, 238)'
          }}
          onChange={handleOnChange}
          placeholder="Enter email address" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          style={{
            color: 'rgb(51, 51, 51)',
            backgroundColor: 'rgb(223, 219, 249)',
            border: '2px solid rgb(120, 30, 238)'
          }}
          onChange={handleOnChange} />
          </Form.Group>
          <Button variant="success" className="button-success" type="submit" >Submit</Button>
        <Link to="/signup">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
           Signup
          </p>
        </Link>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
          
          
        </Form>
        
      </div>
        </Col>
      
      </Row>
    </Container>
    </>
  )
}

export default LoginForm