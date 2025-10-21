// src/components/StatCard.jsx
const StatCard = ({ title, count, color }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800 border-blue-300",
    green: "bg-green-100 text-green-800 border-green-300",
    red: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-md border w-full sm:w-60 ${colorMap[color]}`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-4xl font-bold mt-2">{count}</p>
    </div>
  );
};

export default StatCard;
