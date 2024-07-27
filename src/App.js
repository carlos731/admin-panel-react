import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Admin/Dashboard';
import UserList from './components/Admin/UserList';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Provider store={store}>
            <Router>
                <div>
                    <ToastContainer />
                    <Navbar />
                    <Routes>
                        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
