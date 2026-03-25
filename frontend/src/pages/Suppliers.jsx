import StatCard from "../components/ui/StatCard";
import {
  Users,
  UserCheck,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";
import AnimatedNumber from "../components/ui/AnimatedNumber";

const Suppliers = () => {
  const { formatCurrency } = useCurrency();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [suppliers, setSuppliers] = useState([
    {
      id: "SUP003",
      name: "Nike Inc.",
      email: "wholesale@nike.com",
      phone: "+1 (555) 345-6789",
      location: "Beaverton, OR, USA",
      category: "Clothing",
      status: "Active",
      rating: 4.8,
      orders: 89,
      revenue: 950000,
      lastOrder: "2024-10-02",
    },
    {
      id: "SUP005",
      name: "Sony Corp.",
      email: "b2b@sony.com",
      phone: "+1 (555) 567-8901",
      location: "Tokyo, Japan",
      category: "Electronics",
      status: "Active",
      rating: 4.6,
      orders: 67,
      revenue: 780000,
      lastOrder: "2024-09-30",
    },
    {
      id: "SUP004",
      name: "Green Coffee Co.",
      email: "orders@greencoffee.com",
      phone: "+1 (555) 456-7890",
      location: "Portland, OR, USA",
      category: "Food & Beverage",
      status: "Inactive",
      rating: 4.2,
      orders: 23,
      revenue: 145000,
      lastOrder: "2024-08-15",
    },
    {
      id: "SUP001",
      name: "Apple Inc.",
      email: "orders@apple.com",
      phone: "+1 (555) 123-4567",
      location: "Cupertino, CA, USA",
      category: "Electronics",
      status: "Active",
      rating: 4.9,
      orders: 156,
      revenue: 2400000,
      lastOrder: "2024-10-01",
    },
    {
      id: "SUP002",
      name: "Samsung Corp.",
      email: "business@samsung.com",
      phone: "+1 (555) 234-5678",
      location: "Seoul, South Korea",
      category: "Electronics",
      status: "Active",
      rating: 4.7,
      orders: 134,
      revenue: 1800000,
      lastOrder: "2024-09-28",
    },
  ]);

  const [newSupplier, setNewSupplier] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    category: "",
  });

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  

  const renderStars = (rating) => (
    <div className="flex items-center gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= Math.round(rating)
              ? "text-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-xs text-gray-500 dark:text-gray-300">
  {rating}
</span>
    </div>
  );

  const handleDelete = (id) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
  };

  const handleAddSupplier = () => {
    if (!newSupplier.companyName) return;

    const newEntry = {
      id: "SUP" + Math.floor(Math.random() * 1000),
      name: newSupplier.companyName,
      email: newSupplier.email,
      phone: newSupplier.phone,
      location: newSupplier.address,
      category: newSupplier.category,
      status: "Active",
      rating: 4.5,
      orders: 0,
      revenue: 0,
      lastOrder: "-",
    };

    setSuppliers([...suppliers, newEntry]);
    setIsModalOpen(false);

    setNewSupplier({
      companyName: "",
      email: "",
      phone: "",
      address: "",
      category: "",
    });
  };

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            Suppliers (<AnimatedNumber value={suppliers.length} />)
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage supplier relationships
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Add Supplier
        </button>
      </div>

      {/* Search */}
      <input
  type="text"
  placeholder="Search suppliers..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
      {/* KPI Cards */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

 {/* Total Suppliers */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border-l-4 border-blue-500 hover:shadow-md transition">
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Total Suppliers
    </p>

    <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg">
      <Users className="text-blue-500" size={20} />
    </div>
  </div>

  <p className="text-3xl font-bold mt-3 dark:text-white">
    <AnimatedNumber value={suppliers.length} />
  </p>
</div>


{/* Active Suppliers */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border-l-4 border-green-500 hover:shadow-md transition">
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Active Suppliers
    </p>

    <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-lg">
      <UserCheck className="text-green-500" size={20} />
    </div>
  </div>

  <p className="text-3xl font-bold mt-3 text-green-500">
    <AnimatedNumber
      value={suppliers.filter((s) => s.status === "Active").length}
    />
  </p>
</div>


{/* Total Orders */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border-l-4 border-purple-500 hover:shadow-md transition">
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Total Orders
    </p>

    <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-lg">
      <ShoppingCart className="text-purple-500" size={20} />
    </div>
  </div>

  <p className="text-3xl font-bold mt-3 dark:text-white">
    <AnimatedNumber
      value={suppliers.reduce((acc, s) => acc + s.orders, 0)}
    />
  </p>
</div>


{/* Total Revenue */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border-l-4 border-yellow-500 hover:shadow-md transition">
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Total Revenue
    </p>

    <div className="bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded-lg">
      <DollarSign className="text-yellow-500" size={20} />
    </div>
  </div>

  <p className="text-3xl font-bold mt-3 dark:text-white">
    <AnimatedNumber
      value={suppliers.reduce((acc, s) => acc + s.revenue, 0)}
      prefix="₹ "
    />
  </p>
</div>

</div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4 text-left">Supplier</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Rating</th>
              <th className="px-6 py-4 text-center">Orders</th>
              <th className="px-6 py-4 text-center">Revenue</th>
              <th className="px-6 py-4 text-center">Last Order</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-gray-700">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                      {s.name.split(" ").map(n => n[0]).join("").substring(0,2)}
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{s.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{s.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-300">
                  <p>{s.email}</p>
                  <p>{s.phone}</p>
                  <p>{s.location}</p>
                </td>

                <td className="px-6 py-4 text-gray-700 dark:text-gray-200">{s.category}</td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  {renderStars(s.rating)}
                </td>

                <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
  {s.orders}
</td>

                <td className="px-6 py-4 text-center font-semibold text-gray-800 dark:text-gray-100">
                  {formatCurrency(s.revenue)}
                </td>

                <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">
  {s.lastOrder}
</td>

                {/* ACTIONS COLUMN FIXED */}
                <td className="px-6 py-4 text-center flex justify-center gap-4">
                  <button className="text-gray-600 hover:text-blue-600">
                    ✏
                  </button>
                  <button className="text-gray-600 hover:text-green-600">
                    ↗
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* Top Performing Suppliers */}
<div className="space-y-4">

  <h2 className="text-lg font-semibold dark:text-white">
    Top Performing Suppliers
  </h2>

  <div className="grid md:grid-cols-3 gap-6">
    {[...suppliers]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3)
      .map((s, index) => (
        <div
          key={s.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6"
        >

          <div className="flex justify-between items-center mb-4">
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              #{index + 1}
            </span>
            {renderStars(s.rating)}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
              {s.name.split(" ").map(n => n[0]).join("").substring(0,2)}
            </div>
            <div>
              <p className="font-medium dark:text-white">
                {s.name}
              </p>
              <p className="text-xs text-gray-500">
                {s.category}
              </p>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="font-semibold dark:text-white">
                {formatCurrency(s.revenue)}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Orders</p>
              <p className="font-semibold dark:text-white">
                {s.orders}
              </p>
            </div>
          </div>

        </div>
      ))}
  </div>

</div>

      {/* Modal remains same as before */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6 dark:text-white">
              Add New Supplier
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, companyName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, address: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, category: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddSupplier}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add Supplier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Suppliers;
