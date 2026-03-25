const colorMap = {
  yellow: "border-l-4 border-yellow-400 text-yellow-500",
  blue: "border-l-4 border-blue-500 text-blue-500",
  green: "border-l-4 border-green-500 text-green-500",
  red: "border-l-4 border-red-500 text-red-500",
  purple: "border-l-4 border-purple-500 text-purple-500",
};

const StatCard = ({ title, value, color, icon }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow p-6 ${colorMap[color]}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </p>

        {icon && (
          <div className={`${colorMap[color]} border-l-0`}>
            {icon}
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold mt-3 dark:text-white">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;