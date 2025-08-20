export default function TodoList({ todos, deleteTodo, toggleComplete }) {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-6">
      {days.map((day) => (
        <div key={day} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">{day}</h2>
          <ul className="space-y-2">
            {todos
              .filter((todo) => todo.day === day)
              .map((todo, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-2 rounded-lg shadow transition 
                    ${todo.completed ? "bg-green-300 dark:bg-green-600" : "bg-white dark:bg-gray-700"}`}
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo)} className="w-5 h-5 accent-green-500 cursor-pointer" />
                    <div>
                      <p className={`font-semibold ${todo.completed ? "line-through text-gray-600 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}>{todo.task}</p>
                      <span className="text-sm text-gray-500 dark:text-gray-300">⏰ {todo.time}</span>
                    </div>
                  </div>

                  <button onClick={() => deleteTodo(todo)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    Hapus
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
