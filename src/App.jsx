import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const STORAGE_KEY = "todos";

// Ambil todos dari localStorage
function loadTodosFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

  const [todos, setTodos] = useState(loadTodosFromStorage);

  // Simpan todos ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Simpan darkMode ke localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Tambah todo
  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      ...todo,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // Hapus todo
  const deleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((t) => t.id !== todoId));
  };

  // Toggle selesai
  const toggleComplete = (todoId) => {
    setTodos((prev) => prev.map((t) => (t.id === todoId ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={(todo) => deleteTodo(todo.id)} toggleComplete={(todo) => toggleComplete(todo.id)} />
    </div>
  );
}
