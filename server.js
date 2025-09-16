const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://localhost:27017/guardPatrol", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/guards", require("./routes/guardRoutes"));
app.use("/api/qr", require("./routes/qrRoutes"));
app.use("/api/patrol", require("./routes/patrolRoutes"));
app.listen(5000, () => console.log("Server running on 5000"));
