const Task = require("../models/Task");

module.exports.createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, completed } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      completed,
      user: req.user._id,
    });
    console.log(task);
    if (task) {
      // console.log(req.user);
      req.user.tasks.push(task._id);
      await req.user.save();
      res.status(201).json({
        _id: task._id,
        title: task.title,
        dueDate: task.dueDate,
        completed: task.completed,
      });
    } else {
      res.status(400);
      throw new Error("Invalid task data");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    } else {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (updatedTask) {
        const tasks = req.user.tasks.filter(
          (task) => task._id !== req.params.id
        );
        req.user.tasks = tasks;
        await req.user.save();
      }
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    } else {
      await Task.findByIdAndDelete(req.params.id);
      req.user.tasks.map((task) =>
        console.log(task._id.toString() !== req.params.id.toString())
      );
      const tasks = req.user.tasks.filter((task) => task._id !== req.params.id);
      console.log(tasks);
      req.user.tasks = tasks;
      await req.user.save();
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};
