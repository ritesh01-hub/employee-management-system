import { useTasks } from '../../hooks/useTasks'

function AcceptTask({ task }) {
  const { updateTaskStatus } = useTasks()

  return (
    <div className="bg-white border-l-4 border-yellow-500 rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          {task.category}
        </span>
        <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
      </div>
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">{task.description}</p>
      <div className="flex gap-2">
        <button
          onClick={() => updateTaskStatus(task.id, 'completed')}
          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Mark Completed
        </button>
        <button
          onClick={() => updateTaskStatus(task.id, 'failed')}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Mark Failed
        </button>
      </div>
    </div>
  )
}

export default AcceptTask