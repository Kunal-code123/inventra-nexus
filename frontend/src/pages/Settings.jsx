import { useEffect, useState } from "react";
import { User, Shield, Bell, Cloud, Palette, Database } from "lucide-react";
import { useCurrency } from "../context/CurrencyContext";
import { useTheme } from "../theme/ThemeContext";

const Settings = () => {

  const handleDeleteAccount = () => {
  const confirmDelete = window.confirm(
    "⚠️ Are you sure you want to delete your account?"
  );

  if (!confirmDelete) return;

  alert("✅ Account deleted successfully!");
  window.location.href = "/";
};

  const { theme, setTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();

const totalStorage = 10;
const [usedStorage, setUsedStorage] = useState(7.5);
const [animatedPercentage, setAnimatedPercentage] = useState(0);

const storagePercentage = Math.min(
  100,
  (usedStorage / totalStorage) * 100
);

useEffect(() => {
  let start = 0;
  const duration = 800;
  const stepTime = 15;
  const increment = storagePercentage / (duration / stepTime);

  const interval = setInterval(() => {
    start += increment;
    if (start >= storagePercentage) {
      start = storagePercentage;
      clearInterval(interval);
    }
    setAnimatedPercentage(start);
  }, stepTime);

const handleDeleteAccount = () => {
  const confirmDelete = window.confirm(
    "⚠️ Are you sure you want to delete your account?"
  );

  if (!confirmDelete) return;

  alert("✅ Account deleted successfully!");
  window.location.href = "/";
};

  return () => clearInterval(interval);
}, [storagePercentage]);

let barColor = "bg-green-500";

if (storagePercentage >= 60 && storagePercentage < 85) {
  barColor = "bg-yellow-500";
} else if (storagePercentage >= 85) {
  barColor = "bg-red-500";
}

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage application preferences and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* PROFILE INFORMATION */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 space-y-4">
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              <h2 className="text-lg font-semibold dark:text-white">
                Profile Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name"
                className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm" />
              <input type="text" placeholder="Last Name"
                className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm" />
              <input type="email" placeholder="Email Address"
                className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm md:col-span-2" />
              <input type="text" placeholder="Phone Number"
                className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm md:col-span-2" />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
              Save Changes
            </button>
          </div>

          {/* SECURITY SETTINGS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-green-600" />
              <h2 className="text-lg font-semibold dark:text-white">
                Security Settings
              </h2>
            </div>

            <input type="password" placeholder="Current Password"
              className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm w-full" />
            <input type="password" placeholder="New Password"
              className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm w-full" />
            <input type="password" placeholder="Confirm New Password"
              className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm w-full" />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
              Update Security
            </button>
          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-purple-600" />
              <h2 className="text-lg font-semibold dark:text-white">
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-3 text-sm dark:text-gray-300">
              <label className="flex justify-between items-center">
                Email Notifications
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between items-center">
                Push Notifications
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between items-center">
                Weekly Reports
                <input type="checkbox" />
              </label>
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6">

          {/* PREFERENCES */}
<div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 space-y-5">
  <div className="flex items-center gap-2">
    <Palette size={18} className="text-yellow-500" />
    <h2 className="text-lg font-semibold dark:text-white">
      Preferences
    </h2>
  </div>

 {/* DARK MODE TOGGLE */}
<div className="flex items-center justify-between">
  <div>
    <p className="text-sm font-medium dark:text-gray-200">
      Dark Mode
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      Switch to dark theme
    </p>
  </div>

  <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
      theme === "dark" ? "bg-blue-600" : "bg-gray-300"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
        theme === "dark" ? "translate-x-6" : ""
      }`}
    />
  </button>
</div>

  {/* Language */}
  <div>
    <label className="block text-sm font-medium mb-1 dark:text-gray-200">
      Language
    </label>
    <select className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm w-full">
      <option>English</option>
      <option>Hindi</option>
    </select>
  </div>

  {/* Timezone */}
  <div>
    <label className="block text-sm font-medium mb-1 dark:text-gray-200">
      Timezone
    </label>
    <select className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm w-full">
      <option>UTC</option>
      <option>IST</option>
    </select>
  </div>

  {/* Currency */}
  <div>
    <label className="block text-sm font-medium mb-1 dark:text-gray-200">
      Currency
    </label>
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="border dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm w-full"
    >
      <option value="USD">USD ($)</option>
      <option value="INR">INR (₹)</option>
    </select>
  </div>
</div>

{/* CLOUD SYNC */}
<div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 space-y-5">
  <div className="flex items-center gap-2">
    <Cloud size={18} className="text-blue-500" />
    <h2 className="text-lg font-semibold dark:text-white">
      Cloud Sync
    </h2>
  </div>

  {/* Auto Backup */}
  <div className="flex justify-between items-start">
    <div>
      <p className="text-sm font-medium dark:text-gray-200">
        Auto Backup
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Automatic daily backups
      </p>
    </div>
    <input type="checkbox" defaultChecked className="mt-1" />
  </div>

  {/* Real-time Sync */}
  <div className="flex justify-between items-start">
    <div>
      <p className="text-sm font-medium dark:text-gray-200">
        Real-time Sync
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Sync data in real-time
      </p>
    </div>
    <input type="checkbox" defaultChecked className="mt-1" />
  </div>

  {/* Divider */}
  <div className="border-t dark:border-slate-700"></div>

  {/* Storage Usage */}
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <p className="font-medium dark:text-gray-200">
        Storage Usage
      </p>
      <span className="text-gray-500 dark:text-gray-400">
        {animatedPercentage.toFixed(0)}%
      </span>
    </div>

    {/* Progress Bar */}
<div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
  <div
    className={`${barColor} h-2 rounded-full transition-all duration-300`}
    style={{ width: `${animatedPercentage}%` }}
  ></div>
</div>

    <p className="text-xs text-gray-500 dark:text-gray-400">
      {usedStorage} GB of {totalStorage} GB used
    </p>
  </div>
</div>

          {/* SYSTEM INFO */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Database size={18} className="text-indigo-500" />
              <h2 className="text-lg font-semibold dark:text-white">
                System Info
              </h2>
            </div>

            <p className="text-sm dark:text-gray-300">
              Version: <span className="font-medium">v2.1.4</span>
            </p>
            <p className="text-sm dark:text-gray-300">
              License: <span className="font-medium">Enterprise</span>
            </p>

           <button
  onClick={handleDeleteAccount}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm w-full"
>
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;