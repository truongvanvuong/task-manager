import bcrypt from 'bcryptjs';
import User from '../Models/User.js';

const register = async (req, res) => {
  try {
    // hassing password

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hash,
    });

    await newUser.save();

    res.status(200).json({
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
  const username = req.body.username;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Người dùng không tồn tại' });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkCorrectPassword) {
      return res.status(404).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
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
