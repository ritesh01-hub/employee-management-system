import { useAuth } from '../../hooks/useAuth'
import { useTasks } from '../../hooks/useTasks'
import Header from '../common/Header'
import NewTask from '../TaskList/NewTask'
import AcceptTask from '../TaskList/AcceptTask'
import CompleteTask from '../TaskList/CompleteTask'
import FailedTask from '../TaskList/FailedTask'

const sections = [
  { title: 'New Tasks', status: 'new', Card: NewTask, color: 'bg-blue-100 text-blue-700' },
  { title: 'In Progress', status: 'active', Card: AcceptTask, color: 'bg-yellow-100 text-yellow-700' },
  { title: 'Completed', status: 'completed', Card: CompleteTask, color: 'bg-green-100 text-green-700' },
  { title: 'Failed', status: 'failed', Card: FailedTask, color: 'bg-red-100 text-red-700' },
]

function EmployeeDashboard() {
  const { user } = useAuth()
  const { tasks } = useTasks()

  const myTasks = tasks.filter((task) => task.assignedTo === user.email)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header title="Employee Dashboard" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {sections.map((section) => (
          <div key={section.status} className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500 mb-2">{section.title}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-lg font-semibold ${section.color}`}>
              {myTasks.filter((task) => task.status === section.status).length}
            </span>
          </div>
        ))}
      </div>

      {sections.map((section) => {
        const Card = section.Card
        const list = myTasks.filter((task) => task.status === section.status)

        return (
          <div key={section.status} className="mb-8">
            <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
            {list.length === 0 ? (
              <p className="text-sm text-gray-400">No tasks here.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((task) => (
                  <Card key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default EmployeeDashboard