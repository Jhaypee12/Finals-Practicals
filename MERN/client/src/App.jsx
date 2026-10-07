import { useEffect, useState } from "react";
import axios from "axios";

function App(){

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const API = "http://localhost:5000/api/students";

  const loadStudents = async () => {
    axios.get(API).then((res) => 
    setStudents(res.data)
    );
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const addStudent = () => {
    axios.post(API, { name, course, age }).then ((res) => {
    loadStudents();
    setName("");
    setCourse("");
    setAge("");
  });
  };

  const editStudent = (id) => {
    axios.put(`${API}/${id}`, { name: student._id.name, course, age }).then((res) => {
      document.getElementById("name").value = name;
      document.getElementById("course").value = course;
      document.getElementById("age").value = age;
      document.getElementById("add-student").innerText = "Update Student";
    });
  }

  const deleteStudent = (id) => {
    try{
    axios.delete(`${API}/${id}`).then((res) => {
      loadStudents();
    });
    }
    catch (error) {
      console.error("Error deleting student:", error);
    }
  }

  useEffect(() => { 
    axios
    .get(API)
    .then((response)=>{
      setStudents(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>Students</h2>

      {students.map((student) =>(
        <div key={student._id}>
          <p>ID: {student._id}</p>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
        
        <button onClick={() => editStudent(student._id)}>Edit</button>
        <button onClick={() => deleteStudent(student._id)}>Delete</button>
        </div>
      ))}

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
   
    </div>
  );
}

export default App;