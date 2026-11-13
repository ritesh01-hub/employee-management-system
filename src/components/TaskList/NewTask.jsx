import { useTasks } from '../../hooks/useTasks'

function NewTask({ task }) {
  const { updateTaskStatus } = useTasks()

  return (
    <div className="bg-white border-l-4 border-blue-500 rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {task.category}
        </span>
        <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
      </div>
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">{task.description}</p>
      <button
        onClick={() => updateTaskStatus(task.id, 'active')}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Accept Task
      </button>
    </div>
  )
}

export default NewTask