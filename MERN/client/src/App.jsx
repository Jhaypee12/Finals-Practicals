import { useEffect, useState } from "react";
import axios from "axios";

function App(){

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

const API = import.meta.env.DEV ? "http://localhost:5000/api/students" : "/api/students";

  const loadStudents = async () => {
    axios.get(API).then((res) => 
    setStudents(res.data)
    );
  };

  useEffect(() => { 
    axios
    .get(API)
    .then((response)=>{
      setStudents(response.data);
    });
  }, []);

  const addStudent = () => {
    (editingId ? axios.put(`${API}/${editingId}`, { name, course, age }) : axios.post(API, { name, course, age })).then(() => {
    loadStudents();
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  });
  };

  const editStudent = (student) => {
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setEditingId(student._id);
  };

  const deleteStudent = (id) => {
    try{
    axios.delete(`${API}/${id}`).then(() => {
      loadStudents();
    });
    }
    catch (error) {
      console.error("Error deleting student:", error);
    }
  }



  return (
    <div>
      <h1>Student Management System</h1>



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
        <button onClick={addStudent}>{editingId ? "Update Student" : "Add Student"}</button>
   
   <br/>
      <h2>Students</h2>

      {students.map((student) =>(
        <div key={student._id}>
          <p>ID: {student._id}</p>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
        
        <button onClick={() => editStudent(student)}>Edit</button>
        <button onClick={() => deleteStudent(student._id)}>Delete</button>
        </div>
      ))}


    </div>
  );
}

export default App;