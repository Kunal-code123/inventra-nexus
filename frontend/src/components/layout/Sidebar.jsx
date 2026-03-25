import {
  LayoutDashboard,
  Package,
  Users,
  TrendingUp,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/products", icon: Package },
    { name: "Suppliers", path: "/suppliers", icon: Users },
    { name: "Forecasting", path: "/forecasting", icon: TrendingUp },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={`${
  collapsed ? "w-20" : "w-64"
} fixed top-0 left-0 h-screen bg-[#0F172A] text-white p-4 transition-all duration-300 flex flex-col overflow-y-auto`}
    >
      {/* Logo / Branding */}
<div className="flex items-center justify-between mb-8">

  {!collapsed && (
    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
        <Package size={20} className="text-white" />
      </div>

      <div>
        <h1 className="text-lg font-semibold text-white">
          Inventra Nexus
        </h1>
        <p className="text-xs text-slate-400">
          AI-Enabled Inventory
        </p>
      </div>

    </div>
  )}

  <button
    onClick={() => setCollapsed(!collapsed)}
    className="p-2 rounded hover:bg-[#1E293B]"
  >
    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
  </button>

</div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#334155]"
                    : "hover:bg-[#334155]"
                }`
              }
            >
              <Icon size={20} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;