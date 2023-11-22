require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routers/userRoute");
const taskRouter = require("./routers/taskRoute");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
