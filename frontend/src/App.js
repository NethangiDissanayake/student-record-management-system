import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStudents, createStudent, updateStudent, deleteStudent } from './api';
import StudentForm from './components/StudentForm';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => { loadStudents(); }, []);

  const handleSubmit = async (data) => {
    if (editingStudent) {
      await updateStudent(editingStudent._id, data);
      setEditingStudent(null);
    } else {
      await createStudent(data);
    }
    loadStudents();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Student Record Management System</h1>
      <StudentForm onSubmit={handleSubmit} editingStudent={editingStudent} />
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Index No</th><th>Email</th><th>Course</th><th>Year</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td><td>{s.indexNo}</td><td>{s.email}</td><td>{s.course}</td><td>{s.year}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => setEditingStudent(s)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
