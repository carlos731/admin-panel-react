import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../redux/actions/authActions';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './Signup.css'; // Certifique-se de criar esse arquivo CSS

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        cpf: '',
        email: '',
        password: '',
        profilePicture: null // Alterado para null para lidar com arquivos
    });
    const [preview, setPreview] = useState(null); // Estado para armazenar o preview da imagem
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { firstName, lastName, cpf, email, password, profilePicture } = formData;

    const onChange = e => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] }); // Atualiza com o arquivo selecionado
            setPreview(URL.createObjectURL(files[0])); // Cria um URL para o preview da imagem
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const onRemoveImage = () => {
        setFormData({ ...formData, profilePicture: null });
        setPreview(null);
        document.getElementById('profilePictureInput').value = ''; // Limpa o input de arquivo
    };

    const onSubmit = async e => {
        e.preventDefault();

        // Cria um FormData para enviar o arquivo
        const data = new FormData();
        data.append('firstname', firstName);
        data.append('lastname', lastName);
        data.append('cpf', cpf);
        data.append('email', email);
        data.append('password', password);
        if (profilePicture) {
            data.append('profilePicture', profilePicture); // Adiciona o arquivo
        }

        dispatch(signup(data, navigate));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <div className="card p-4" style={{ maxWidth: '600px', width: '100%' }}>
                        <h2 className="mb-4 text-center">Signup</h2>
                        <Form onSubmit={e => onSubmit(e)}>
                            <div className="profile-picture-container mb-3">
                                <img 
                                    src={preview || 'https://via.placeholder.com/150'} 
                                    alt="Profile Preview" 
                                    className="profile-picture" 
                                    onClick={() => document.getElementById('profilePictureInput').click()} 
                                />
                                {preview && (
                                    <button 
                                        type="button" 
                                        className="profile-picture-remove"
                                        onClick={onRemoveImage}
                                    >
                                        X
                                    </button>
                                )}
                                <Form.Control
                                    type="file"
                                    name="profilePicture"
                                    id="profilePictureInput"
                                    onChange={e => onChange(e)}
                                    accept="image/*" // Aceita apenas imagens
                                    style={{ display: 'none' }} // Esconde o input de arquivo
                                />
                            </div>
                            <Form.Group controlId="formFirstName" className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formLastName" className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCpf" className="mb-3">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cpf"
                                    value={cpf}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={e => onChange(e)}
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
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Signup
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
