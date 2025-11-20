import { Navigate } from 'react-router-dom';
import useAdminAuthHook from '../hooks/useAdminAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuthHook();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

