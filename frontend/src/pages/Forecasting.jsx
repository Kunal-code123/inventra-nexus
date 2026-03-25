import { motion } from "framer-motion";
import CountUp from "react-countup";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
} from "recharts";

import { useState } from "react";
import {
  Brain,
  Download,
  ChevronDown,
  Target,
  TrendingUp,
  AlertCircle,
  Zap,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", ai: 4200, actual: 4000 },
  { month: "Feb", ai: 3100, actual: 3000 },
  { month: "Mar", ai: 2200, actual: 2000 },
  { month: "Apr", ai: 2800, actual: 2700 },
  { month: "May", ai: 2100, actual: 1900 },
  { month: "Jun", ai: 2600, actual: 2500 },
  { month: "Jul", ai: 3600, actual: 3400 },
  { month: "Aug", ai: 4200, actual: 4000 },
  { month: "Sep", ai: 4800, actual: 4600 },
  { month: "Oct", ai: 5200, actual: 5000 },
  { month: "Nov", ai: 4900, actual: 4700 },
  { month: "Dec", ai: 6000, actual: 5800 },
];

const seasonalData = [
  { month: "Jan", electronics: 100, clothing: 60, food: 80 },
  { month: "Feb", electronics: 90, clothing: 55, food: 85 },
  { month: "Mar", electronics: 95, clothing: 70, food: 100 },
  { month: "Apr", electronics: 100, clothing: 80, food: 110 },
  { month: "May", electronics: 105, clothing: 90, food: 120 },
  { month: "Jun", electronics: 110, clothing: 95, food: 130 },
  { month: "Jul", electronics: 115, clothing: 90, food: 125 },
  { month: "Aug", electronics: 120, clothing: 100, food: 135 },
  { month: "Sep", electronics: 125, clothing: 110, food: 145 },
  { month: "Oct", electronics: 130, clothing: 130, food: 160 },
  { month: "Nov", electronics: 140, clothing: 150, food: 170 },
  { month: "Dec", electronics: 160, clothing: 180, food: 200 },
];

const Forecasting = () => {
  const [period, setPeriod] = useState("Monthly");
  const [open, setOpen] = useState(false);

  const handleExport = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/reports/generate"
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Forecast_Report.xlsx";
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export failed:", error);
  }
};

  return (
<div className="p-6 space-y-10 bg-gray-50 dark:bg-black transition-colors duration-300 min-h-screen">
  

  
      {/* HEADER */}
<div className="flex justify-between items-start flex-wrap gap-4">
  <div>
    <h1 className="text-2xl font-bold dark:text-white">
      AI Forecasting & Analytics
    </h1>
    <p className="text-gray-500 dark:text-gray-400">
      Predictive insights for inventory management
    </p>
  </div>

  <div className="flex items-center gap-4 relative">
    {/* Dropdown */}
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 
bg-white dark:bg-slate-800 
border border-gray-200 dark:border-slate-600 
text-gray-800 dark:text-white 
rounded-lg text-sm shadow-sm"
      >
        {period}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 shadow-lg rounded-lg border dark:border-slate-700 z-20">
          {["Daily", "Weekly", "Monthly", "Yearly"].map((item) => (
  <div
    key={item}
    onClick={() => {
      setPeriod(item);
      setOpen(false);
    }}
    className={`px-4 py-2 text-sm cursor-pointer rounded-md transition-colors
      ${
        period === item
          ? "bg-green-500 text-white dark:bg-green-600"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
      }
    `}
  >
    {item}
  </div>
))}
        </div>
      )}
    </div>

    {/* Export Button */}
    <button
  onClick={handleExport}
  className="flex items-center gap-2 
             bg-black text-white 
             dark:bg-white dark:text-black 
             px-4 py-2 rounded-lg 
             hover:opacity-90 
             transition text-sm"
>
  <Download size={16} />
  Export Report
</button>
  </div>
</div>

{/* AI MARKET INTELLIGENCE BOX */}
{/* AI MARKET INTELLIGENCE BOX */}
<div className="relative overflow-hidden
                rounded-2xl 
                p-6 
                flex justify-between items-center
                bg-gradient-to-r
                from-zinc-700
                via-zinc-800
                to-black
                border border-zinc-700
                shadow-[0_0_40px_rgba(0,0,0,0.6)]">

  {/* subtle light overlay */}
  <div className="absolute inset-0 bg-gradient-to-r 
                  from-white/5 via-transparent to-transparent pointer-events-none" />

  <div className="flex items-center gap-4 relative z-10">

    <div className="w-12 h-12 rounded-xl 
                    bg-zinc-800
                    flex items-center justify-center
                    border border-zinc-700">
      <Brain size={26} className="text-white" />
    </div>

    <div>
      <h2 className="font-semibold text-lg text-white">
        AI Market Intelligence
      </h2>
      <p className="text-sm text-zinc-400">
        Based on historical data and market trends, we predict a 18% increase in demand next month
      </p>
    </div>

  </div>

  <span className="relative z-10
                   px-4 py-1 rounded-full text-sm font-medium
                   bg-zinc-700 text-white
                   border border-zinc-600">
    96% Accuracy
  </span>

</div>

      {/* KPI CARDS */}
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
  className="grid grid-cols-1 md:grid-cols-4 gap-6"
>

  <motion.div
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }}
  transition={{ duration: 0.5 }}
  className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-5 border-l-4 border-green-500"
>
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Forecast Accuracy
      </p>
      <Target className="text-green-500" size={24} />
    </div>
    <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">
  <CountUp end={96.2} duration={1.5} decimals={1} />%
</h2>
    <p className="text-xs text-green-600 mt-1">
      +2.1% from last month
    </p>
  </motion.div>

  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Predicted Growth
      </p>
      <TrendingUp className="text-blue-500" size={24} />
    </div>
    <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">
  +<CountUp end={18} duration={1.5} />%
</h2>
    <p className="text-xs text-green-600 mt-1">
      Next 30 days
    </p>
  </div>

  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-5 border-l-4 border-orange-500">
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        High Demand Products
      </p>
      <AlertCircle className="text-orange-500" size={24} />
    </div>
    <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">
  <CountUp end={12} duration={1.5} />
</h2>
    <p className="text-xs text-red-500 mt-1">
      Need restocking
    </p>
  </div>

  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-5 border-l-4 border-indigo-500">
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        AI Confidence
      </p>
      <Zap className="text-indigo-500" size={24} />
    </div>
    <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">
  <CountUp end={94} duration={1.5} />%
</h2>
    <p className="text-xs text-blue-500 mt-1">
      Model reliability
    </p>
  </div>

</motion.div>

      {/* SALES FORECAST VS ACTUAL */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold dark:text-white mb-6">
          Sales Forecast vs Actual Performance
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ai"
              stroke="#3b82f6"
              strokeWidth={3}
              strokeDasharray="5 5"
              name="AI Prediction"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#1e3a8a"
              strokeWidth={3}
              name="Actual Sales"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CATEGORY DEMAND FORECAST */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold dark:text-white">
          Category Demand Forecast
        </h2>

        {[
          ["Electronics", "35%", "42%", "+20%"],
          ["Clothing", "25%", "28%", "+12%"],
          ["Food & Beverage", "20%", "24%", "+20%"],
          ["Home & Garden", "15%", "12%", "-20%"],
          ["Sports", "5%", "6%", "+20%"],
        ].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 dark:bg-slate-800 rounded-xl p-4"
          >
            <div>
              <p className="font-medium dark:text-white">{item[0]}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current: {item[1]} | Predicted: {item[2]}
              </p>
            </div>
            <span
              className={`text-sm font-semibold ${
                item[3].includes("-")
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {item[3]}
            </span>
          </div>
        ))}
      </div>

      {/* SEASONAL DEMAND TRENDS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold dark:text-white mb-6">
          Seasonal Demand Trends
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={seasonalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="clothing"
              stackId="1"
              stroke="#60a5fa"
              fill="#93c5fd"
            />
            <Area
              type="monotone"
              dataKey="electronics"
              stackId="1"
              stroke="#1e3a8a"
              fill="#3b82f6"
            />
            <Area
              type="monotone"
              dataKey="food"
              stackId="1"
              stroke="#16a34a"
              fill="#4ade80"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* PRODUCT DEMAND INTELLIGENCE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold dark:text-white mb-6">
          Product Demand Intelligence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["iPhone 15 Pro", "85%", "120%", "Increase stock by 40%"],
            ["Samsung Galaxy S24", "65%", "78%", "Moderate increase needed"],
            ["Nike Air Max 270", "45%", "38%", "Reduce stock by 15%"],
            ["MacBook Pro 16\"", "25%", "35%", "Increase stock by 30%"],
          ].map((item, i) => (
            <div
              key={i}
              className="border dark:border-slate-700 rounded-xl p-5"
            >
              <h3 className="font-semibold dark:text-white mb-2">
                {item[0]}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current Demand: {item[1]}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Predicted Demand: {item[2]}
              </p>
              <p className="text-blue-600 text-sm mt-3">
                {item[3]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SMART RECOMMENDATIONS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold dark:text-white mb-6">
          Smart Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="text-green-700 font-semibold mb-2">
              Stock Up
            </h3>
            <p className="text-sm text-green-700">
              iPhone 15 Pro demand expected to surge by 40%
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h3 className="text-orange-600 font-semibold mb-2">
              Monitor Closely
            </h3>
            <p className="text-sm text-orange-600">
              Home & Garden category showing declining trend
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="text-blue-600 font-semibold mb-2">
              Optimize
            </h3>
            <p className="text-sm text-blue-600">
              Electronics inventory can be reduced by 10%
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Forecasting;
