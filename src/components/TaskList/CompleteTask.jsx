function CompleteTask({ task }) {
  return (
    <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {task.category}
        </span>
        <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
      </div>
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">{task.description}</p>
      <p className="text-sm font-medium text-green-600">Completed</p>
    </div>
  )
}

export default CompleteTask