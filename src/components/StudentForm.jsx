import { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editStudent }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editStudent) setForm(editStudent);
  }, [editStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.age) {
      alert("All fields are required");
      return;
    }

    if (!validateEmail(form.email)) {
      alert("Invalid email");
      return;
    }

    if (editStudent) {
      updateStudent(form);
    } else {
      addStudent(form);
    }

    setForm({ name: "", email: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        type="number"
        min ="1"
        value={form.age}
        onChange={handleChange}
      />

      <button type="submit">
        {editStudent ? "Update" : "Add"} Student
      </button>
    </form>
  );
}

export default StudentForm;