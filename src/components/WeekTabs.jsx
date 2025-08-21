export default function WeekTabs({ selectedDay, setSelectedDay }) {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => setSelectedDay(day)}
          className={`px-4 py-2 rounded-lg font-semibold transition 
            ${selectedDay === day ? "bg-blue-600 dark:bg-blue-700 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
