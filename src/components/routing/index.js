import React from 'react';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routing = ({ element: Element, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return isAuthenticated ? <PrivateRoute /> : <PublicRoute />
};

export default Routing;
