import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

export default function TaskModal() {
  const context = useContext(GlobalContext);
  if (!context) return null;

  const { selectedTask, setSelectedTask, darkMode } = context;

  if (!selectedTask) return null;

  // Toggle subtask done/undone
  const toggleSubtask = (index: number) => {
    if (!setSelectedTask) return;
    const updatedTask = {
      ...selectedTask,
      subtasks: selectedTask.subtasks.map((s, i) =>
        i === index ? { ...s, isCompleted: !s.isCompleted } : s
      ),
    };
    setSelectedTask(updatedTask);
  };

  // Change task status
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!setSelectedTask) return;
    setSelectedTask({
      ...selectedTask,
      status: e.target.value,
    });
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setSelectedTask(null)} // click outside closes modal
    >
      {/* Modal Card */}
      <div
        className={`w-[343px] max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg ${
          darkMode ? "bg-[#2B2C37] text-white" : "bg-white text-[#000112]"
        }`}
        onClick={(e) => e.stopPropagation()} // prevent backdrop click
      >
        {/* Title + Options */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-bold text-lg leading-[23px]">
            {selectedTask.title}
          </h2>
          <button className="flex flex-col gap-[3px]">
            <span className="w-1 h-1 rounded-full bg-[#828FA3]" />
            <span className="w-1 h-1 rounded-full bg-[#828FA3]" />
            <span className="w-1 h-1 rounded-full bg-[#828FA3]" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-[#828FA3] mb-6 leading-6">
          {selectedTask.description}
        </p>

        {/* Subtasks */}
        <div className="mb-6">
          <p className="text-xs font-bold text-[#828FA3] mb-2">
            Subtasks (
            {selectedTask.subtasks.filter((s) => s.isCompleted).length} of{" "}
            {selectedTask.subtasks.length})
          </p>
          <div className="flex flex-col gap-2">
            {selectedTask.subtasks.map((s, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 rounded px-3 py-2 cursor-pointer select-none ${
                  darkMode ? "bg-[#20212C]" : "bg-[#F4F7FD]"
                }`}
                onClick={() => toggleSubtask(i)}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={s.isCompleted}
                  onChange={() => toggleSubtask(i)}
                  className="w-4 h-4 accent-[#635FC7] cursor-pointer"
                />
                {/* Text */}
                <span
                  className={`text-xs font-bold ${
                    s.isCompleted
                      ? "line-through text-gray-400"
                      : darkMode
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {s.title}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-[#828FA3]">Current Status</p>
          <select
            value={selectedTask.status} // ✅ Controlled by selectedTask
            onChange={handleStatusChange}
            className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-[#635FC7]"
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
    </div>
  );
}
