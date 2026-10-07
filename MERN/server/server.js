const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

const Student = mongoose.model("Student", {
  name: String,
  course: String,
  age: Number,
});

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is running!");
});

router.get("/students", async (req, res) => {
  try {
    res.json(await Student.find());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

router.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    res.json(await student.save());
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

router.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    student.name = req.body.name;
    student.course = req.body.course;
    student.age = req.body.age;
    res.json(await student.save());
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

router.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

app.use("/api", router);
app.use("/", router);

if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}

module.exports = app;