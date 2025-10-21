import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    email: "",
    course: "",
    year: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(stored);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.regNo || !formData.email || !formData.course || !formData.year) {
      alert("❗ All fields are required.");
      return;
    }

    let updated;
    if (editingId) {
      updated = students.map((s) =>
        s.id === editingId ? { ...formData, id: editingId } : s
      );
      setEditingId(null);
    } else {
      updated = [...students, { ...formData, id: uuidv4() }];
    }

    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    setFormData({ name: "", regNo: "", email: "", course: "", year: "" });
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const student = students.find((s) => s.id === id);
    setFormData(student);
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this student?")) {
      const updated = students.filter((s) => s.id !== id);
      setStudents(updated);
      localStorage.setItem("students", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
        👩‍🎓 Manage Students - APC College
      </h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormData({ name: "", regNo: "", email: "", course: "", year: "" });
            setEditingId(null);
          }}
          className="bg-purple-700 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-800"
        >
          ➕ {showForm ? "Cancel" : "Add New Student"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mb-8 border border-purple-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="👤 Student Name"
              className="p-2 border border-purple-300 rounded"
            />
            <input
              type="text"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              placeholder="🆔 Reg No"
              className="p-2 border border-purple-300 rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="📧 Email"
              className="p-2 border border-purple-300 rounded"
            />
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="p-2 border border-purple-300 rounded"
            >
              <option value="">🎓 Select Course</option>
              <option value="BSc">BSc</option>
              <option value="BCA">BCA</option>
              <option value="MSc">MSc</option>
            </select>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="p-2 border border-purple-300 rounded"
            >
              <option value="">📚 Select Year</option>
              {formData.course === "BSc" || formData.course === "BCA"
                ? ["1st Year", "2nd Year", "3rd Year"].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))
                : formData.course === "MSc"
                ? ["1st Year", "2nd Year"].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
            >
              {editingId ? "✏️ Update Student" : "➕ Add Student"}
            </button>
          </div>
        </form>
      )}

      {students.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Reg No</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Course</th>
                <th className="border p-2">Year</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-purple-50">
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2">{s.regNo}</td>
                  <td className="border p-2">{s.email}</td>
                  <td className="border p-2">{s.course}</td>
                  <td className="border p-2">{s.year}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(s.id)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
