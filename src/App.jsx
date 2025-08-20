import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const STORAGE_KEY = "todos";

function loadTodosFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const data = JSON.parse(raw);

    // Jika sudah array -> aman
    if (Array.isArray(data)) return data;

    // Jika format lama (object per-hari), migrasikan jadi array
    if (data && typeof data === "object") {
      const validDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
      const migrated = [];
      for (const [dayKey, arr] of Object.entries(data)) {
        if (Array.isArray(arr)) {
          arr.forEach((item) => {
            migrated.push({
              task: item?.task ?? item?.text ?? "",
              time: item?.time ?? "",
              day: validDays.includes(dayKey) ? dayKey : item?.day ?? "Senin",
              completed: !!item?.completed,
            });
          });
        }
      }
      return migrated;
    }

    // Bentuk tak dikenal -> kosongkan
    return [];
  } catch (e) {
    console.error("Gagal parse todos dari localStorage:", e);
    // Jika data rusak, hapus agar tidak crash
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Ambil dari storage + migrasi
  const [todos, setTodos] = useState(loadTodosFromStorage);

  // Simpan ke storage tiap berubah
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error("Gagal simpan todos:", e);
    }
  }, [todos]);

  // Dark mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Tambah / Hapus / Toggle
  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { ...todo, completed: false }]);
  };

  const deleteTodo = (todo) => {
    setTodos((prev) => prev.filter((t) => t !== todo));
  };

  const toggleComplete = (todo) => {
    setTodos((prev) => prev.map((t) => (t === todo ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}
