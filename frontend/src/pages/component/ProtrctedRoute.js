import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const token = localStorage.getItem('token');

    if (!token || !isAdmin) {
        return <Navigate to="/admin/java/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
