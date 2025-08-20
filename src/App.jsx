import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, completed: false }]);
  };

  const deleteTodo = (todo) => {
    setTodos(todos.filter((t) => t !== todo));
  };

  const toggleComplete = (todo) => {
    setTodos(todos.map((t) => (t === todo ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}
