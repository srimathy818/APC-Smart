// src/pages/AttendanceHistory.jsx
import { useEffect, useState } from "react";
import { saveAs } from "file-saver"; // ✅ FileSaver for downloading CSV

const AttendanceHistory = () => {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("attendanceHistory")) || [];
    setHistory(stored.reverse());
    setFiltered(stored);
  }, []);

  const handleFilter = () => {
    const filteredData = history.filter((entry) => {
      const matchDate = filterDate
        ? new Date(entry.date).toISOString().split("T")[0] === filterDate
        : true;
      const matchCourse = filterCourse ? entry.course === filterCourse : true;
      const matchYear = filterYear ? entry.year === filterYear : true;
      return matchDate && matchCourse && matchYear;
    });
    setFiltered(filteredData);
  };

  const handleDelete = (indexToDelete) => {
    const updated = history.filter((_, index) => index !== indexToDelete);
    setHistory(updated);
    setFiltered(updated);
    localStorage.setItem("attendanceHistory", JSON.stringify(updated.reverse()));
    alert("❌ History entry deleted!");
  };

  // -------------------------------
  // ✅ Download CSV function
  // -------------------------------
  const handleDownload = (entry) => {
    const csvHeader = "Name,Reg No,Email,Course,Year,Status\n";
    const csvRows = entry.data
      .map(
        (s) =>
          `${s.name},${s.regNo},${s.email},${s.course},${s.year},${s.status}`
      )
      .join("\n");

    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `Attendance_${entry.course}_${entry.year}_${new Date(entry.date).toLocaleDateString()}.csv`);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-50 to-pink-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-pink-200">
        <h2 className="text-2xl font-bold text-pink-700 text-center mb-6">
          📜 APC College - Attendance History
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded bg-pink-50 text-pink-700"
          />

          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="border p-2 rounded bg-pink-50 text-pink-700"
          >
            <option value="">All Courses</option>
            <option value="BSc">BSc</option>
            <option value="BCA">BCA</option>
            <option value="MSc">MSc</option>
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border p-2 rounded bg-pink-50 text-pink-700"
          >
            <option value="">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
          </select>

          <button
            onClick={handleFilter}
            className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-800"
          >
            🔍 Apply Filter
          </button>
        </div>

        {/* History Records */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-600">No attendance records found.</p>
        ) : (
          filtered.map((entry, index) => {
            const total = entry.data.length;
            const present = entry.data.filter((s) => s.status === "Present").length;
            const absent = total - present;

            return (
              <div
                key={index}
                className="mb-6 border border-gray-200 bg-white p-4 rounded shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-purple-700">
                    {entry.course} - {entry.year} |{" "}
                    {new Date(entry.date).toLocaleString()}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(entry)}
                      className="text-sm text-green-600 border border-green-600 px-2 py-1 rounded hover:bg-green-100"
                    >
                      📥 Download CSV
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-sm text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-100"
                    >
                      ❌ Delete
                    </button>
                  </div>
                </div>

                <p className="text-sm mb-2 text-gray-600">
                  👥 Total: {total} | ✅ Present: {present} | ❌ Absent: {absent}
                </p>

                <div className="overflow-auto">
                  <table className="min-w-full border text-sm">
                    <thead className="bg-purple-100 text-purple-800">
                      <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Reg No</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.data.map((s, i) => (
                        <tr key={i} className="text-center">
                          <td className="border p-2">{s.name}</td>
                          <td className="border p-2">{s.regNo}</td>
                          <td className="border p-2">{s.email}</td>
                          <td
                            className={`border p-2 font-medium ${
                              s.status === "Present"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {s.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AttendanceHistory;
