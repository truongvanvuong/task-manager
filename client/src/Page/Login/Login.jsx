import { useState, useContext } from 'react';
import { authContext, loginUser } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

import message from '../../Utils/message.js';
import { AuthForm, Input } from '../../Component';
import validateEmail from '../../Utils/ValidateEmail.js';
import loginImg from '../../assets/image/img-login.svg';

const Login = () => {
    const navigate = useNavigate();

    const { dispatch } = useContext(authContext);

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const isEmail = validateEmail(credentials.email);
    const [errors, setErrors] = useState(credentials);
    const handleOnChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.value) {
            setErrors((prev) => ({ ...prev, [e.target.name]: false }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {
            email: !credentials.email ? 'Vui lòng nhập email' : !isEmail ? 'Email không hợp lệ' : null,
            password: !credentials.password ? 'Vui lòng nhập mật khẩu' : null,
        };

        setErrors(newErrors);
        const hasError = Object.values(newErrors).some(Boolean);
        if (!hasError) {
            const response = await loginUser(dispatch, credentials);
            console.log(response);
            if (response.success) {
                navigate('/home');
                message('success', response.message);
            } else {
                const { data } = response;
                message('error', data.message);
            }
        }
    };
    return (
        <div>
            <AuthForm
                handleSubmit={handleSubmit}
                linkTo="/register"
                img={loginImg}
                title="Đăng nhập"
                linkText="Đăng ký"
                btnText="Đăng nhập"
            >
                <Input
                    type="email"
                    name="email"
                    bordered
                    onChange={handleOnChange}
                    placeholder="Nhập email của bạn"
                    messError={errors.email}
                />
                <Input
                    passWord
                    type="password"
                    name="password"
                    bordered
                    onChange={handleOnChange}
                    placeholder="Nhập mật khẩu"
                    messError={errors.password}
                />
            </AuthForm>
        </div>
    );
};

export default Login;
