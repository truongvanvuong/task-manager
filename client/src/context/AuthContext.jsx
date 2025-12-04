import { createContext, useEffect, useReducer } from 'react';
import { login, logout } from '../authService/authService.js';
import { authReducer, initialState } from '../Reducer/reducer.js';

const authContext = createContext(initialState);

const loginUser = async (dispatch, credentials) => {
    try {
        const response = await login(credentials);
        const { token, data } = response;
        const userData = {
            avatarUrl: data.avatarUrl,
            email: data.email,
            fullname: data.fullname,
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: userData, token: token } });
        return response;
    } catch (err) {
        console.error('Login failed:', err);
        return err.response;
    }
};

const logoutUser = (dispatch) => {
    logout();
    dispatch({ type: 'LOGOUT' });
};
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
        } else {
            localStorage.removeItem('user');
        }
        if (state.token) {
            localStorage.setItem('token', state.token);
        } else {
            localStorage.removeItem('token');
        }
    }, [state.user, state.token]);

    return (
        <authContext.Provider value={{ user: state.user, token: state.token, dispatch }}>
            {children}
        </authContext.Provider>
    );
};

export { authContext, AuthContextProvider, loginUser, logoutUser };
