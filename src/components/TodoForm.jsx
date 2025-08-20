import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");
  const [day, setDay] = useState("Senin");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim() || !time) return;
    addTodo({ task, day, time });
    setTask("");
    setTime("");
  };

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
      <input type="text" placeholder="Tambahkan aktivitas..." value={task} onChange={(e) => setTask(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" />
      <select value={day} onChange={(e) => setDay(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white">
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Tambah
      </button>
    </form>
  );
}
