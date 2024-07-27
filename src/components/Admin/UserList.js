import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getProfilePicture } from '../../redux/actions/userActions';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.users.loading);
    const profilePicture = useSelector(state => state.profilePicture)

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <Container className="mt-4">
            <h1>Users</h1>
            {loading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>User Name</th>
                            <th>CPF</th>
                            <th>Email</th>
                            <th>Profile Picture</th>
                            <th>Active</th>
                            <th>Staff</th>
                            <th>Super</th>
                            <th>Not Locked</th>
                            <th>Last Seen</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.userName}</td>
                                <td>{user.cpf}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.profilePicture ? ( // http://localhost:9000/storage/display/carlos.jpg
                                        <img 
                                            // src={dispatch(getProfilePicture(user.profilePicture))}
                                            src={user.profilePicture} 
                                            alt="Profile" 
                                            style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>{user.isActive ? 'Yes' : 'No'}</td>
                                <td>{user.isStaff ? 'Yes' : 'No'}</td>
                                <td>{user.isSuper ? 'Yes' : 'No'}</td>
                                <td>{user.isNotLocked ? 'Yes' : 'No'}</td>
                                <td>{new Date(user.lastSeen).toLocaleString()}</td>
                                <td>{new Date(user.createdAt).toLocaleString()}</td>
                                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                                <td>
                                    <Button variant="warning" as={Link} to={`/edit-user/${user.id}`} className="mr-2">Edit</Button>
                                    <Button variant="danger" >Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default UserList;
