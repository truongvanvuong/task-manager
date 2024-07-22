import { useState } from "react";
import { AuthForm, Input } from "../../Component";
import validateEmail from "../../Utils/ValidateEmail.js";

import registerImg from "../../assets/image/img-register.svg";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [errors, setErrors] = useState(credentials);

  const isEmail = validateEmail(credentials.email);
  const handleOnChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: !credentials.name ? "Vui lòng nhập họ và tên" : null,
      email: !credentials.email
        ? "Vui lòng nhập email"
        : !isEmail
        ? "Email không hợp lệ"
        : null,
      password: !credentials.password
        ? "Vui lòng nhập mật khẩu"
        : credentials.password.length < 6
        ? "Độ dài mật khẩu phải từ 6 ký tự trở lên"
        : null,
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
        linkTo="/login"
        img={registerImg}
        title="Tạo tài khoản"
        linkText="Đăng nhập"
        btnText="Tạo tài khoản"
      >
        <Input
          type="text"
          name="name"
          bordered
          placeholder="Họ và tên"
          onChange={handleOnChange}
          messError={errors.name}
        />
        <Input
          type="email"
          name="email"
          bordered
          placeholder="Nhập email của bạn"
          onChange={handleOnChange}
          messError={errors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Nhập mật khẩu"
          bordered
          onChange={handleOnChange}
          messError={errors.password}
        />
      </AuthForm>
    </div>
  );
};

export default Register;
