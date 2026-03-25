import { useTheme } from "../../theme/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const base =
    "px-4 py-2 rounded-lg border text-sm font-medium transition";

  const active = "bg-blue-600 text-white";
  const inactive = "bg-gray-100 hover:bg-gray-200";

  return (
    <div className="flex gap-3">
      <button
        className={`${base} ${theme === "light" ? active : inactive}`}
        onClick={() => setTheme("light")}
      >
        Light
      </button>

      <button
        className={`${base} ${theme === "dark" ? active : inactive}`}
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>

      <button
        className={`${base} ${theme === "gold" ? active : inactive}`}
        onClick={() => setTheme("gold")}
      >
        Gold
      </button>
    </div>
  );
};

export default ThemeToggle;
