// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [absentToday, setAbsentToday] = useState(0);

  // Function to calculate attendance counts
  const calculateAttendance = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    setTotalStudents(students.length);

    const history = JSON.parse(localStorage.getItem("attendanceHistory")) || [];
    const today = new Date().toDateString();

    // 🔹 Get ALL attendance records for today (not just one class)
    const todayRecords = history.filter(
      (entry) => new Date(entry.date).toDateString() === today
    );

    if (todayRecords.length > 0) {
      let present = 0;
      let absent = 0;

      // Sum across all classes
      todayRecords.forEach((record) => {
        const pres = record.data.filter(
          (s) => s.status && s.status.toLowerCase() === "present"
        ).length;

        const abs = record.data.filter(
          (s) => s.status && s.status.toLowerCase() === "absent"
        ).length;

        present += pres;
        absent += abs;
      });

      setPresentToday(present);
      setAbsentToday(absent);
    } else {
      // 🔹 If no attendance taken today → counts remain 0
      setPresentToday(0);
      setAbsentToday(0);
    }
  };

  useEffect(() => {
    calculateAttendance(); // initial load

    const handleStorageChange = () => {
      calculateAttendance();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <h1 className="text-center text-3xl sm:text-4xl font-bold text-blue-800 mb-6">
        🎓 APC College for Women - Smart Online Attendance
      </h1>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-4xl">👩‍🎓</div>
          <div className="text-lg font-semibold mt-2">Total Students</div>
          <div className="text-3xl font-bold">{totalStudents}</div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-4xl">✅</div>
          <div className="text-lg font-semibold mt-2">Present Today</div>
          <div className="text-3xl font-bold">{presentToday}</div>
        </div>

        <div className="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-4xl">❌</div>
          <div className="text-lg font-semibold mt-2">Absent Today</div>
          <div className="text-3xl font-bold">{absentToday}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
        <h3 className="text-xl font-semibold text-purple-700 mb-2">📢 Notice Board</h3>
        <p className="text-gray-700">
          Welcome to the official Smart AI Attendance System of{" "}
          <strong>APC College for Women</strong>! Manage attendance efficiently,
          send emails to absentees, and keep track of class reports – all in one
          place. 💻 🤖
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
