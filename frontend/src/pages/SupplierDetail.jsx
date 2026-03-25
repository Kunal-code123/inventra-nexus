// frontend/src/pages/SupplierDetail.jsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const performanceData = [
  { month: "Jan", score: 88 },
  { month: "Feb", score: 90 },
  { month: "Mar", score: 92 },
  { month: "Apr", score: 89 },
  { month: "May", score: 93 },
];

const SupplierDetail = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Supplier Details
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Detailed performance and risk analysis
        </p>
      </div>

      {/* Supplier Profile */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Supplier Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Supplier Name</p>
            <p className="font-medium text-gray-800">ABC Distributors</p>
          </div>

          <div>
            <p className="text-gray-500">Contact</p>
            <p className="font-medium text-gray-800">
              abc@distributors.com
            </p>
          </div>

          <div>
            <p className="text-gray-500">Supply Frequency</p>
            <p className="font-medium text-gray-800">Weekly</p>
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Performance Trend
        </h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reliability & Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reliability */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Supply Reliability
          </h2>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-600">
                On-time Deliveries
              </span>
              <span className="font-medium text-gray-800">94%</span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-600">
                Order Fulfillment Rate
              </span>
              <span className="font-medium text-gray-800">96%</span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-600">
                Defect Rate
              </span>
              <span className="font-medium text-gray-800">2%</span>
            </li>
          </ul>
        </div>

        {/* Risk Analysis */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Risk Assessment
          </h2>

          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium text-gray-800">
                Current Risk Level:
              </span>{" "}
              <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Low
              </span>
            </p>

            <p className="text-gray-600">
              This supplier shows consistently high performance,
              reliable delivery schedules, and minimal quality issues.
              Risk level is calculated using delivery consistency and
              performance trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
