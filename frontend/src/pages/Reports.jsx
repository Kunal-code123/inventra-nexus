// frontend/src/pages/Reports.jsx

import React from "react";
import { useCurrency } from "../context/CurrencyContext";
import AnimatedNumber from "../components/ui/AnimatedNumber";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import {
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const Reports = () => {
  const { currency } = useCurrency();

  const USD_TO_INR = 90.96;

  const convertAmount = (amount) =>
    currency === "INR" ? amount * USD_TO_INR : amount;

  const currencySymbol = currency === "INR" ? "₹" : "$";

  const formatCurrency = (value) =>
    `${currencySymbol}${value.toLocaleString(
      currency === "INR" ? "en-IN" : "en-US"
    )}`;

  const totalRevenue = 9800000;
  const totalOrders = 4297;

  // ================= REVENUE TREND =================
  const revenueTrendData = [
    { month: "Jan", revenue: 120000 },
    { month: "Feb", revenue: 98000 },
    { month: "Mar", revenue: 140000 },
    { month: "Apr", revenue: 165000 },
    { month: "May", revenue: 185000 },
    { month: "Jun", revenue: 200000 },
    { month: "Jul", revenue: 240000 },
  ].map((item) => ({
    ...item,
    revenue: convertAmount(item.revenue),
  }));

  // ================= SALES BY CATEGORY =================
  const categoryData = [
    { name: "Electronics", value: 45 },
    { name: "Clothing", value: 25 },
    { name: "Food & Beverage", value: 15 },
    { name: "Home & Garden", value: 10 },
    { name: "Others", value: 5 },
  ];

  const COLORS = ["#1e3a8a", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  // ================= TOP PRODUCTS =================
  const topProducts = [
    {
      name: "iPhone 15 Pro",
      revenue: 45680,
      units: 156,
      margin: "18.5%",
    },
    {
      name: "Samsung Galaxy S24",
      revenue: 38920,
      units: 134,
      margin: "16.2%",
    },
    {
      name: "Nike Air Max 270",
      revenue: 28450,
      units: 89,
      margin: "22.1%",
    },
    {
      name: "MacBook Pro 16\"",
      revenue: 67890,
      units: 67,
      margin: "15.8%",
    },
    {
      name: "Wireless Headphones",
      revenue: 15670,
      units: 78,
      margin: "28.3%",
    },
  ];

  // ================= RECENT TRANSACTIONS =================
  const transactions = [
    {
      id: "TXN001",
      date: "2024-10-05",
      type: "Sale",
      product: "iPhone 15 Pro",
      qty: 2,
      amount: 1999.98,
      party: "John Doe",
      status: "Completed",
    },
    {
      id: "TXN002",
      date: "2024-10-05",
      type: "Purchase",
      product: "Samsung Galaxy S24",
      qty: 10,
      amount: 8999.9,
      party: "Samsung Corp.",
      status: "Completed",
    },
    {
      id: "TXN003",
      date: "2024-10-04",
      type: "Sale",
      product: "Nike Air Max 270",
      qty: 1,
      amount: 159.99,
      party: "Jane Smith",
      status: "Completed",
    },
    {
      id: "TXN004",
      date: "2024-10-04",
      type: "Return",
      product: "MacBook Pro 16\"",
      qty: 1,
      amount: 2499.99,
      party: "Bob Johnson",
      status: "Processed",
    },
  ];

  // ================= ORDERS VS RETURNS =================
  const ordersReturnsData = [
    { month: "Jan", orders: 450, returns: 12 },
    { month: "Feb", orders: 380, returns: 8 },
    { month: "Mar", orders: 520, returns: 15 },
    { month: "Apr", orders: 600, returns: 18 },
    { month: "May", orders: 620, returns: 22 },
    { month: "Jun", orders: 690, returns: 25 },
    { month: "Jul", orders: 760, returns: 20 },
  ];

  const handleExport = async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reports/export?type=${type}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type:
          type === "pdf"
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        type === "pdf" ? "report.pdf" : "report.xlsx"
      );

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleExcelExport = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/reports/export-excel"
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Inventra_Stock_Report.xlsx";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleGenerateReport = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/reports/generate"
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Inventra_Report.xlsx";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

    return (
      <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Comprehensive business insights and system reports
            </p>
          </div>

          <div className="flex gap-3">

            <button
    onClick={() => handleExport("pdf")}
    className="px-4 py-2 text-sm border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800"
  >
    PDF
  </button>

            <button
    onClick={handleExcelExport}
    className="px-4 py-2 text-sm border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800"
  >
    Excel
  </button>

            <button
  onClick={handleGenerateReport}
  className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
>
  Generate Report
</button>

          </div>
        </div>

      {/* KPI CARDS */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

  {/* Total Revenue */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-5 border-l-4 border-green-500">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Total Revenue
      </p>
      <DollarSign className="text-green-500" size={28} />
    </div>
    <h2 className="text-2xl font-bold mt-3">
      <AnimatedNumber
        value={convertAmount(totalRevenue)}
        prefix={currencySymbol}
      />
    </h2>
    <p className="text-xs text-green-600 mt-1">
      +15.2% from last month
    </p>
  </div>

  {/* Total Orders */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Total Orders
      </p>
      <Package className="text-blue-500" size={28} />
    </div>
    <h2 className="text-2xl font-bold mt-3">
      <AnimatedNumber value={totalOrders} />
    </h2>
    <p className="text-xs text-green-600 mt-1">
      +8.1% growth
    </p>
  </div>

  {/* Forecast Accuracy */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Forecast Accuracy
      </p>
      <TrendingUp className="text-purple-500" size={28} />
    </div>
   <h2 className="text-2xl font-bold mt-3">
  <AnimatedNumber value={96.2} suffix="%" />
</h2>
    <p className="text-xs text-green-600 mt-1">
      +2.1% improvement
    </p>
  </div>

  {/* Stock Movement */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-5 border-l-4 border-red-500">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Stock Movement
      </p>
      <AlertTriangle className="text-red-500" size={28} />
    </div>
    <h2 className="text-2xl font-bold mt-3">
      <AnimatedNumber value={2847} />
    </h2>
    <p className="text-xs text-red-600 mt-1">
      119 items low stock
    </p>
  </div>

</div>

      {/* REVENUE + CATEGORY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Trend */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) =>
                    `${currencySymbol}${(value / 1000).toFixed(0)}K`
                  }
                />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
               <Pie
  data={categoryData}
  dataKey="value"
  nameKey="name"
  outerRadius={100}
  label={({ name, percent, index }) =>
    `${name} ${(percent * 100).toFixed(0)}%`
  }
  labelLine={true}
>
  {categoryData.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={COLORS[index]}
    />
  ))}
</Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Products</h3>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b dark:border-slate-700">
            <tr>
              <th className="py-3">Product</th>
              <th>Revenue</th>
              <th>Units Sold</th>
              <th>Profit Margin</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr
                key={index}
                className="border-b dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td className="py-3 font-medium">{product.name}</td>
                <td>{formatCurrency(convertAmount(product.revenue))}</td>
                <td>{product.units}</td>
                <td>{product.margin}</td>
                <td className="text-green-600 font-medium">Excellent</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b dark:border-slate-700">
            <tr>
              <th className="py-3">ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Party</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className="border-b dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td className="py-3">{tx.id}</td>
                <td>{tx.date}</td>
                <td>{tx.type}</td>
                <td>{tx.product}</td>
                <td>{tx.qty}</td>
                <td>{formatCurrency(convertAmount(tx.amount))}</td>
                <td>{tx.party}</td>
                <td>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ORDERS VS RETURNS */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">
          Orders vs Returns Analysis
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersReturnsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#1e3a8a" />
              <Bar dataKey="returns" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;