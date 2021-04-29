import React from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';

export default function Login(props) {

    const { email, setEmail, password, setPassword, handleLogin, emailError, passwordError } = props;

    return (
        <div className="login-wrapper">
            <h4><strong>{"Software Gestione Domiciliari".toUpperCase()}</strong></h4>
            <h1>Please Log In</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        autoFocus 
                        required 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                     />
                     <Form.Text className="text-muted">{emailError}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        required 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                     />       
                    <Form.Text className="text-muted">{passwordError}</Form.Text>
 
                </Form.Group>

                <Button 
                    variant={(emailError === '' && passwordError === '') ? "primary" : "warning"} 
                    type="submit"
                    onClick={handleLogin}> 
                    Login
                </Button>
            </Form>
        </div>
        
    );
}