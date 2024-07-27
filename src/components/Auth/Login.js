import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <div className="card p-4">
                        <h2 className="mb-4 text-center">Login</h2>
                        <Form onSubmit={e => onSubmit(e)}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email" 
                                    value={email} 
                                    onChange={e => onChange(e)} 
                                    placeholder="Enter your email" 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="password" 
                                    value={password} 
                                    onChange={e => onChange(e)} 
                                    placeholder="Enter your password" 
                                    required 
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                            <Link to="/signup" className="wt-10 w-100">
                                Sign Up
                            </Link>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
