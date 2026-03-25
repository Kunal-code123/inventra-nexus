import { useState, useEffect } from "react";
import { Bell, Moon, Sun, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";

const Topbar = () => {
const { theme, setTheme } = useTheme();
  
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [notifOpen, setNotifOpen] = useState(false);

const [notifications, setNotifications] = useState([
  {
    id: 1,
    title: "Low Stock Alert",
    message: "iPhone 15 Pro has only 5 units remaining",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "New Supplier Added",
    message: "TechCorp added to suppliers list",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Forecast Updated",
    message: "AI model updated with latest data",
    time: "3 hours ago",
    read: true,
  },
]);

const unreadCount = notifications.filter(n => !n.read).length;

  const navigate = useNavigate();

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".notif-container")) {
      setNotifOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  // Toggle theme
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex justify-end items-center px-6 py-4 bg-transparent relative">

      {/* Notification */}
<div className="relative mr-6 notif-container">
  <button onClick={() => setNotifOpen(!notifOpen)} className="relative">
    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    {unreadCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
        {unreadCount}
      </span>
    )}
  </button>

  <AnimatePresence>
    {notifOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
      >
        <div className="px-4 py-3 border-b dark:border-gray-700 font-semibold dark:text-white">
          Notifications
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((item) =>
                    item.id === n.id ? { ...item, read: true } : item
                  )
                )
              }
              className={`px-4 py-3 cursor-pointer transition ${
                n.read
                  ? "bg-transparent"
                  : "bg-blue-50/70 dark:bg-slate-700/40"
              } hover:bg-gray-100 dark:hover:bg-slate-700`}
            >
              <p className="text-sm font-medium dark:text-white">
                {n.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {n.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {n.time}
              </p>
            </div>
          ))}
        </div>

        {notifications.some((n) => !n.read) && (
          <div
            onClick={() =>
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, read: true }))
              )
            }
            className="px-4 py-3 text-sm text-center font-medium 
                       text-blue-600 dark:text-blue-400 
                       cursor-pointer border-t 
                       border-gray-200 dark:border-gray-700 
                       hover:bg-gray-100 dark:hover:bg-slate-700 
                       transition-colors duration-200"
          >
            Mark all as read
          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
</div>

      {/* Dark Mode Toggle */}
<button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="mr-6 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
>
  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
</button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-semibold text-gray-700 dark:text-white"
        >
          AD
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
            <button
              onClick={() => {
                navigate("/settings");
                setDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
            >
              <User size={16} />
              Profile Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;