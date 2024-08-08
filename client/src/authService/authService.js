import axios from "axios";
import { BASE_URL } from "../config.js";

const register = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, credentials);
  return response.data;
};

// Đăng nhập người dùng
const login = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Lấy thông tin người dùng
const getProfile = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get(`${BASE_URL}/user/profile/me`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

// Đăng xuất
const logout = () => {
  localStorage.removeItem("user");
};

export { register, login, getProfile, logout };
