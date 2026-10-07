const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

const Student = mongoose.model("Student", {
  name: String,
  course: String,
  age: Number,
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/students", async (req, res) => {
  try {
    res.json(await Student.find());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    res.json(await student.save());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    student.name = req.body.name;
    student.course = req.body.course;
    student.age = req.body.age;
    res.json(await student.save());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}

module.exports = app;