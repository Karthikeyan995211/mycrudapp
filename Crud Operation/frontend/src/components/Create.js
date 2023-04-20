import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {toast} from 'react-toastify'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Create =()=> {
      const navigate=useNavigate();
      const [firstName, setFirstName]=useState('')
      const [lastName, setLastName]=useState('')
      const [location, setLocation]=useState('')
      const [email, setEmail]=useState('')
      const [dob, setDOB]=useState('')
      const [education, setEducation]=useState('')
      const [about, setAbout]=useState('')

      

      const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(firstName, lastName, location, email, dob, education, about)
        if (!firstName || !lastName || !location || !email || !dob || !education || !about){
           toast.error('Enter the all Fields Please')
        } else{
        axios.post("http://localhost:8080/users",{
          firstName:firstName,
          lastName:lastName,
          location:location,
          email:email,
          dob:(new Date(dob)).toLocaleDateString('en-CA'),
          education:education,
          about:about
        }).then(()=>toast.success('Student Added Succesfully'))
          .catch((err)=>toast.error(err.response.data))
          setFirstName('')
          setLastName('')
          setLocation('')
          setEmail('')
          setDOB('')
          setEducation('')
          setAbout('')
          setTimeout(()=>navigate('/'), 300)
      }
      }

  return (
    <div className="mt-3">
        <h3>ADD STUDENT DETAILS</h3>
        <Container>
        <Form className="mt-5">
        <Row>
        <Col>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalFirstName">
        <Form.Label column sm={2}>
          FirstName:
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="text" placeholder="FirstName" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
        </Col>
        
      </Form.Group><br></br>
      </Col>
      <Col>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalLastName">
        <Form.Label column sm={2}>
          LastName:
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="text" placeholder="LastName" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
        </Col>
        
      </Form.Group>
      </Col>
      </Row>

      <Row>
        <Col>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalLocation">
        <Form.Label column sm={2}>
          Location :
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="text" placeholder="Location" onChange={(e)=>setLocation(e.target.value)} value={location}/>
        </Col>
        
      </Form.Group>
      </Col>
      <Col>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email :
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="Email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </Col>
        
      </Form.Group><br></br>
      </Col>
      </Row>
      <Row>
        <Col>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalDOB">
        <Form.Label column sm={2}>
          DOB :
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="date" placeholder="DOB" onChange={(e)=>setDOB(e.target.value)} value={(new Date(dob)).toLocaleDateString('en-CA')}/>
        </Col>
        
      </Form.Group>
      </Col>
      <Col>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEducation">
        <Form.Label column sm={2}>
          Education:
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="text" placeholder="Education" onChange={(e)=>setEducation(e.target.value)} value={education}/>
        </Col>
        
      </Form.Group>
      </Col>
      </Row><br></br>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalAbout">
        <Form.Label column sm={2}>
          About :
        </Form.Label>
        <Col sm={8}> 
          <Form.Control type="text" placeholder="Enter Your Details" style={{ height: '100px' }} onChange={(e)=>setAbout(e.target.value)} value={about}/>
        </Col>
     
      </Form.Group>

      <Button type="submit" variant="dark" onClick={handleSubmit}>Submit form</Button>
      </Form>
      </Container>
    </div>
  )
}

export default Create