const initialState = {
    user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                token: null,
            };

        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return {
                user: null,
                token: null,
            };
        case 'UPDATE_USER':
            return {
                user: action.payload.user,
                token: action.payload.token,
            };
            break;
        default:
            return state;
    }
};

export { initialState, authReducer };
