import { useState, useEffect } from "react";
import StudentsTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import studentsData from "./data/students.json";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1000);
  }, []);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    setEditStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  if (loading) return <h2>Loading students...</h2>;

   return (
  <div className="container">

    <div className="header">
      <h1>Student Management System</h1>
      <p className="subtitle">
        Add, edit, delete students and export data to Excel
      </p>
    </div>

    <StudentForm
      addStudent={addStudent}
      updateStudent={updateStudent}
      editStudent={editStudent}
    />

    <StudentsTable
      students={students}
      setEditStudent={setEditStudent}
      deleteStudent={deleteStudent}
    />

  </div>
);
}

export default App;