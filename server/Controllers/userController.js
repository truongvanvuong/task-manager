import User from '../Models/User.js';
import bcrypt from 'bcryptjs';

const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'Cập nhật thông người dùng thành công',
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Thông tin người dùng chưa được cập nhật',
      error: err,
    });
  }
};
const changPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Người dùng không tồn tai' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Mật khẩu cũ không chính xác' });
    }
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(newPassword, salt);
    await user.save();
    res
      .status(200)
      .json({ success: true, message: 'Thay đổi mật khẩu thành công' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Lỗi thay đổi mật khẩu', error: err });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: 'profile info is getting',
      data: { ...rest },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong, cannot get' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Người dùng đã được xóa',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Lỗi, xóa người dùng',
      error: err,
    });
  }
};
export { getUser, updateUser, deleteUser, getUserProfile, changPassword };
