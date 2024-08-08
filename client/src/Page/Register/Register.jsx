import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthForm, Input } from "../../Component";
import validateEmail from "../../Utils/ValidateEmail.js";
import message from "../../Utils/message.js";
import { register } from "../../authService/authService.js";
import registerImg from "../../assets/image/img-register.svg";

const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState(credentials);

  const isEmail = validateEmail(credentials.email);
  const handleOnChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      fullName: !credentials.fullName ? "Vui lòng nhập họ và tên" : null,
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
      try {
        const response = await register(credentials);
        if (response.success) {
          navigate("/login");
          message("success", response.message);
        }
      } catch (error) {
        const { data } = error.response;
        message("error", data.message);
        console.log(error);
      }
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
          name="fullName"
          bordered
          placeholder="Họ và tên"
          onChange={handleOnChange}
          messError={errors.fullName}
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
          passWord
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
