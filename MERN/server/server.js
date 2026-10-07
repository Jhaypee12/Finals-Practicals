const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
 .connect(process.env.MONGO_URI)
 .then(()=>{
    console.log("Connected to MongoDB")
 })
 .catch((error) => {
    console.log("MongoDB connection error:", error);
 });

const Student = mongoose.model("Student", {
  name: String,
  course: String,
  age: Number
});

app.get("/", (req, res) =>{
    res.send("Server is running!");
});

if (!process.env.VERCEL) app.listen(5000, ()=> {
    console.log("Server running on port 5000");
})

app.get("/api/students", async (req, res) =>{
    res.json(await Student.find());
});

app.post("/api/students", async (req, res) =>{
    const student = new Student(req.body);
    res.json(await student.save());
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, course: req.body.course, age: req.body.age },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

app.delete('/api/students/:id', (req, res) => {
    Student.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Student deleted successfully' }))
    .catch((error) => res.status(500).json({ error: 'Failed to delete student' }));
});    


let students = [
    {
        id: 1,
        name: "Juan Dela Cruz",
        course: "BSIT",
        age: 20
    }
];

module.exports = app;