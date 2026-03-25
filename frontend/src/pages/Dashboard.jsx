import {
  Package,
  AlertTriangle,
  Users,
  DollarSign,
} from "lucide-react";

import { useCurrency } from "../context/CurrencyContext";
import AnimatedNumber from "../components/ui/AnimatedNumber";
import StatCard from "../components/ui/StatCard";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {

const { currency } = useCurrency();

const USD_TO_INR = 90.96;

const convertAmount = (amount) =>
  currency === "INR" ? amount * USD_TO_INR : amount;

const currencySymbol = currency === "INR" ? "₹" : "$";

  /* -------------------- DATA -------------------- */

  const salesData = [
    { month: "Jan", forecast: 4200, actual: 4000 },
    { month: "Feb", forecast: 3100, actual: 3000 },
    { month: "Mar", forecast: 2300, actual: 2000 },
    { month: "Apr", forecast: 2900, actual: 2780 },
    { month: "May", forecast: 2100, actual: 1900 },
    { month: "Jun", forecast: 2600, actual: 2400 },
    { month: "Jul", forecast: 3500, actual: 3300 },
  ];

  const distributionData = [
    { name: "Electronics", value: 35, color: "#1E3A8A" },
    { name: "Clothing", value: 25, color: "#60A5FA" },
    { name: "Food & Beverage", value: 20, color: "#10B981" },
    { name: "Home & Garden", value: 15, color: "#F59E0B" },
    { name: "Others", value: 5, color: "#EF4444" },
  ];

  const turnoverData = [
    { name: "Electronics", value: 85 },
    { name: "Clothing", value: 65 },
    { name: "Food & Beverage", value: 92 },
    { name: "Home & Garden", value: 45 },
    { name: "Sports", value: 78 },
  ];

const handleGenerateOrders = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/reports/low-stock");
    const data = await res.json();

    if (data.length === 0) {
      alert("✅ All products are sufficiently stocked!");
      return;
    }

    let message = "⚠️ Low Stock Items:\n\n";

    data.forEach((item) => {
      message += `${item.name} (Qty: ${item.quantity})\n`;
    });

    alert(message);

  } catch (error) {
    console.error("Error generating orders:", error);
    alert("❌ Failed to generate orders");
  }
};

  return (
    <div className="p-8 space-y-10">

      {/* ---------------- HEADER ---------------- */}

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Inventory & Business Overview
        </p>
      </div>

      {/* ---------------- AI FORECAST BANNER ---------------- */}

      <div className="rounded-2xl p-8 text-white shadow-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-black">
        <p className="text-sm opacity-80">⚡ AI Forecast Summary</p>
        <h2 className="text-2xl font-semibold mt-3">
          Predicted demand for next month:{" "}
          <span className="font-bold">+18% increase</span>
        </h2>
        <p className="opacity-90 mt-2">
          Electronics and Food & Beverage categories showing highest growth potential
        </p>
      </div>

      {/* ---------------- STATS ---------------- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
  title="Total Products"
  color="yellow"
  icon={<Package size={26} />}
  value={<AnimatedNumber value={2847} />}
/>

<StatCard
  title="Low Stock Items"
  color="red"
  icon={<AlertTriangle size={26} />}
  value={<AnimatedNumber value={23} />}
/>

<StatCard
  title="Active Suppliers"
  color="green"
  icon={<Users size={26} />}
  value={<AnimatedNumber value={142} />}
/>

<StatCard
  title="Monthly Revenue"
  color="blue"
  icon={<DollarSign size={26} />}
  value={
    <AnimatedNumber
      value={convertAmount(284000)}
      prefix={currencySymbol}
    />
  }
/>
      </div>

      {/* ---------------- SALES + PIE ---------------- */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Sales vs Forecast */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sales vs Forecast
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Actual sales compared to AI predictions
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#60A5FA"
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#1E40AF"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Inventory Distribution
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Products by category
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
  data={distributionData}
  dataKey="value"
  outerRadius={110}
  label={({ name, value }) => `${name} ${value}%`}
>
  {distributionData.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={entry.color} />
  ))}
</Pie>

            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------------- TURNOVER + ALERTS ---------------- */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Stock Turnover */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Stock Turnover Rate
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Inventory movement by category
          </p>

          <div className="space-y-6">
            {turnoverData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-3 bg-blue-600 rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Alerts
          </h2>

          <div className="space-y-6 text-sm">

            <div>
              <p className="font-semibold text-orange-500">Low Stock Alert</p>
              <p className="text-gray-600 dark:text-gray-400">
                iPhone 15 Pro has only 5 units remaining
              </p>
              <p className="text-gray-400 text-xs mt-1">2 minutes ago</p>
            </div>

            <div>
              <p className="font-semibold text-blue-500">New Supplier</p>
              <p className="text-gray-600 dark:text-gray-400">
                TechCorp has been added to your supplier list
              </p>
              <p className="text-gray-400 text-xs mt-1">1 hour ago</p>
            </div>

            <div>
              <p className="font-semibold text-green-500">Restock Complete</p>
              <p className="text-gray-600 dark:text-gray-400">
                Samsung Galaxy S24 restocked successfully
              </p>
              <p className="text-gray-400 text-xs mt-1">3 hours ago</p>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------- SMART REORDER ---------------- */}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Smart Reorder Suggestions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            12 products need immediate reordering based on demand trends
          </p>
          
<p className="text-sm text-gray-400 mt-1">
  Estimated cost:{" "}
  {currencySymbol}
  {convertAmount(24560).toLocaleString(
    currency === "INR" ? "en-IN" : "en-US"
  )}{" "}
  | Estimated delivery: 3–5 business days
</p>

        </div>

        <button
  onClick={handleGenerateOrders}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow transition"
>
  Generate Orders
</button>

      </div>

    </div>
  );
};

export default Dashboard;
