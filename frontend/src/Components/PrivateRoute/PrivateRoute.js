import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import  AuthContext  from '../../AuthContext';

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);
  console.log(`Token: ${token}`);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
