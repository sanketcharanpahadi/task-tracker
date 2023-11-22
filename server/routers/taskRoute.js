const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { verifyUser } = require("../middleware/verifyUser");

const router = express.Router();

router.route("/").post(verifyUser, createTask);
router.route("/").get(verifyUser, getTasks);
router.route("/:id").put(verifyUser, updateTask);
router.route("/:id").delete(verifyUser, deleteTask);

module.exports = router;
