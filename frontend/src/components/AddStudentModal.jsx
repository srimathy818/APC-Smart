// src/components/AddStudentModal.jsx
import { useState } from "react";

const AddStudentModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    course: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Student</h2>

        <input name="name" placeholder="Student Name" value={formData.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input name="id" placeholder="Student ID" value={formData.id} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input name="course" placeholder="Course" value={formData.course} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />

        <div className="flex justify-end gap-2">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Add Student</button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
