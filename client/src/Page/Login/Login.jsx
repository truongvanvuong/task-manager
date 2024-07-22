import { useState } from "react";
import { AuthForm, Input } from "../../Component";
import validateEmail from "../../Utils/ValidateEmail.js";
import loginImg from "../../assets/image/img-login.svg";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });

  const isEmail = validateEmail(credentials.email);
  const [errors, setErrors] = useState(credentials);
  const handleOnChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: !credentials.email
        ? "Vui lòng nhập email"
        : !isEmail
        ? "Email không hợp lệ"
        : null,
      password: !credentials.password ? "Vui lòng nhập mật khẩu" : null,
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);
    if (!hasError) {
      console.log(credentials);
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
