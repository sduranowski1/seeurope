import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ roles, children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to login if no token
        return <Navigate to="/admin/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userRoles = decodedToken.roles || [];

        // Check if the user has at least one of the required roles
        const hasRole = roles.some(role => userRoles.includes(role));
        if (!hasRole) {
            // Redirect if the user does not have the required role
            return <Navigate to="/" replace />;
        }

        // Render the children if the user has the required role
        return <>{children}</>;
    } catch (error) {
        // Handle decoding errors
        console.error('Token decoding error:', error);
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;
