import { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { getUsers } from '../../utils/localStorage'
import Header from '../common/Header'

const statusStyle = {
  new: 'bg-blue-100 text-blue-700',
  active: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
}

const statusLabel = {
  new: 'New',
  active: 'In Progress',
  completed: 'Completed',
  failed: 'Failed',
}

const emptyForm = {
  title: '',
  description: '',
  category: '',
  assignedTo: '',
  dueDate: '',
}

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

function AdminDashboard() {
  const { tasks, addTask, deleteTask } = useTasks()
  const employees = getUsers().filter((u) => u.role === 'employee')

  const [form, setForm] = useState(emptyForm)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.title || !form.assignedTo || !form.dueDate) {
      return setMessage({ type: 'error', text: 'Title, employee and due date are required' })
    }

    addTask({ ...form, category: form.category || 'General' })
    setForm(emptyForm)
    setMessage({ type: 'success', text: 'Task assigned successfully' })
  }

  const countByStatus = (status) => tasks.filter((task) => task.status === status).length

  const stats = [
    { label: 'Employees', value: employees.length },
    { label: 'Total Tasks', value: tasks.length },
    { label: 'In Progress', value: countByStatus('active') },
    { label: 'Completed', value: countByStatus('completed') },
    { label: 'Failed', value: countByStatus('failed') },
  ]

  const getEmployeeName = (email) =>
    employees.find((emp) => emp.email === email)?.name || email

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header title="Admin Dashboard" />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((item) => (
          <div key={item.label} className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Assign New Task</h2>

          {message.text && (
            <p
              className={`text-sm rounded-lg px-3 py-2 mb-4 ${
                message.type === 'error'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {message.text}
            </p>
          )}

          <label className="block text-sm font-medium mb-1">Task Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Update landing page"
            className={`${inputClass} mb-3`}
          />

          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Task details"
            className={`${inputClass} mb-3`}
          />

          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Design, Development"
            className={`${inputClass} mb-3`}
          />

          <label className="block text-sm font-medium mb-1">Assign To</label>
          <select
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            className={`${inputClass} mb-3`}
          >
            <option value="">Select employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.email}>
                {emp.name}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className={`${inputClass} mb-4`}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Assign Task
          </button>
        </form>

        <div className="bg-white rounded-xl shadow-sm p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Employee Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="py-2 pr-4">Employee</th>
                  <th className="py-2 pr-4">New</th>
                  <th className="py-2 pr-4">In Progress</th>
                  <th className="py-2 pr-4">Completed</th>
                  <th className="py-2">Failed</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => {
                  const empTasks = tasks.filter((task) => task.assignedTo === emp.email)
                  const count = (status) => empTasks.filter((t) => t.status === status).length

                  return (
                    <tr key={emp.id} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">{emp.name}</td>
                      <td className="py-3 pr-4">{count('new')}</td>
                      <td className="py-3 pr-4">{count('active')}</td>
                      <td className="py-3 pr-4">{count('completed')}</td>
                      <td className="py-3">{count('failed')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-4">All Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400">No tasks yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Assigned To</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Due Date</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium">{task.title}</td>
                    <td className="py-3 pr-4">{getEmployeeName(task.assignedTo)}</td>
                    <td className="py-3 pr-4">{task.category}</td>
                    <td className="py-3 pr-4">{task.dueDate}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${statusStyle[task.status]}`}>
                        {statusLabel[task.status]}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard