import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";
import AnimatedNumber from "../components/ui/AnimatedNumber";

const categories = [
  "Electronics",
  "Clothing",
  "Food & Beverage",
  "Home & Garden",
  "Sports",
];

const suppliersList = [
  "Apple Inc.",
  "Samsung Corp.",
  "Nike Inc.",
  "Green Coffee Co.",
];

const Products = () => {
  const { formatCurrency } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");

  const [products, setProducts] = useState([
    {
      id: "PRD001",
      name: "iPhone 15 Pro",
      category: "Electronics",
      stock: 5,
      price: 999.99,
      supplier: "Apple Inc.",
      expiry: "2025-12-31",
    },
    {
      id: "PRD002",
      name: "Samsung Galaxy S24",
      category: "Electronics",
      stock: 45,
      price: 899.99,
      supplier: "Samsung Corp.",
      expiry: "2025-11-30",
    },
    {
      id: "PRD003",
      name: "Nike Air Max 270",
      category: "Clothing",
      stock: 120,
      price: 159.99,
      supplier: "Nike Inc.",
      expiry: "2026-06-30",
    },
    {
      id: "PRD004",
      name: "Organic Coffee Beans",
      category: "Food & Beverage",
      stock: 2,
      price: 24.99,
      supplier: "Green Coffee Co.",
      expiry: "2024-12-15",
    },
    {
      id: "PRD005",
      name: "Wireless Headphones",
      category: "Electronics",
      stock: 0,
      price: 199.99,
      supplier: "Samsung Corp.",
      expiry: "2025-08-30",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: 0,
    price: 0,
    supplier: "",
    expiry: "",
  });

  const getStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Critical";
    if (stock <= 20) return "Low Stock";
    return "In Stock";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "Critical":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
      case "Out of Stock":
        return "bg-gray-200 text-gray-700 dark:bg-gray-600/30 dark:text-gray-300";
      default:
        return "";
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) return;

    const newEntry = {
      id: "PRD" + Math.floor(Math.random() * 1000),
      ...newProduct,
    };

    setProducts([...products, newEntry]);
    setIsModalOpen(false);

    setNewProduct({
      name: "",
      category: "",
      stock: 0,
      price: 0,
      supplier: "",
      expiry: "",
    });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts =
    filterCategory === "All"
      ? products
      : products.filter((p) => p.category === filterCategory);

  return (
    <div className="p-8 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Product Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your inventory products and stock levels
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {/* Filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="border bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2"
      >
        <option>All</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Product ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-center">Stock</th>
              <th className="px-6 py-3 text-center">Price</th>
              <th className="px-6 py-3 text-left">Supplier</th>
              <th className="px-6 py-3 text-center">Expiry</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-gray-700">
            {filteredProducts.map((p) => {
              const status = getStatus(p.stock);
              return (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-200">{p.id}</td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {p.name}
                  </td>

                  <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                    {p.category}
                  </td>

                  <td className="px-6 py-4 text-center font-semibold">
                    <span
                      className={
                        p.stock === 0
                          ? "text-gray-500 dark:text-gray-400"
                          : p.stock <= 5
                          ? "text-red-600 dark:text-red-400"
                          : p.stock <= 20
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                      }
                    >
                      {p.stock}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
                    {formatCurrency(p.price)}
                  </td>

                  <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                    {p.supplier}
                  </td>

                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
                    {p.expiry}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "In Stock", color: "text-green-600 dark:text-green-400" },
          { label: "Low Stock", color: "text-yellow-600 dark:text-yellow-400" },
          { label: "Critical", color: "text-red-600 dark:text-red-400" },
          { label: "Out of Stock", color: "text-gray-600 dark:text-gray-400" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {item.label}
            </p>
           <p className={`text-3xl font-bold mt-2 ${item.color}`}>
  <AnimatedNumber
    value={
      products.filter(
        (p) => getStatus(p.stock) === item.label
      ).length
    }
  />
</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Add New Product
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Product Name"
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />

              <select
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Stock Quantity"
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: Number(e.target.value),
                  })
                }
              />

              <input
                type="number"
                placeholder={`Price (${currency === "INR" ? "₹" : "$"})`}
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Number(e.target.value),
                  })
                }
              />

              <select
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, supplier: e.target.value })
                }
              >
                <option value="">Select Supplier</option>
                {suppliersList.map((sup) => (
                  <option key={sup}>{sup}</option>
                ))}
              </select>

              <input
                type="date"
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, expiry: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border dark:border-gray-600 rounded-lg dark:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleAddProduct}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
