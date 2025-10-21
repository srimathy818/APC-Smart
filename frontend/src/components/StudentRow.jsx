// src/components/StudentRow.jsx
const StudentRow = ({ student }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2">{student.name}</td>
      <td className="px-4 py-2">{student.id}</td>
      <td className="px-4 py-2">{student.email}</td>
      <td className="px-4 py-2">{student.course}</td>
      <td className="px-4 py-2">{student.year}</td>
    </tr>
  );
};

export default StudentRow;
