import { useEffect, useState } from "react";
import axios from "axios";

const API = "/students";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

<<<<<<< HEAD
<<<<<<< HEAD
  const loadStudents = () => {
    axios
      .get(API)
      .then((res) => setStudents(Array.isArray(res.data) ? res.data : []))
      .catch((error) => console.error("Error loading students:", error));
=======
=======
>>>>>>> parent of 50de225 (Update App.jsx)
  const API = "http://localhost:5000/api/students";

  const loadStudents = async () => {
    axios.get(API).then((res) => 
    setStudents(res.data)
    );
>>>>>>> parent of 50de225 (Update App.jsx)
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const resetForm = () => {
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  };

<<<<<<< HEAD
  const addStudent = () => {
    axios
      .post(API, { name, course, age })
      .then(() => {
        loadStudents();
        resetForm();
      })
      .catch((error) => console.error("Error adding student:", error));
  };

<<<<<<< HEAD
  const editStudent = (student) => {
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setEditingId(student._id);
  };

  const updateStudent = () => {
    axios
      .put(`${API}/${editingId}`, { name, course, age })
      .then(() => {
        loadStudents();
        resetForm();
      })
      .catch((error) => console.error("Error updating student:", error));
  };
=======
=======
>>>>>>> parent of 50de225 (Update App.jsx)
  const editStudent = (id) => {
    axios.put(`${API}/${id}`, { name, course, age }).then(() => {
      document.getElementById("name").value = name;
      document.getElementById("course").value = course;
      document.getElementById("age").value = age;
      document.getElementById("add-student").innerText = "Update Student";
    });
  }
<<<<<<< HEAD
>>>>>>> parent of 50de225 (Update App.jsx)
=======
>>>>>>> parent of 50de225 (Update App.jsx)

  const deleteStudent = (id) => {
    axios
      .delete(`${API}/${id}`)
      .then(() => loadStudents())
      .catch((error) => console.error("Error deleting student:", error));
  };

  return (
    <div>
      <h1>Student Management System</h1>

<<<<<<< HEAD
=======

      <br/>
      <h2>Add Student</h2>
        
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        <input
          type="text"
          id="course"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <br/>
        <input
          type="number"
          id="age"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br/>
        <button id="add-student" onClick={addStudent}>Add Student</button>
        
<<<<<<< HEAD
>>>>>>> parent of 50de225 (Update App.jsx)
=======
>>>>>>> parent of 50de225 (Update App.jsx)
      <h2>Students</h2>
      {students.map((student) => (
        <div key={student._id}>
          <p>ID: {student._id}</p>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
<<<<<<< HEAD
          <button onClick={() => editStudent(student)}>Edit</button>
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
=======
        
        <button onClick={() => editStudent(student._id)}>Edit</button>
        <button onClick={() => deleteStudent(student._id)}>Delete</button>
>>>>>>> parent of 50de225 (Update App.jsx)
        </div>
      ))}

      <br />
      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>

      <input
        type="text"
        id="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="text"
        id="course"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <br />
      <input
        type="number"
        id="age"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br />
      <button id="add-student" onClick={editingId ? updateStudent : addStudent}>
        {editingId ? "Update Student" : "Add Student"}
      </button>
    </div>
  );
}

export default App;