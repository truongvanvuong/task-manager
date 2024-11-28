import Task from '../Models/Task.js';

const createTask = async (req, res) => {
  const userId = req.user.id;
  const newTask = new Task({ ...req.body, userId: userId });
  try {
    const savedTask = await newTask.save();
    res.status(200).json({
      success: true,
      data: savedTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const getTask = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const task = await Task.findById({ _id: id, userId: userId });
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {}
};
const getTaskCompleteds = async (req, res, next) => {
  req.filter = { userId: req.user.id, completed: true };
  next();
};
const getTaskImportants = async (req, res, next) => {
  req.filter = { userId: req.user.id, important: true };
  next();
};
const getTaskIncompletes = async (req, res, next) => {
  req.filter = { userId: req.user.id, completed: false };
  next();
};
const getAllTask = async (req, res, next) => {
  req.filter = { userId: req.user.id };
  next();
};
const updateTask = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const updateTask = await Task.findByIdAndUpdate(
      { _id: id, userId: userId },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updateTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
const deleteTask = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    await Task.findByIdAndDelete({ _id: id, userId: userId });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export {
  createTask,
  getTask,
  getTaskCompleteds,
  getTaskIncompletes,
  getTaskImportants,
  getAllTask,
  updateTask,
  deleteTask,
};
