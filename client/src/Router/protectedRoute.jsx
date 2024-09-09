import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { authContext } from '../context/AuthContext.jsx';

const ProtectedRouter = ({ children }) => {
    const { token } = useContext(authContext);

    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRouter;
