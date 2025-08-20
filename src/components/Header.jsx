import { format, startOfWeek, endOfWeek } from "date-fns";

export default function Header({ darkMode, setDarkMode }) {
  // Dapatkan tanggal awal dan akhir minggu (dimulai dari Senin)
  const today = new Date();
  const startWeek = startOfWeek(today, { weekStartsOn: 1 });
  const endWeek = endOfWeek(today, { weekStartsOn: 1 });

  const startDate = format(startWeek, "dd MMM yyyy");
  const endDate = format(endWeek, "dd MMM yyyy");

  return (
    <header className="flex justify-between items-center mb-6 p-4 rounded-lg bg-gray-200 dark:bg-gray-800 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">To-Do List Mingguan</h1>

      <div className="flex items-center gap-4">
        {/* Tanggal Awal dan Akhir Minggu */}
        <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
          {startDate} - {endDate}
        </div>

        {/* Tombol Dark Mode */}
        <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-2 rounded-lg bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 hover:opacity-80 transition">
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}
