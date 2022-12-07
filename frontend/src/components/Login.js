import React, { useState, useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from './Message'
import FormContainer from './FormContainer'
import axios from 'axios'
import base64 from 'base-64'
import Header from './Header'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate=useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        let {data}=await axios.post(
            '/api/users/login',
            { 'email': email, 'password': password},
            {headers: {
                'Content-type': 'application/json'
            }}
        )
        
        if(data.status=='OK'){
            let token=data.token
            const parts = token.split('.')
            let decodedToken = base64.decode(parts[1])
            decodedToken = JSON.parse(decodedToken)
            localStorage.setItem('user',JSON.stringify({id:decodedToken._id,token}))
            navigate('/dashboard',{replace:true})
        }
        else{
            navigate('/login',{replace:true}) 
        }
    }

    return (
        <div>
        <Header/>
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={'/register'}>
                        Register
                        </Link>
                </Col>
            </Row>

        </FormContainer>
        </div>
    )
}

export default Login
