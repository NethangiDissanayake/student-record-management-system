import { useState, useEffect } from 'react';

function StudentForm({ onSubmit, editingStudent }) {
  const [form, setForm] = useState({ name: '', indexNo: '', email: '', course: '', year: '' });

  useEffect(() => {
    if (editingStudent) setForm(editingStudent);
  }, [editingStudent]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', indexNo: '', email: '', course: '', year: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input className="form-control mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input className="form-control mb-2" name="indexNo" placeholder="Index No" value={form.indexNo} onChange={handleChange} required />
      <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input className="form-control mb-2" name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
      <input className="form-control mb-2" name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} required />
      <button className="btn btn-primary" type="submit">{editingStudent ? 'Update' : 'Add'} Student</button>
    </form>
  );
}

export default StudentForm;
