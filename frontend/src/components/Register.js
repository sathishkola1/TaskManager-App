import React, { useState, useEffect } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col,Nav,Tabs,Tab,Sonnet } from 'react-bootstrap'
import FormContainer from './FormContainer'
import Message from './Message'
import axios from 'axios'
import Header from './Header'
function Register() {

   
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [age,setAge] = useState('')
    const [role,setRole] = useState('buyer')

    let navigate=useNavigate()
    const SubmitHandler =async (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            let {data}=await axios.post(
                '/api/users/',
                { 'email': email, 'password': password ,'name':name,'age':age},
                {headers: {
                    'Content-type': 'application/json'
                }}
            )
           
            if(data.status=='OK'){
                navigate('/login',{replace:true})
            }
            else{
                navigate('/register',{replace:true})
            }
          
        }

    }
    return (
        <div>
        <Header/>,
        <FormContainer>
            {message && <Message variant='danger'>{message}</Message>}
    <Form onSubmit={SubmitHandler}>
    <div style={{'padding':'20px'}}></div>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
               

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='age'>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter Age'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
              
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={'/login'}>
                        Sign In
                        </Link>
                </Col>
            </Row>
           
         </FormContainer >
         </div>
    )
}

export default Register
