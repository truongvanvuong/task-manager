import User from '../Models/User.js';

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
export { getUser, updateUser, deleteUser };
