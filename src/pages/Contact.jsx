import React from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import ContactForm from "../components/ContactPage/ContactUsForm"


const Contact = () => {
  return (
    <>
    <div>
      <div className="mx-auto mt-20 flex w-9/12 justify-between gap-10 text-white flex-row">
        {/* Contact Details */}
        <div className="w-[50%]">
          
        </div>

        {/* Contact Form */}
        <div className="[50%]">
          
        </div>
      </div>
    </div>
    <Container>
      <Row>
        
        <Col ><ContactForm /></Col>
        
      </Row>
    </Container>
    </>
  )
}

export default Contact