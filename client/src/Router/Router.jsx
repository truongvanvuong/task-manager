import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../Layout';
import { Home, Completed, InCompleted, Important, Login, Register } from '../Page';
import ProtectedRouter from './protectedRoute.jsx';
const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
                path="/home"
                element={
                    <ProtectedRouter>
                        <Layout>
                            <Home />
                        </Layout>
                    </ProtectedRouter>
                }
            />
            <Route
                path="/completed"
                element={
                    <ProtectedRouter>
                        <Layout>
                            <Completed />
                        </Layout>
                    </ProtectedRouter>
                }
            />
            <Route
                path="/incompleted"
                element={
                    <ProtectedRouter>
                        <Layout>
                            <InCompleted />
                        </Layout>
                    </ProtectedRouter>
                }
            />
            <Route
                path="/important"
                element={
                    <ProtectedRouter>
                        <Layout>
                            <Important />
                        </Layout>
                    </ProtectedRouter>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default Routers;
