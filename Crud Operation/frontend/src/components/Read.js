import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {MdOutlineEditNote, MdDeleteSweep} from 'react-icons/md'
function Read(){ 
    const [user, setUser]=useState([])
    const [search, setSearch]=useState('')
    const navigate=useNavigate()
  
    const loadData = async () =>{
        const res =await axios.get("http://localhost:8080/users");
         setUser(res.data)
     }
    
     useEffect(()=>{
         loadData()
     },[])

       const handleDelete =(id)=>{
        if(window.confirm('Are you sure that want to Delete')) 
          
      {
          axios.delete(`http://localhost:8080/remove/${id}`);
        
          toast.success('user deleted')
          
          setTimeout(()=>loadData(),300)
        }       
         
        
       }


    
    const updateUser =({FirstName, LastName, Location, Email, DOB, Education, ABOUT, ID})=>{
        localStorage.setItem('id', ID)
        localStorage.setItem('firstName', FirstName)
        localStorage.setItem('lastName', LastName)
        localStorage.setItem('location', Location)
        localStorage.setItem('email', Email)
        localStorage.setItem('dob', DOB)
        localStorage.setItem('education', Education)
        localStorage.setItem('about', ABOUT)
        
        navigate('/update')    
    }
  
  return (
    <div>
      <Container>
        <h1>STUDENT LIST</h1>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalLocation">
    
    <Col sm={3}>
      <Form.Control type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
    </Col>
    
     </Form.Group>
        <Link to='/create'>
        <Button variant="dark" style={{padding:'15px', marginBottom:'20px', marginLeft:'60%' }} >ADD STUDENT</Button>
        </Link>
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Location</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Education</th>
          <th>About</th>
          <th>Action</th>
         
        </tr>
      </thead>
      <tbody>
            {
               user.filter((item)=>{
                return search.toLowerCase() === ''
                ? item : item.FirstName.toLowerCase().includes(search);
                
                
               }).map((item, index)=>{
                return(
                 <tr key={item.ID}>
              <td>{index + 1}</td>
              <td>{item.FirstName}</td>
              <td>{item.LastName}</td>
              <td>{item.Location}</td>
              <td>{item.Email}</td>
              <td>{item.DOB}</td>
              <td>{item.Education}</td>
              <td>{item.ABOUT}</td>
              <td><MdOutlineEditNote className='edit_button' style={{fontSize:'30px', color:'blue', marginRight:'10px'}} onClick={()=>updateUser(item)}/>
              <MdDeleteSweep className='edit_button' style={{fontSize:'30px', color:'red'}} onClick={()=>handleDelete(item.ID)}/></td>
                           
              </tr>
                  )
               }) 
              
            }
             
        
        
      </tbody>
    </Table>         
    </Container>

    </div>
  )
  
          }


export default Read;