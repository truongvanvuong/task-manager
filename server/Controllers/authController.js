import bcrypt from 'bcryptjs';
import User from '../Models/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  const { email, fullName, username, avatarUrl } = req.body;
  try {
    // hassing password

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được đăng ký',
      });
    }
    const newUser = new User({
      fullname: fullName,
      username: username,
      email: email,
      password: hash,
      avatarUrl: avatarUrl,
    });
    await newUser.save();

    res.status(200).json({
      data: newUser,
      success: true,
      message: 'Đăng ký tài thành công',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Lỗi tạo tài khoản, hãy thử lại',
      error: err,
    });
  }
};

const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Người dùng không tồn tại' });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: '15d',
    });
    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      token: token,
      data: user._doc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Đăng nhập không thành công',
      error: err,
    });
  }
};

export { register, login };
