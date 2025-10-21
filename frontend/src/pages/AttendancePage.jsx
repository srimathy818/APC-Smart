// src/pages/AttendancePage.jsx
import { useState, useEffect } from "react";
import sendEmailToAbsentees from "../utils/sendEmail";
import { saveAs } from "file-saver"; // for CSV download

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [attendance, setAttendance] = useState({});

  // Load students from localStorage; add default only if none exist
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    if (stored.length === 0) {
      const defaultStudents = [
        { id: 1, name: "Alice", regNo: "BSC101", email: "alice@email.com", course: "BSc", year: "1st Year" },
        { id: 2, name: "Bob", regNo: "BSC102", email: "bob@email.com", course: "BSc", year: "1st Year" },
        { id: 3, name: "Carol", regNo: "BCA101", email: "carol@email.com", course: "BCA", year: "1st Year" },
      ];
      localStorage.setItem("students", JSON.stringify(defaultStudents));
      setStudents(defaultStudents);
    } else {
      setStudents(stored);
    }
  }, []);

  const handleFilter = () => {
    const matched = students.filter(
      (s) => s.course === course && s.year === year
    );
    setFiltered(matched);
    const initialStatus = {};
    matched.forEach((s) => (initialStatus[s.id] = ""));
    setAttendance(initialStatus);
  };

  const handleMark = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  const handleSubmit = () => {
    const submittedData = filtered.map((s) => ({
      id: s.id,
      name: s.name,
      regNo: s.regNo,
      email: s.email,
      course: s.course,
      year: s.year,
      status: attendance[s.id] || "Not Marked",
    }));

    const storedHistory =
      JSON.parse(localStorage.getItem("attendanceHistory")) || [];
    const updatedHistory = [
      ...storedHistory,
      {
        date: new Date().toISOString(),
        course,
        year,
        data: submittedData,
      },
    ];
    localStorage.setItem("attendanceHistory", JSON.stringify(updatedHistory));

    const absentees = submittedData.filter((s) => s.status === "Absent");
    if (absentees.length > 0) sendEmailToAbsentees(absentees);

    alert("✅ Attendance submitted and email sent to absentees!");
  };

  const handleDownload = () => {
    if (filtered.length === 0) {
      alert("Please load students first!");
      return;
    }

    const headers = ["Name", "Reg No", "Email", "Course", "Year", "Status"];
    const rows = filtered.map((s) => [
      s.name,
      s.regNo,
      s.email,
      s.course,
      s.year,
      attendance[s.id] || "Not Marked",
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.map((cell) => `"${cell}"`).join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${course}_${year}_Attendance.csv`);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-purple-200">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          🎓 APC College - Mark Attendance
        </h2>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="p-2 border rounded bg-purple-50 text-purple-700"
          >
            <option value="">Select Course</option>
            <option value="BSc">BSc</option>
            <option value="BCA">BCA</option>
            <option value="MSc">MSc</option>
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border rounded bg-purple-50 text-purple-700"
          >
            <option value="">Select Year</option>
            {course === "BSc" || course === "BCA"
              ? ["1st Year", "2nd Year", "3rd Year"].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))
              : course === "MSc"
              ? ["1st Year", "2nd Year"].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))
              : null}
          </select>

          <button
            onClick={handleFilter}
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
          >
            🔍 Load Students
          </button>
        </div>

        {filtered.length > 0 && (
          <div className="overflow-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-purple-100 text-purple-800">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Reg No</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Course</th>
                  <th className="border p-2">Year</th>
                  <th className="border p-2">Mark</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr key={student.id} className="text-center">
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">{student.regNo}</td>
                    <td className="border p-2">{student.email}</td>
                    <td className="border p-2">{student.course}</td>
                    <td className="border p-2">{student.year}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleMark(student.id, "Present")}
                        className={`mr-2 px-3 py-1 rounded text-white ${
                          attendance[student.id] === "Present"
                            ? "bg-green-600"
                            : "bg-gray-400"
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleMark(student.id, "Absent")}
                        className={`px-3 py-1 rounded text-white ${
                          attendance[student.id] === "Absent"
                            ? "bg-red-600"
                            : "bg-gray-400"
                        }`}
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center mt-6 flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
              >
                ✅ Submit Attendance
              </button>
              <button
                onClick={handleDownload}
                className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
              >
                ⬇️ Download Attendance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
